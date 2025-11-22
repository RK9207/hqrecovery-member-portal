import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#231f1e] to-[#1a1715] py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header with Back Button */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-[#d8ba5b] hover:text-[#c9a852] transition-colors font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Sign Up</span>
          </button>
        </div>

        {/* Content Card */}
        <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] p-8">
          <div className="prose prose-invert max-w-none">
            <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-gray-400 text-sm mb-8">Last Updated: 19/11/2025</p>

            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">HQ RECOVERY — FULL GDPR PRIVACY POLICY</h2>
                <p className="mb-2"><strong className="text-[#d8ba5b]">G-Castle Recovery Ltd t/a HQ Recovery</strong></p>
                <p className="mb-2">Company No. 764903</p>
                <p className="mb-2">Email: <a href="mailto:team@hqrecovery.com" className="text-[#d8ba5b] hover:text-[#c9a852]">team@hqrecovery.com</a></p>
                <p className="mb-2">Website: <a href="https://www.hqrecovery.com" target="_blank" rel="noopener noreferrer" className="text-[#d8ba5b] hover:text-[#c9a852]">www.hqrecovery.com</a></p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">1. Introduction</h3>
                <p>This Privacy Policy explains how G-Castle Recovery Ltd t/a HQ Recovery ("HQ Recovery", "we", "us", "our") collects, uses, stores and protects your personal data when you use our services.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">2. Data Controller</h3>
                <p>G-Castle Recovery Ltd t/a HQ Recovery</p>
                <p>Company No. 764903</p>
                <p>Email: <a href="mailto:team@hqrecovery.com" className="text-[#d8ba5b] hover:text-[#c9a852]">team@hqrecovery.com</a></p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">3. What Personal Data We Collect</h3>

                <div className="ml-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-white mb-1">A. Information You Provide:</h4>
                    <p>Name, Email, Phone, DOB (18+ verification), Emergency Contact, Waiver Consent, Booking Info, Communications.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">B. Payment Information:</h4>
                    <p>Processed via Stripe (we do not store full card numbers).</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">C. Automatically Collected Data:</h4>
                    <p>IP, browser, device, cookies, analytics data (GA4, Meta Pixel, Hotjar, GHL/Hexona tracking).</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-1">D. Special Category Data:</h4>
                    <p>Confirmation of acceptance of Health Commitment Statement only.</p>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">4. Legal Bases for Processing</h3>
                <p>Contract, Consent, Legitimate Interests, Legal Obligation.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">5. Special Category Data Basis</h3>
                <p>Explicit Consent — Article 9(2)(a).</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">6. How We Use Your Data</h3>
                <p>Bookings, payments, confirmations, safety, support, marketing (consented), analytics.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">7. Automated Decision Making</h3>
                <p>We do not use automated decision-making.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">8. Data Sharing & Processors</h3>
                <p>GoDaddy, WordPress, Hexona/GHL, Stripe, Google Analytics, Meta, Hotjar, SMS/Email providers.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">9. International Transfers</h3>
                <p>Protected via DPF, SCCs, and supplementary measures.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">10. Data Retention</h3>
                <div className="ml-4 space-y-2">
                  <p>• Booking records, waivers — retained until deletion requested.</p>
                  <p>• Payments — 6 years.</p>
                  <p>• Marketing — until unsubscribed.</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">11. Age Policy</h3>
                <p>Services restricted to individuals aged 18+.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">12. Your GDPR Rights</h3>
                <p>Access, rectification, deletion, restriction, objection, portability, withdraw consent.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">13. Security Measures</h3>
                <p>SSL, 2FA, encrypted payments, controlled access, audits.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">14. Cookies & Tracking</h3>
                <p>Used for analytics, advertising, UX. Cookie banner provided.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">15. Data Subject Requests</h3>
                <p>Email <a href="mailto:team@hqrecovery.com" className="text-[#d8ba5b] hover:text-[#c9a852]">team@hqrecovery.com</a>. Response within 30 days.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">16. Updates</h3>
                <p>We may update this policy periodically.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">17. Contact</h3>
                <p><a href="mailto:team@hqrecovery.com" className="text-[#d8ba5b] hover:text-[#c9a852]">team@hqrecovery.com</a></p>
                <p>G-Castle Recovery Ltd t/a HQ Recovery</p>
                <p>Company No. 764903</p>
              </section>
            </div>

            {/* Back Button at Bottom */}
            <div className="mt-8 pt-6 border-t border-[#3a342f]">
              <button
                onClick={onBack}
                className="flex items-center space-x-2 text-[#d8ba5b] hover:text-[#c9a852] transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
