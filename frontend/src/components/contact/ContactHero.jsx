export default function ContactHero() {
    return (
      <section className="relative min-h-[40vh] overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Business Conversation"
            className="h-full w-full object-cover"
          />
          {/* Dark overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
        </div>
  
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 h-64 w-64 rounded-full bg-[#FFD700]/10 blur-3xl"></div>
        <div className="absolute bottom-20 left-20 h-64 w-64 rounded-full bg-indigo-900/20 blur-3xl"></div>
        
        {/* Communication pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}
        ></div>
  
        <div className="relative mx-auto max-w-5xl px-4 py-15 md:px-6 lg:py-30 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Decorative line - centered above */}
            <div className="flex justify-center mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
            </div>
            
            <div className="space-y-8">
              {/* Contact tag with message icon */}
              <div className="flex justify-center">
                <div className="inline-flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </span>
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFD700]">
                    Contact
                  </p>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20 backdrop-blur-sm">
                    <svg className="h-4 w-4 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
              </div>
  
              
  
            
  
             
  
              {/* Availability Stats */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-6">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                  </span>
                  <span className="text-sm text-gray-400">Response within 24h</span>
                </div>
                <div className="h-4 w-px bg-gray-700"></div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-[#FFD700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-400">Mon-Fri, 9am-5pm</span>
                </div>
                <div className="h-4 w-px bg-gray-700"></div>
                
              </div>
  
              
              
            </div>
          </div>
        </div>
      </section>
    );
  }