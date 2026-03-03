import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import PrivacyModal from '../components/PrivacyModal'
import TermsModal from '../components/TermsModal'

const heroSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 500'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%231e3c72;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%232a5298;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%23ff6b35;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='500' fill='url(%23grad)'/%3E%3Cg opacity='0.1'%3E%3Ccircle cx='450' cy='150' r='100' fill='white'/%3E%3Ccircle cx='150' cy='350' r='80' fill='white'/%3E%3C/g%3E%3Ctext x='50%25' y='45%25' font-family='Arial, sans-serif' font-size='60' font-weight='bold' fill='white' text-anchor='middle'%3ELegal%3C/text%3E%3Ctext x='50%25' y='55%25' font-family='Arial, sans-serif' font-size='50' font-weight='bold' fill='white' text-anchor='middle' opacity='0.9'%3EService%3C/text%3E%3Cpath d='M 200 250 L 250 200 L 300 250 L 350 220 L 400 260' stroke='white' stroke-width='4' fill='none' opacity='0.6'/%3E%3C/svg%3E`

const Home = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const orderRef = useRef(null)

  // Form State (moved from Order.jsx)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    service: '',
    clientType: '',
    caseName: '',
    recipientFirstName: '',
    recipientLastName: '',
    recipientPhone: '',
    recipientAddress: '',
    contactEmail: '',
    contactPhone: '',
    paymentMethod: '',
    ageConfirmed: false,
    termsAgree: false
  })
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [generatedTrackingNumber, setGeneratedTrackingNumber] = useState('')

  const totalSteps = 4

  const services = [
    { id: 'posting', name: 'Posting', price: '$40', description: 'Posting the second day after the first attempt. One attempt between 6pm-10pm in Minnesota. May increase to $65 depending on location.' },
    { id: 'standard', name: 'Standard Service', price: '$75', description: 'Within 10 days, 4 different attempts completed. First attempt within 6 hours. May increase to $160 depending on location and risks.' },
    { id: 'expedited', name: 'Expedited Service', price: '$120', description: 'In 3 days, 4 attempts completed. First attempt on first day. May increase to $190 in hostile environments.' },
    { id: 'rush', name: 'Same Day (Rush)', price: '$190', description: 'Jobs accepted before 1pm get same-day service. 4 attempts within 24 hours. May increase to $300 in hostile environments.' }
  ]

  const paymentMethods = [
    { id: 'zelle', name: 'Zelle', icon: '💰', description: 'Free - No fees' },
    { id: 'card', name: 'Credit Card', icon: '💳', description: 'Free processing' }
  ]

  const steps = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Case Info' },
    { num: 3, label: 'Documents' },
    { num: 4, label: 'Payment' }
  ]

  const progressWidth = currentStep === 1 ? '0%' : currentStep >= totalSteps ? '100%' : `${((currentStep - 1) / (totalSteps - 1)) * 100}%`

  const handleServiceSelect = (id) => setFormData(prev => ({ ...prev, service: id }))
  const handlePaymentSelect = (id) => setFormData(prev => ({ ...prev, paymentMethod: id }))

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    setUploadedFiles(prev => {
      const combined = [...prev]
      newFiles.forEach(f => { if (!combined.some(x => x.name === f.name)) combined.push(f) })
      return combined
    })
  }

  const removeFile = (name) => setUploadedFiles(prev => prev.filter(f => f.name !== name))

  const validateStep = (step) => {
    if (step === 1 && !formData.service) { alert('Please select a service'); return false }
    if (step === 2) {
      if (!formData.clientType || !formData.caseName || !formData.recipientFirstName || !formData.recipientLastName || !formData.recipientAddress || !formData.contactEmail || !formData.contactPhone) {
        alert('Please fill in all required fields'); return false
      }
      if (!formData.ageConfirmed) { alert('Please check all required boxes'); return false }
    }
    if (step === 4) {
      if (!formData.paymentMethod) { alert('Please select a payment method'); return false }
      if (!formData.termsAgree) { alert('Please agree to the terms'); return false }
    }
    return true
  }

  const nextStep = () => {
    if (!validateStep(currentStep)) return
    if (currentStep < totalSteps) setCurrentStep(s => s + 1)
    else submitForm()
  }

  const prevStep = () => { if (currentStep > 1) setCurrentStep(s => s - 1) }

  const submitForm = () => {
    const trackingNumber = 'SOP-2026-' + (Math.floor(Math.random() * 900000) + 100000)
    setGeneratedTrackingNumber(trackingNumber)
    setCurrentStep(5)
  }

  const goToTracking = () => {
    navigate('/tracking', { state: { trackingNumber: generatedTrackingNumber } })
  }

  const scrollToOrder = () => {
    orderRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (location.hash === '#order-form') {
      scrollToOrder()
    }
  }, [location])

  const inputStyle = {
    width: '100%',
    padding: '14px',
    border: '2px solid #ecf0f1',
    borderRadius: '8px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    marginBottom: '15px'
  }

  return (
    <div>
      {/* Hero Section */}
      <section style={{ background: 'white', minHeight: '85vh', display: 'flex', alignItems: 'center', padding: '60px 0', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center', width: '100%' }} className="hero-content-grid container-px">
          <div style={{ paddingRight: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ color: '#ff6b35', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>
              VETERAN-OWNED &amp; OPERATED
            </div>
            <h1 style={{ fontWeight: 800, marginBottom: '20px', color: '#2c3e50' }} className="responsive-h1">
              Yutramlegal Process Service
            </h1>
            <p style={{ fontSize: '1.3rem', color: '#2c3e50', fontWeight: 600, marginBottom: '15px' }}>
              The Reliable Tool to Deliver Your Legal Documents
            </p>
            <p style={{ fontSize: '1.1rem', marginBottom: '30px', color: '#5a6c7d', lineHeight: 1.6 }}>
              Through Honor and Diversity, we connect conflicting parties together to resolve every legal matter with Dignity and Courtesy. Your Elite Process Service Ready to Get Your Jobs Done.
            </p>

            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }} className="hero-buttons-container">
              <button
                onClick={scrollToOrder}
                style={{
                  padding: '16px 35px',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                  color: 'white',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(255,107,53,0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(255,107,53,0.4)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 15px rgba(255,107,53,0.3)' }}
              >
                Place Order
              </button>
              <Link
                to="/tracking"
                style={{
                  padding: '16px 35px',
                  background: 'white',
                  color: '#ff6b35',
                  border: '2px solid #ff6b35',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-block'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff5f0' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white' }}
              >
                Track Order
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', paddingTop: '30px', borderTop: '2px solid #ecf0f1' }} className="hero-stats-grid">
              {[
                { number: 'Veterans', label: 'Team Members' },
                { number: 'MN + 5', label: 'States Covered' },
                { number: 'Since 2014', label: 'Experience' },
                { number: '7am-10pm', label: 'Service Hours' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '2rem', fontWeight: 800, display: 'block', marginBottom: '5px', color: '#ff6b35' }}>{stat.number}</span>
                  <span style={{ fontSize: '0.75rem', color: '#7f8c8d', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src={heroSvg}
              alt="Professional Legal Services"
              style={{ width: '100%', maxWidth: '550px', height: 'auto', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}
            />
          </div>
        </div>
      </section>

      {/* Main Form Section - Integrated directly from Order.jsx */}
      <div ref={orderRef} id="order-form" style={{ padding: '80px 20px', background: '#f5f7fa' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '40px', position: 'relative', overflow: 'hidden' }}>

            {/* Progress Bar */}
            {currentStep < 5 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '20px', left: 0, right: 0, height: '3px', background: '#e0e0e0', zIndex: 0 }} />
                <div style={{ position: 'absolute', top: '20px', left: 0, height: '3px', background: 'linear-gradient(90deg, #ff6b35 0%, #ff8c42 100%)', width: progressWidth, transition: 'width 0.4s ease', zIndex: 1 }} />

                {steps.map((step) => {
                  const isActive = currentStep === step.num
                  const isCompleted = currentStep > step.num
                  return (
                    <div key={step.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2, flex: 1 }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '50%',
                        background: isCompleted ? '#27ae60' : isActive ? '#ff6b35' : 'white',
                        border: `3px solid ${isCompleted ? '#27ae60' : isActive ? '#ff6b35' : '#e0e0e0'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 'bold',
                        color: isCompleted || isActive ? 'white' : '#bdc3c7',
                        transition: 'all 0.3s ease',
                        marginBottom: '8px',
                        transform: isActive ? 'scale(1.1)' : 'scale(1)'
                      }}>
                        {isCompleted ? '✓' : step.num}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: isActive ? '#ff6b35' : '#95a5a6', fontWeight: isActive ? 600 : 500, textAlign: 'center' }}>
                        {step.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Form Steps */}
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h2 style={{ fontSize: '1.8rem', color: '#2c3e50', marginBottom: '25px', fontWeight: 600 }}>Select Your Service</h2>
                  <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
                    {services.map(service => (
                      <label
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        style={{
                          border: `2px solid ${formData.service === service.id ? '#ff6b35' : '#ecf0f1'}`,
                          borderRadius: '12px',
                          padding: '25px',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          position: 'relative',
                          display: 'block',
                          background: formData.service === service.id ? 'linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)' : 'white',
                          boxShadow: formData.service === service.id ? '0 5px 20px rgba(255,107,53,0.15)' : 'none',
                          transform: formData.service === service.id ? 'translateY(-2px)' : 'none'
                        }}
                      >
                        <input type="radio" name="service" value={service.id} checked={formData.service === service.id} onChange={() => handleServiceSelect(service.id)} style={{ position: 'absolute', opacity: 0 }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ fontSize: '1.3rem', fontWeight: 600, color: '#2c3e50' }}>{service.name}</span>
                          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ff6b35' }}>{service.price}</span>
                        </div>
                        <p style={{ color: '#7f8c8d', lineHeight: 1.6, margin: 0 }}>{service.description}</p>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Case Information */}
              {currentStep === 2 && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h2 style={{ fontSize: '1.8rem', color: '#2c3e50', marginBottom: '25px', fontWeight: 600 }}>Case Information</h2>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Client Type *</label>
                  <select name="clientType" value={formData.clientType} onChange={handleInputChange} style={inputStyle}>
                    <option value="">Select client type</option>
                    <option value="attorney">Attorney</option>
                    <option value="individual">Individual</option>
                    <option value="government">Government</option>
                  </select>

                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Case Name *</label>
                  <input type="text" name="caseName" value={formData.caseName} onChange={handleInputChange} placeholder="Enter case name" style={inputStyle} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Recipient First Name *</label>
                      <input type="text" name="recipientFirstName" value={formData.recipientFirstName} onChange={handleInputChange} placeholder="First name" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Recipient Last Name *</label>
                      <input type="text" name="recipientLastName" value={formData.recipientLastName} onChange={handleInputChange} placeholder="Last name" style={inputStyle} />
                    </div>
                  </div>

                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Recipient Phone</label>
                  <input type="tel" name="recipientPhone" value={formData.recipientPhone} onChange={handleInputChange} placeholder="Phone number (optional)" style={inputStyle} />

                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Service Address *</label>
                  <textarea name="recipientAddress" value={formData.recipientAddress} onChange={handleInputChange} placeholder="Complete service address" style={{ ...inputStyle, height: '100px', resize: 'vertical' }} />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Your Email *</label>
                      <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} placeholder="your@email.com" style={inputStyle} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Your Phone *</label>
                      <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} placeholder="(651) 460-0943" style={inputStyle} />
                    </div>
                  </div>

                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', marginTop: '10px' }}>
                    <input type="checkbox" name="ageConfirmed" checked={formData.ageConfirmed} onChange={handleInputChange} style={{ width: 'auto', marginTop: '4px' }} />
                    <span style={{ fontWeight: 500, color: '#2c3e50', lineHeight: 1.5 }}>
                      I certify that I am at least 18 years of age and authorized to provide this information for legal service of process. *
                    </span>
                  </label>
                </div>
              )}

              {/* Step 3: Documents */}
              {currentStep === 3 && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h2 style={{ fontSize: '1.8rem', color: '#2c3e50', marginBottom: '25px', fontWeight: 600 }}>Upload Documents</h2>
                  <label htmlFor="fileInput" style={{ border: '2px dashed #bdc3c7', borderRadius: '12px', padding: '40px', textAlign: 'center', cursor: 'pointer', display: 'block', background: '#fafafa' }}>
                    <div style={{ fontSize: '3rem', color: '#ff6b35', marginBottom: '15px' }}>📄</div>
                    <div style={{ color: '#7f8c8d' }}>
                      <strong>Click to upload</strong> or drag and drop<br /> PDF, JPEG (Max 10MB)
                    </div>
                    <input type="file" id="fileInput" multiple accept=".pdf,.jpg,.jpeg" onChange={handleFileChange} style={{ display: 'none' }} />
                  </label>
                  {uploadedFiles.map((file, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#f8f9fa', borderRadius: '8px', marginTop: '10px' }}>
                      <span>📎 {file.name}</span>
                      <button type="button" onClick={() => removeFile(file.name)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>×</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 4: Payment */}
              {currentStep === 4 && (
                <div style={{ animation: 'fadeIn 0.4s ease' }}>
                  <h2 style={{ fontSize: '1.8rem', color: '#2c3e50', marginBottom: '25px', fontWeight: 600 }}>Payment Method</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                    {paymentMethods.map(method => (
                      <label key={method.id} onClick={() => handlePaymentSelect(method.id)} style={{ border: `2px solid ${formData.paymentMethod === method.id ? '#ff6b35' : '#ecf0f1'}`, borderRadius: '12px', padding: '30px', textAlign: 'center', cursor: 'pointer', background: formData.paymentMethod === method.id ? '#fff5f0' : 'white' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{method.icon}</div>
                        <div style={{ fontWeight: 600, color: '#2c3e50' }}>{method.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginTop: '5px' }}>{method.description}</div>
                      </label>
                    ))}
                  </div>
                  <label style={{ display: 'flex', align_items: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" name="termsAgree" checked={formData.termsAgree} onChange={handleInputChange} style={{ width: 'auto', marginTop: '4px' }} />
                    <span style={{ fontWeight: 500, color: '#2c3e50', lineHeight: 1.5 }}>
                      I agree to the <a href="#" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true) }} style={{ color: '#ff6b35' }}>Privacy Policy</a> and <a href="#" onClick={(e) => { e.preventDefault(); setShowTermsModal(true) }} style={{ color: '#ff6b35' }}>Terms of Service</a>. *
                    </span>
                  </label>
                </div>
              )}

              {/* Step 5: Success */}
              {currentStep === 5 && (
                <div style={{ animation: 'fadeIn 0.4s ease', textAlign: 'center', padding: '40px 0' }}>
                  <div style={{ fontSize: '5rem', color: '#27ae60', marginBottom: '20px' }}>✓</div>
                  <h2 style={{ fontSize: '2rem', color: '#2c3e50', marginBottom: '15px' }}>Order Submitted Successfully!</h2>
                  <p style={{ color: '#7f8c8d', fontSize: '1.1rem', marginBottom: '20px' }}>
                    You will receive a confirmation email shortly with tracking information.
                  </p>
                  <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '12px', margin: '20px 0', border: '2px dashed #ff6b35' }}>
                    <p style={{ margin: 0, color: '#2c3e50' }}>Your tracking number:</p>
                    <strong style={{ color: '#ff6b35', fontSize: '1.3rem' }}>{generatedTrackingNumber}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={goToTracking}
                    style={{
                      marginTop: '20px',
                      padding: '16px 32px',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,107,53,0.3)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
                  >
                    Track Your Order
                  </button>
                </div>
              )}

              {/* Controls */}
              {currentStep < 5 && (
                <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                  {currentStep > 1 && (
                    <button type="button" onClick={prevStep} style={{ flex: 1, padding: '16px', borderRadius: '8px', border: '2px solid #ecf0f1', background: 'white', fontWeight: 600, cursor: 'pointer' }}>
                      Previous
                    </button>
                  )}
                  <button type="button" onClick={nextStep} style={{ flex: 1, padding: '16px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)', color: 'white', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 15px rgba(255,107,53,0.3)' }}>
                    {currentStep === totalSteps ? 'Submit Order' : 'Continue'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </div>
  )
}

export default Home
