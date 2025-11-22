import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsAndConditionsProps {
  onBack: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ onBack }) => {
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
            <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
            <p className="text-gray-400 text-sm mb-8">Last Updated: 19/11/2025</p>

            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl font-semibold text-white mb-3">HQ RECOVERY — TERMS & CONDITIONS</h2>
                <p className="mb-2"><strong className="text-[#d8ba5b]">G-Castle Recovery Ltd t/a HQ Recovery</strong></p>
                <p className="mb-2">Company No. 764903</p>
                <p className="mb-2">Website: <a href="https://www.hqrecovery.com" target="_blank" rel="noopener noreferrer" className="text-[#d8ba5b] hover:text-[#c9a852]">www.hqrecovery.com</a></p>
                <p className="mb-2">Email: <a href="mailto:team@hqrecovery.com" className="text-[#d8ba5b] hover:text-[#c9a852]">team@hqrecovery.com</a></p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">1. Introduction</h3>
                <p>These Terms & Conditions govern your use of HQ Recovery's services, facilities, website, booking systems, and equipment.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">2. About Us</h3>
                <p>G-Castle Recovery Ltd t/a HQ Recovery</p>
                <p>Company No. 764903</p>
                <p>Email: <a href="mailto:team@hqrecovery.com" className="text-[#d8ba5b] hover:text-[#c9a852]">team@hqrecovery.com</a></p>
                <p>Website: <a href="https://www.hqrecovery.com" target="_blank" rel="noopener noreferrer" className="text-[#d8ba5b] hover:text-[#c9a852]">www.hqrecovery.com</a></p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">3. Services Provided</h3>
                <p>Sauna, cold plunge, compression boots, recovery equipment, and recovery room access.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">4. Eligibility & Age Requirements</h3>
                <p>18+ only. Waiver and Health Commitment Statement required.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">5. Health & Safety Requirements</h3>
                <p>You confirm acceptance of the Health Commitment Statement. Use all facilities at your own risk.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">6. Booking Policy</h3>
                <p>All bookings made online. Full payment required via Stripe. Confirmation sent via SMS/email/WhatsApp.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">7. Cancellation & Rescheduling Policy</h3>
                <p>Cancellations allowed up to 12 hours before the session. Late cancellations and no-shows are non-refundable.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">8. Facility Rules</h3>
                <p>Follow all safety instructions. No alcohol, drugs, disruptive behaviour, or misuse of equipment.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">9. Personal Property</h3>
                <p>HQ Recovery is not responsible for lost, stolen, or damaged property.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">10. Assumption of Risk & Liability Waiver</h3>
                <p>You use all equipment at your own risk. HQ Recovery is not liable for injuries or illnesses except where prohibited by law.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">11. Limitation of Liability</h3>
                <p>Liability is limited to the amount paid for the service.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">12. Privacy & Data Protection</h3>
                <p>Processed in accordance with our Privacy Policy at <a href="https://www.hqrecovery.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#d8ba5b] hover:text-[#c9a852]">www.hqrecovery.com/privacy-policy</a>.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">13. Communications</h3>
                <p>You agree to receive service communications. Marketing communications require consent.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">14. Gift Cards, Credits & Packages</h3>
                <p>Non-refundable; may have expiry dates.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">15. Damage to Property</h3>
                <p>Users may be charged for intentional or negligent damage.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">16. Suspensions & Refusals of Service</h3>
                <p>HQ Recovery may refuse service for rule violations, intoxication, or unsafe behaviour.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">17. Changes to Services</h3>
                <p>Services, pricing, and terms may change at any time.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">18. Governing Law</h3>
                <p>These Terms are governed by Irish law.</p>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-white mb-2">19. Contact</h3>
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
