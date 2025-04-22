interface SectionProps {
  id: string;
  title: string;
}

export default function Section({ id, title }: SectionProps) {
  return (
    <section id={id} className="min-h-screen p-8 border-b">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </p>
    </section>
  );
}
