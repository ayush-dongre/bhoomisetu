import { useState } from 'react';
import { HelpCircle, MessageSquare, BookOpen, Send } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useApp } from '../context/AppContext';

const FAQS = [
  { q: 'How do I submit a new project proposal?', a: 'Go to Projects → New Project, fill in the required fields, attach supporting documents, and submit for approval.' },
  { q: 'How is the risk score calculated?', a: 'Risk scores are based on delay severity, approval bottlenecks, and acquisition velocity, shown in the Analytics page.' },
  { q: 'Can I access BHOOMISETU offline?', a: 'Yes — project and parcel data cached locally sync automatically once you are back online.' },
  { q: 'Who approves compensation payments?', a: 'Compensation follows the multi-level approval workflow: District Collector → State Nodal Officer → Central Ministry.' },
];

export default function Help() {
  const [search, setSearch] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! I can help with questions about BHOOMISETU. Try asking about approvals, compensation, or documents.' }]);
  const [input, setInput] = useState('');
  const { pushToast } = useApp();

  const filtered = FAQS.filter((f) => f.q.toLowerCase().includes(search.toLowerCase()));

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const reply = { from: 'bot', text: "Thanks for your question — for detailed help, please raise a support ticket below or check the FAQ section." };
    setMessages((m) => [...m, userMsg, reply]);
    setInput('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Help & Support</h1>
        <p className="text-sm text-gray-400">Tutorials, FAQs, and support for BHOOMISETU users</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <Card title="Frequently Asked Questions">
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full mb-3 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy-500"
            />
            <div className="space-y-3">
              {filtered.map((f) => (
                <details key={f.q} className="border border-gray-100 rounded-lg p-3 group">
                  <summary className="text-sm font-medium text-gray-800 cursor-pointer flex items-center gap-2">
                    <HelpCircle size={14} className="text-navy-600" /> {f.q}
                  </summary>
                  <p className="text-sm text-gray-500 mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Card>

          <Card title="Contact Support">
            <form onSubmit={(e) => { e.preventDefault(); pushToast('Support ticket raised. Our team will respond within 24 hours.', 'success'); }} className="space-y-3">
              <input required placeholder="Subject" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
              <textarea required placeholder="Describe your issue..." rows={3} className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg" />
              <Button type="submit">Raise Ticket</Button>
            </form>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title="User Manual">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen size={16} className="text-navy-600" /> Download the complete BHOOMISETU user manual (PDF)
            </div>
            <Button size="sm" variant="outline" className="mt-3 w-full" onClick={() => pushToast('User manual download started.', 'info')}>Download PDF</Button>
          </Card>

          <Card title="Chatbot Assistant" noPadding>
            <div className="p-4 h-64 overflow-y-auto space-y-2">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm px-3 py-2 rounded-lg max-w-[85%] ${m.from === 'bot' ? 'bg-gray-100 text-gray-700' : 'bg-navy-600 text-white ml-auto'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} className="flex gap-2 p-3 border-t border-gray-100">
              <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg" />
              <button type="submit" className="p-2 bg-navy-600 text-white rounded-lg"><Send size={15} /></button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
