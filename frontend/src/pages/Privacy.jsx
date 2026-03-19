import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-30">
        {/* Background Image */}
        


        <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center">
        
          
          <div className="space-y-4">
            <p className="text-xs font-light uppercase tracking-[0.25em] text-gray-500">
              Legal
            </p>
            <h1 className="font-light text-4xl leading-tight text-black md:text-5xl lg:text-6xl">
              Privacy{' '}
              <span className="relative inline-block">
                <span className="relative z-10 font-normal text-[#1e3a8a]">Policy</span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-[#1e3a8a]/10 -z-0"></span>
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-gray-600">
              How we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-400">Last updated: March 15, 2024</p>
          </div>

          {/* Minimal bottom accent line */}
          <div className="flex justify-center mt-12">
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative py-16 lg:py-20">
        <div className="absolute inset-0 -z-10">
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #000000 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="space-y-12">
            {/* Introduction */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                1. Introduction
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  Reena Gore ("we," "us," or "our") respects your privacy and is committed to 
                  protecting your personal data. This Privacy Policy explains how we collect, 
                  use, disclose, and safeguard your information when you visit our website, 
                  book consultations, or use our services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the 
                  terms of this Privacy Policy, please do not access the site or use our services.
                </p>
              </div>
            </div>

            {/* Information We Collect */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                2. Information We Collect
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p className="font-medium text-gray-700">Personal Data:</p>
                <p>We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Book a consultation or session</li>
                  <li>Register for our newsletter or updates</li>
                  <li>Fill out a contact form</li>
                  <li>Make an enquiry about services</li>
                  <li>Subscribe to our podcast or content</li>
                </ul>
                <p className="mt-4">This information may include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name and contact details (email, phone number, company)</li>
                  <li>Billing and payment information (processed securely through third-party providers)</li>
                  <li>Business information relevant to advisory services</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </div>

            {/* How We Use Your Information */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                3. How We Use Your Information
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Process and manage your bookings and payments</li>
                  <li>Provide, operate, and maintain our services</li>
                  <li>Communicate with you about consultations, services, and updates</li>
                  <li>Respond to your enquiries and provide customer support</li>
                  <li>Send you administrative information, including updates to our terms and policies</li>
                  <li>Personalize your experience on our website</li>
                  <li>Analyze usage patterns to improve our website and services</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </div>

            {/* Sharing Your Information */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                4. Sharing Your Information
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-medium text-gray-700">Service Providers:</span> Third-party vendors who help us operate our website and process payments (e.g., payment processors, email services)</li>
                  <li><span className="font-medium text-gray-700">Legal Requirements:</span> When required by law or to protect our rights</li>
                  <li><span className="font-medium text-gray-700">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets</li>
                </ul>
                <p className="mt-4">
                  All third-party service providers are contractually obligated to keep your information 
                  confidential and secure, and to use it only for the purposes for which we disclose it to them.
                </p>
              </div>
            </div>

            {/* Data Security */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                5. Data Security
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information from unauthorized access, disclosure, alteration, or destruction.
                </p>
                <p>These measures include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing through PCI-compliant providers</li>
                  <li>Limited access to personal information</li>
                  <li>Regular security assessments</li>
                </ul>
                <p className="mt-4">
                  However, no method of transmission over the Internet or electronic storage is 100% secure. 
                  While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </div>
            </div>

            {/* Data Retention */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                6. Data Retention
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  We retain your personal information only for as long as necessary to fulfill the purposes 
                  outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                </p>
                <p>
                  When we have no ongoing legitimate business need to process your information, we will either 
                  delete or anonymize it. If this is not possible, we will securely store your information and 
                  isolate it from further processing until deletion is possible.
                </p>
              </div>
            </div>

            {/* Your Rights */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                7. Your Rights
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="font-medium text-gray-700">Access:</span> Request a copy of the information we hold about you</li>
                  <li><span className="font-medium text-gray-700">Correction:</span> Request correction of inaccurate information</li>
                  <li><span className="font-medium text-gray-700">Deletion:</span> Request deletion of your information</li>
                  <li><span className="font-medium text-gray-700">Restriction:</span> Request restriction of processing</li>
                  <li><span className="font-medium text-gray-700">Objection:</span> Object to processing of your information</li>
                  <li><span className="font-medium text-gray-700">Portability:</span> Request transfer of your information</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us at hello@reenagore.com.
                </p>
              </div>
            </div>

            {/* Cookies and Tracking */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                8. Cookies and Tracking Technologies
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our website. 
                  Cookies are small data files stored on your device that help us:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Remember your preferences</li>
                  <li>Understand how you interact with our website</li>
                  <li>Improve website functionality and performance</li>
                </ul>
                <p>
                  You can control cookies through your browser settings. However, disabling cookies may limit 
                  your ability to use certain features of our website.
                </p>
              </div>
            </div>

            {/* Third-Party Links */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                9. Third-Party Links
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  Our website may contain links to third-party websites, including payment processors, podcast 
                  platforms, and social media sites. We are not responsible for the privacy practices or content 
                  of these external sites. We encourage you to review the privacy policies of any third-party 
                  sites you visit.
                </p>
              </div>
            </div>

            {/* Children's Privacy */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                10. Children's Privacy
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect 
                  personal information from children. If you become aware that a child has provided us with 
                  personal information, please contact us, and we will take steps to delete such information.
                </p>
              </div>
            </div>

            {/* International Data Transfers */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                11. International Data Transfers
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  Your information may be transferred to and processed in countries other than your own. 
                  We take appropriate safeguards to ensure your information remains protected in accordance 
                  with this Privacy Policy when transferred internationally.
                </p>
              </div>
            </div>

            {/* Changes to This Policy */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                12. Changes to This Privacy Policy
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  We may update this Privacy Policy from time to time to reflect changes in our practices or 
                  legal requirements. The updated version will be indicated by an updated "Last updated" date 
                  at the top of this page. We encourage you to review this Privacy Policy periodically.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                13. Contact Information
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data 
                  practices, please contact us at:
                </p>
                <div className="mt-4 p-6 bg-gray-50/50 border border-gray-200">
                  <p className="text-gray-800">Reena Gore</p>
                  <p className="text-gray-600 mt-2">Email: hello@reenagore.com</p>
                  <p className="text-gray-600">Response time: Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-16 flex justify-center">
            <Link
              to="/"
              className="group px-6 py-3 text-sm font-light text-white bg-gray-900 hover:bg-gray-800 transition-all duration-200 rounded-none tracking-wide"
            >
              <span className="flex items-center gap-2">
                Back to Home
                <svg className="h-3 w-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Link to Terms of Service */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Also review our{' '}
              <Link to="/terms" className="text-[#1e3a8a] hover:underline">
                Terms of Service
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}