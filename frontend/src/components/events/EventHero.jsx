export default function EventHero() {
    return (
      <section className="relative min-h-[40vh] overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/13.png"
            alt="Podcast Studio"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
        </div>
  
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>
        
        {/* Sound wave pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10v40M10 20v20M50 20v20M20 5v50M40 5v50' stroke='%23ffffff' stroke-width='0.5' fill='none' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
  
        <div className="relative mx-auto max-w-5xl px-4 py-8 md:px-6 lg:py-30 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Decorative line - centered above */}
            <div className="flex justify-center mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            </div>
            
            <div className="space-y-8">
              {/* Podcast tag with microphone icon */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                    Events & Workshops
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </div>
              </div>
  
             
  
             
  
              
  
              
           
              
            </div>
          </div>
        </div>
      </section>
    );
  }