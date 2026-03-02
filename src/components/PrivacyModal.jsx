import Modal from './Modal'

const PrivacyModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy – Yutramlegal">
      <p><strong>Last Updated: January 27, 2026</strong></p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">1. Scope and Age Restriction (COPPA)</h3>
      <p>Our services are not intended for persons under 18 years of age. We do not knowingly collect data from minors.</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">2. Data Collected</h3>
      <p>We collect only information strictly necessary for service execution:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>Client contact information (name, phone, email)</li>
        <li>Information about the person to be served (name, address)</li>
        <li>Legal documents uploaded (PDF, JPEG)</li>
        <li>Order and payment information</li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">3. Purpose of Collection</h3>
      <p>Information collected is used only to execute legal document service, provide proof of service, communicate with clients, and comply with legal obligations. No information is sold or shared for marketing purposes.</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">4. Data Security</h3>
      <p>All PDF/JPEG documents uploaded are transmitted via HTTPS/TLS, ensuring data encryption in transit.</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">5. Contact</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li>Email: info@yutramlegal.com</li>
        <li>Phone: (651) 460-0943</li>
      </ul>
    </Modal>
  )
}

export default PrivacyModal
