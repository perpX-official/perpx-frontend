import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-white/60 mb-8">Last updated: January 21, 2026</p>

        <div className="space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. General Information</h2>
            <p className="mb-4">
              PerpX ("we", "our", "us") operates a decentralized perpetual trading platform. This Privacy Policy explains how we collect, use, and protect your personal information when you use our services.
            </p>
            <p>
              Protecting your personal data is very important to us. We are committed to transparency about our data practices and your privacy rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">Technical Data</h3>
            <p className="mb-4">
              When you use our platform, we collect anonymized technical information including IP addresses, browser type, device information, and usage patterns. This data helps us ensure the functionality and security of our services.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Wallet Information</h3>
            <p className="mb-4">
              We collect your blockchain wallet address and transaction history when you interact with our smart contracts. This information is necessary to provide trading services and is recorded on the public blockchain.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">Communication Data</h3>
            <p>
              When you contact us through support channels, we collect the information you provide including your contact details and the content of your communications.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the collected information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain our trading platform</li>
              <li>Process your transactions and trading activities</li>
              <li>Improve our services and user experience</li>
              <li>Ensure platform security and prevent fraud</li>
              <li>Comply with legal obligations and regulations</li>
              <li>Communicate with you about service updates</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Legal Basis for Processing</h2>
            <p className="mb-4">We process your personal data based on:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Performance of contract with you</li>
              <li>Compliance with legal obligations</li>
              <li>Our legitimate interests in operating and improving the platform</li>
              <li>Your consent, where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Data Sharing and Disclosure</h2>
            <p className="mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Service providers who assist in operating our platform</li>
              <li>Legal authorities when required by law</li>
              <li>Professional advisors such as lawyers and auditors</li>
              <li>Third parties in connection with business transfers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
            <p>
              We retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Your Rights</h2>
            <p className="mb-4">Depending on your jurisdiction, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Right to access your personal data</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure of your data</li>
              <li>Right to restriction of processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your data in accordance with applicable data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <p className="mt-4">
              Email: privacy@perpx.exchange
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

