import { useParams } from 'react-router-dom';

export default function MockupViewer() {
  const { name } = useParams();
  const htmlPath = `/mockups/${name}.html`;
  const imgPath = `/mockups/${name}.png`;

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-display capitalize">{name.replace(/_/g, ' ')}</h1>
      <iframe
        src={htmlPath}
        className="w-full h-[70vh] border rounded-lg shadow"
        title={name}
      />
      <div className="mt-4">
        <img src={imgPath} alt={`${name} screenshot`} className="max-w-full rounded-md shadow" />
      </div>
    </div>
  );
}
