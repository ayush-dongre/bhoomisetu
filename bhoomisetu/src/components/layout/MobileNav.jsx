export default function MobileNav({ open, onClose }) {
  if (!open) return null;
  return <div className="fixed inset-0 bg-black/40 z-30 lg:hidden animate-fade-in" onClick={onClose} />;
}
