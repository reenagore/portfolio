

export default function ProgramHero() {
    return (
      <section className="relative min-h-[30vh] overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Strategic Business Advisory"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
        </div>
  
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>
        
        {/* Geometric pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
  
        <div className="relative mx-auto max-w-5xl px-4 py-5 md:px-6 lg:py-30 text-center">
          <div className="max-w-4xl mx-auto">
            
            
            <div className="space-y-8">
              {/* Service tag with golden accent */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3 mt-10">
                  
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                    My Programs
                  </p>
                  
                </div>
              </div>
  
             
  
              
  
              
  
              
              {/* Decorative bottom line */}
              <div className="flex justify-center">
                <div className="h-1 w-40 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }