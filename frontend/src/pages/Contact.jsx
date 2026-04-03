import { useEffect } from "react";
import ContactHero from "../components/contact/ContactHero";
import ContactSection from "../components/contact/ContactSection";


export default function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="bg-white text-slate-900">
      <ContactHero />
      <ContactSection />
    </div>
  );
}