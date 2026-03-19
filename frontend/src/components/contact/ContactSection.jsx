import ContactForm from "./ContactForm";
import ContactInfoCard from "./InfoCard";

export default function ContactSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ContactForm />
        <ContactInfoCard />
      </div>
    </section>
  );
}