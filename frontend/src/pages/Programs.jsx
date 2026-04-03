import { Link } from "react-router-dom";
import { programs } from "../data/programs";
import ProgramHero from "../components/programs/ProgramHero";
import { useEffect } from "react";

export default function Programs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  const virtualPrograms = programs.filter(
    (program) => program.category === "Virtual Programs"
  );
  const speakerPrograms = programs.filter(
    (program) => program.category === "Speaker Programs"
  );

  const renderCards = (items) => (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((program, index) => (
        <article
          key={program.id}
          className="group relative overflow-hidden rounded-2xl border border-indigo-100 bg-white/80 p-6 backdrop-blur-sm shadow-lg shadow-indigo-900/5 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFD700] hover:shadow-xl hover:shadow-[#FFD700]/20"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Decorative gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          
          {/* Category Badge */}
          <div className="relative">
            <span className="inline-block rounded-full bg-[#FFD700]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFD700]">
              {program.category === "Virtual Programs" ? "Virtual" : "Speaker"}
            </span>
          </div>

          {/* Title */}
          <h2 className="relative mt-4 font-serif text-2xl font-semibold leading-snug text-black group-hover:text-[#FFD700] transition-colors">
            {program.title}
          </h2>

          {/* Description */}
          <p className="relative mt-4 text-sm leading-relaxed text-indigo-900/70">
            {program.shortDescription}
          </p>

          {/* Details */}
          <div className="relative mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-indigo-900/60">
            <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="font-medium text-black">Format:</span>
              <span>{program.format}</span>
            </div>
            <div className="flex items-center gap-2 text-indigo-900/60">
              <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="font-medium text-black">Group Size:</span>
              <span>{program.groupSize}</span>
            </div>
          </div>

          {/* CTA Button */}
          <Link
            to={`/programs/${program.slug}`}
            className="group/btn relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-indigo-900 to-black px-5 py-2.5 text-sm font-medium text-[#FFD700] transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Details
              <svg className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-[#FFD700]/10 to-transparent transition-transform duration-1000 group-hover/btn:translate-x-full"></div>
          </Link>

          {/* Bottom gradient line */}
          <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-[#FFD700] to-indigo-900 transition-all duration-300 group-hover:w-full"></div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="bg-white">
        <ProgramHero/>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-1/4 top-0 h-[800px] w-[800px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
          <div className="absolute -right-1/4 bottom-0 h-[800px] w-[800px] rounded-full bg-indigo-900/5 blur-3xl"></div>
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #334155 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        
      </section>

      {/* Virtual Programs Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50/20 to-white py-8 lg:py15">
        <div className="mx-auto max-w-9xl px-4 md:px-6">
          <div className="relative mb-12">
            <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
            <div className="pl-6">
              <div className="flex items-center gap-3">
                
                <h2 className="font-serif text-3xl font-bold text-black">
                  Virtual Programs
                </h2>
              </div>
              <p className="mt-2 text-indigo-900/60">
                Accessible from anywhere, designed for busy leaders
              </p>
            </div>
          </div>
          {virtualPrograms.length > 0 ? (
            renderCards(virtualPrograms)
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white/50 p-12 text-center">
              <div className="rounded-full bg-indigo-50 p-4">
                <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <p className="mt-4 text-indigo-900/60">No virtual programs available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Speaker Programs Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/30 to-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="relative mb-12">
            <div className="absolute -left-4 top-0 h-12 w-1 bg-gradient-to-b from-[#FFD700] to-indigo-900"></div>
            <div className="pl-6">
              <div className="flex items-center gap-3">
               
                <h2 className="font-serif text-3xl font-bold text-black">
                  Speaker Programs
                </h2>
              </div>
              <p className="mt-2 text-indigo-900/60">
                Engage your team with transformative keynote experiences
              </p>
            </div>
          </div>
          {speakerPrograms.length > 0 ? (
            renderCards(speakerPrograms)
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-indigo-100 bg-white/50 p-12 text-center">
              <div className="rounded-full bg-indigo-50 p-4">
                <svg className="h-12 w-12 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 12h8v8H7v-8z" />
                </svg>
              </div>
              <p className="mt-4 text-indigo-900/60">No speaker programs available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-black py-5 lg:py-15">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>

        <div className="relative mx-auto max-w-7xl px-4 text-center md:px-6">
          <span className="inline-block rounded-full bg-[#FFD700]/20 px-4 py-2 text-sm font-medium text-[#FFD700] backdrop-blur-sm mb-6">
            Ready to Transform Your Organization?
          </span>
          
          <h2 className="font-serif text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
            Not sure which program is right for you?
          </h2>
          
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-indigo-200">
            Let's discuss your organization's needs and find the perfect program to support your growth journey.
          </p>
          
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/booking"
              className="group relative overflow-hidden rounded-xl bg-[#FFD700] px-8 py-4 text-sm font-medium text-black transition-all duration-300 hover:shadow-lg hover:shadow-[#FFD700]/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Book a Consultation
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
            </Link>

            <Link
              to="/contact"
              className="group inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-medium text-white transition-all duration-200 hover:border-[#FFD700] hover:bg-white/20 hover:shadow-lg hover:shadow-[#FFD700]/10"
            >
              Contact Us
              <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}