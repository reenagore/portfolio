export default function InsightsHero() {
    return (
      <section className="relative min-h-[40vh] overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Writing and Insights"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
        </div>
  
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>
        
        {/* Article pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
  
        <div className="relative mx-auto max-w-6xl px-4 py-10 md:px-6 lg:py-30 text-center">
          <div className="max-w-4xl mx-auto">
        
            
            <div className="space-y-8">
              {/* Article tag with pen icon */}
              <div className="flex justify-center">
                <div className="inline-flex items-center mt-20  gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                    Articles & Insights
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
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