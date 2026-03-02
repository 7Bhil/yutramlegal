import Modal from './Modal'

const CookieModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cookie Policy – Yutramlegal">
      <p><strong>Last Updated: January 27, 2026</strong></p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">What Are Cookies?</h3>
      <p>Cookies are small text files placed on your device to help our website function properly.</p>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Cookies We Use</h3>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Essential Cookies:</strong> Required for website functionality.</li>
        <li><strong>Analytical Cookies:</strong> Help us improve our services.</li>
      </ul>
      
      <h3 className="text-lg font-semibold mt-4 mb-2">Contact</h3>
      <p>Questions? Contact us at info@yutramlegal.com</p>
    </Modal>
  )
}

export default CookieModal
