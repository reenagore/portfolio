import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        {/* Background Image */}
        

       


        <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center">
          {/* Minimal accent line - centered above */}
          <div className="flex justify-center mb-6">
            <div className="h-px w-16 bg-gray-300"></div>
          </div>
          
          <div className="space-y-4">
            <p className="text-xs font-light uppercase tracking-[0.25em] text-gray-500">
              Legal
            </p>
            <h1 className="font-light text-4xl leading-tight text-black md:text-5xl lg:text-6xl">
              Terms of{' '}
              <span className="relative inline-block">
                <span className="relative z-10 font-normal text-[#1e3a8a]">Service</span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-[#1e3a8a]/10 -z-0"></span>
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-gray-600">
              Please read these terms carefully before using our services or website.
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
                  Welcome to Reena Gore's website. By accessing or using our website, 
                  services, or booking any consultation, you agree to be bound by these 
                  Terms of Service. If you do not agree to these terms, please do not 
                  use our services.
                </p>
                <p>
                  These terms constitute a legally binding agreement between you ("Client" 
                  or "User") and Reena Gore ("Company," "we," "us," or "our") regarding 
                  your use of our website and professional services.
                </p>
              </div>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                2. Services
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  Reena Gore provides strategic advisory services including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Profit Pulse Audit – a diagnostic review of financial and operational health</li>
                  <li>FPO Method™ Implementation – structured engagement to align finance, people, and operations</li>
                  <li>Executive & Corporate Programs – tailored advisory for leadership teams</li>
                  <li>Speaking engagements and workshops</li>
                  <li>Published content including articles and podcast episodes</li>
                </ul>
                <p className="mt-4">
                  All services are provided on an as-available basis and are subject to 
                  separate engagement agreements where applicable.
                </p>
              </div>
            </div>

            {/* Booking and Payment */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                3. Booking and Payment
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  When you book a consultation through our website:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payment is required at the time of booking to secure your appointment</li>
                  <li>All payments are processed securely through our payment partners</li>
                  <li>Prices are displayed in the currency specified and are inclusive of applicable taxes</li>
                  <li>You will receive a confirmation email with details of your booking</li>
                </ul>
              </div>
            </div>

            {/* Cancellation and Refunds */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                4. Cancellation and Refunds
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  Our cancellation and refund policy is as follows:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cancellations made at least 48 hours before the scheduled session: Full refund</li>
                  <li>Cancellations made within 48 hours of the session: 50% refund</li>
                  <li>No-shows: No refund will be issued</li>
                  <li>In exceptional circumstances, we may reschedule at no additional cost</li>
                </ul>
                <p className="mt-4">
                  To request a cancellation, please contact us at hello@reenagore.com.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                5. Intellectual Property
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  All content on this website, including but not limited to text, graphics, 
                  logos, images, audio clips, digital downloads, and the FPO Method™ framework, 
                  is the property of Reena Gore and is protected by international copyright laws.
                </p>
                <p>
                  The FPO Method™ is a registered trademark. You may not reproduce, distribute, 
                  or create derivative works without explicit written permission.
                </p>
              </div>
            </div>

            {/* User Conduct */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                6. User Conduct
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  When using our website or services, you agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on the intellectual property rights of others</li>
                  <li>Transmit any harmful code or malware</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use our services for any unlawful purpose</li>
                </ul>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                7. Limitation of Liability
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  To the maximum extent permitted by law, Reena Gore shall not be liable for 
                  any indirect, incidental, special, consequential, or punitive damages, or 
                  any loss of profits or revenues, whether incurred directly or indirectly, 
                  or any loss of data, use, goodwill, or other intangible losses, resulting 
                  from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use or inability to use our services</li>
                  <li>Any conduct or content of any third party</li>
                  <li>Unauthorized access to or alteration of your data</li>
                </ul>
              </div>
            </div>

            {/* Privacy */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                8. Privacy
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  Your use of our services is also governed by our Privacy Policy, which 
                  explains how we collect, use, and protect your personal information. 
                  By using our services, you consent to the practices described in the 
                  Privacy Policy.
                </p>
                <p>
                  <Link to="/privacy" className="text-[#1e3a8a] hover:underline">
                    View our Privacy Policy
                  </Link>
                </p>
              </div>
            </div>

            {/* Modifications to Terms */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                9. Modifications to Terms
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be 
                  effective immediately upon posting on this page. Your continued use of 
                  our services after any changes constitutes acceptance of the modified terms.
                </p>
                <p>
                  We encourage you to review this page periodically for the latest information.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                10. Governing Law
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  These terms shall be governed by and construed in accordance with the laws 
                  of South Africa, without regard to its conflict of law provisions. Any 
                  disputes arising under these terms shall be subject to the exclusive 
                  jurisdiction of the courts of South Africa.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h2 className="font-light text-2xl text-black md:text-3xl">
                11. Contact Information
              </h2>
              <div className="space-y-4 text-base font-light leading-relaxed text-gray-600">
                <p>
                  If you have any questions about these Terms of Service, please contact us at:
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
        </div>
      </section>
    </div>
  );
}