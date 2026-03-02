import Modal from './Modal'

const TermsModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service – Yutramlegal">
      <p><strong>Last Updated: January 27, 2026</strong></p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">1. Services Provided</h3>
      <p>Yutramlegal provides professional service of process for legal documents in Minnesota and surrounding states, authorized by the Minnesota Department of Justice.</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">2. Service Pricing</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Posting:</strong> $40</li>
        <li><strong>Standard:</strong> $75</li>
        <li><strong>Expedited:</strong> $120</li>
        <li><strong>Same Day (Rush):</strong> $190</li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">3. Client Obligations</h3>
      <p>Clients must provide accurate information and be at least 18 years of age.</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">4. Payment Terms</h3>
      <p>Payment is required at time of order. We accept Zelle and credit cards with no additional fees.</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">5. Governing Law</h3>
      <p>These Terms are governed by Minnesota law.</p>
    </Modal>
  )
}

export default TermsModal
