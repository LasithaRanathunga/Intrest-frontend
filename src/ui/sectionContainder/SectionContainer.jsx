export default function SectionContainer({ children }) {
  return (
    <section className="w-full bg-white rounded-xl overflow-hidden mb-4">
      {children}
    </section>
  );
}
