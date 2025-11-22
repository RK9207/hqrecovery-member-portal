import React from 'react';
import { X } from 'lucide-react';

interface HealthCommitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HealthCommitmentModal: React.FC<HealthCommitmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#231f1e] rounded-2xl shadow-2xl border border-[#3a342f] w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#3a342f]">
          <div>
            <h2 className="text-2xl font-bold text-white">Health Commitment Statement & Liability Waiver</h2>
            <p className="text-sm text-gray-400 mt-1">HQ Recovery</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-[#2a2520] rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6">
          <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
            {/* Company Info */}
            <div className="text-center mb-6 pb-6 border-b border-[#3a342f]">
              <h3 className="text-xl font-bold text-white mb-2">HQ RECOVERY</h3>
              <h4 className="text-lg font-semibold text-[#d8ba5b] mb-3">Health Commitment Statement & Liability Waiver</h4>
              <p className="text-sm"><strong className="text-[#d8ba5b]">G-Castle Recovery Ltd</strong></p>
              <p className="text-sm">84B Shandon Gardens, Phibsborough, Dublin 7, D07 X759</p>
              <p className="text-sm">
                <a href="mailto:team@hqrecovery.com" className="text-[#d8ba5b] hover:text-[#c9a852]">team@hqrecovery.com</a>
                {' | '}
                <a href="tel:+353838203627" className="text-[#d8ba5b] hover:text-[#c9a852]">+353 83 820 3627</a>
              </p>
            </div>

            {/* HEALTH COMMITMENT STATEMENT SECTION */}
            <div className="mb-8">
              <div className="bg-[#d8ba5b]/10 border border-[#d8ba5b]/30 rounded-lg p-4 mb-6">
                <h3 className="text-xl font-bold text-[#d8ba5b] text-center">HEALTH COMMITMENT STATEMENT</h3>
              </div>

              {/* Section 1 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">1. Our Commitment to Your Health, Safety & Privacy</h4>
                <p>At HQ Recovery, your health, wellbeing, privacy, and safety are our top priorities. This Statement outlines what you can expect from us and what we expect from you.</p>
              </section>

              {/* Section 2 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">2. Safe, High-Quality Facilities</h4>
                <p className="mb-2">We provide well-maintained recovery equipment:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Hot Plunge (38°C)</li>
                  <li>Cold Plunge (4°C)</li>
                  <li>Wood-Stove Sauna (90–110°C)</li>
                  <li>Therabody Compression Boots (25–100 mmHg; 20/40/60 min or continuous)</li>
                  <li>Massage guns, foam rollers, mobility tools</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">3. Facility Supervision</h4>
                <p>The facility is partially supervised. Staff are on-site and have camera access but are not always in the recovery room.</p>
              </section>

              {/* Section 4 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">4. Signage, Information & Safety</h4>
                <p>Clear instructions, contraindications, temperature guidance, and emergency procedures are provided.</p>
              </section>

              {/* Section 5 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">5. Privacy & GDPR</h4>
                <p className="mb-2">We collect: contact details, health declarations, waiver, booking data, and IP/device data.</p>
                <p className="mb-2">Retention: while a person uses the facility + 24 months.</p>
                <p>GDPR rights include access, correction, deletion (where legally permissible).</p>
              </section>

              {/* Section 6 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">6. Your Responsibilities</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ensure you are medically fit to use the facilities.</li>
                  <li>Stop immediately if unwell.</li>
                  <li>Conditions requiring caution: heart/BP issues, respiratory issues, circulatory disorders, diabetes, Raynaud's, pregnancy (pending insurer confirmation), neurological issues, recent surgery, infection/fever.</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">7. Zero-Tolerance Policy</h4>
                <p>No alcohol, drugs, or impairing medication.</p>
              </section>

              {/* Section 8 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">8. Safe Behaviour</h4>
                <p>Follow instructions, maintain hygiene, report hazards, avoid unsafe movements, enter/exit slowly.</p>
              </section>

              {/* Section 9 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">9. Accuracy of Information</h4>
                <p>You confirm all information provided is true and complete.</p>
              </section>

              {/* Section 10 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">10. Your Safety During Sessions</h4>
                <p>You are responsible for monitoring your own condition, staying hydrated, following timing guidelines, and exiting immediately if experiencing dizziness, pain, numbness, breathing difficulty, or confusion.</p>
              </section>

              {/* Section 11 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">11. Emergencies</h4>
                <p>Leave equipment immediately if unwell, notify staff, accept first aid, and understand emergency services may be called.</p>
              </section>

              {/* Section 12 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">12. Respectful Conduct</h4>
                <p>Treat staff and users respectfully, use equipment properly, follow rules, and report damage.</p>
              </section>
            </div>

            {/* LIABILITY WAIVER SECTION */}
            <div className="mb-8 pt-6 border-t-2 border-[#d8ba5b]/30">
              <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-4 mb-6">
                <h3 className="text-xl font-bold text-red-300 text-center">LIABILITY WAIVER & RELEASE OF CLAIMS</h3>
              </div>

              {/* Waiver Section 1 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">1. Purpose</h4>
                <p>This Waiver explains the risks involved in using HQ Recovery facilities and records your voluntary agreement to assume these risks.</p>
              </section>

              {/* Waiver Section 2 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">2. Acknowledgement of Risks</h4>
                <p className="mb-2">Risks include but are not limited to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Cold shock, hyperventilation, dizziness, fainting, heart rhythm effects.</li>
                  <li>Overheating, dehydration, burns, blood pressure changes.</li>
                  <li>Compression risks: numbness, circulation restriction, bruising.</li>
                  <li>Slip/trip hazards, misuse injuries, aggravation of unknown conditions, loss of consciousness.</li>
                </ul>
              </section>

              {/* Waiver Section 3 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">3. Voluntary Assumption of Risk</h4>
                <p>You confirm participation is voluntary and at your own risk.</p>
              </section>

              {/* Waiver Section 4 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">4. Medical Fitness Declaration</h4>
                <p>You confirm you are medically fit, have sought medical advice when necessary, and take full responsibility for managing your health.</p>
              </section>

              {/* Waiver Section 5 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">5. Supervision Disclosure</h4>
                <p>HQ Recovery is partially supervised. You may use some equipment without direct supervision.</p>
              </section>

              {/* Waiver Section 6 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">6. Release of Liability (Within Irish Law)</h4>
                <p>You release G-Castle Recovery Ltd and its staff from liability for injury, illness, property damage, or loss arising from facility use, except where liability cannot be excluded under Irish law.</p>
              </section>

              {/* Waiver Section 7 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">7. Legal Limitations</h4>
                <p className="mb-2">This waiver DOES NOT:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Exclude liability for death or personal injury caused by gross negligence.</li>
                  <li>Affect statutory consumer rights.</li>
                </ul>
              </section>

              {/* Waiver Section 8 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">8. Indemnity</h4>
                <p>You agree to indemnify HQ Recovery for claims arising from your actions, misuse, failure to follow instructions, or inaccurate information.</p>
              </section>

              {/* Waiver Section 9 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">9. Emergency Care Consent</h4>
                <p>You consent to first aid, staff assistance, emergency services, and accept responsibility for any medical costs.</p>
              </section>

              {/* Waiver Section 10 */}
              <section className="mb-6">
                <h4 className="text-lg font-semibold text-white mb-2">10. Data & Digital Signature Verification (GDPR)</h4>
                <p>We store your waiver, signature, and digital audit trail (IP/device data). Retention: duration of facility use + 24 months.</p>
              </section>
            </div>

            {/* USER DECLARATION */}
            <div className="mb-6 pt-6 border-t-2 border-[#d8ba5b]/30">
              <div className="bg-[#d8ba5b]/10 border border-[#d8ba5b]/30 rounded-lg p-4 mb-4">
                <h3 className="text-xl font-bold text-[#d8ba5b] text-center">USER DECLARATION</h3>
              </div>

              <p className="mb-3 font-semibold text-white">I confirm that:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>I have read and understood the Health Commitment Statement & Liability Waiver.</li>
                <li>I understand all risks involved in heat, cold, and compression recovery.</li>
                <li>I voluntarily assume all risks.</li>
                <li>I accept full responsibility for my health and behaviour.</li>
                <li>All information provided is accurate.</li>
                <li>I agree to follow all HQ Recovery rules, policies, signage, and safety guidance.</li>
              </ul>

              <div className="mt-4 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
                <p className="text-blue-300 text-sm text-center">
                  <strong>Note:</strong> By checking the acceptance box during sign-up, you are providing your digital signature and agreement to this document. Your acceptance will be recorded with a timestamp for legal compliance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#3a342f] p-6">
          <button
            onClick={onClose}
            className="w-full bg-[#d8ba5b] text-[#231f1e] py-3 px-4 rounded-lg font-semibold hover:bg-[#c9a852] transition-all duration-200 transform hover:scale-[1.02]"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
