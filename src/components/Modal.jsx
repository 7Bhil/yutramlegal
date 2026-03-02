import { useEffect } from 'react'

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none"
        >
          ×
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
        
        <div className="prose prose-gray max-w-none">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
