import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const mockOrders = {
  'SOP-2026-001234': {
    orderNumber: 'SOP-2026-001234',
    status: 'In Progress',
    statusClass: 'in-progress',
    orderDate: 'January 20, 2026',
    serviceType: 'Rush Service',
    recipient: 'John Doe',
    estimatedDelivery: 'January 23, 2026',
    timeline: [
      { date: 'Jan 20, 2026 – 09:30', title: '✅ Order received', description: 'Your order has been recorded and confirmed.', status: 'completed' },
      { date: 'Jan 20, 2026 – 14:15', title: '📋 Documents verified', description: 'All documents have been reviewed and validated by our legal team.', status: 'completed' },
      { date: 'Jan 21, 2026 – 10:00', title: '🚗 Process server dispatched', description: 'A process server is on their way to the service address.', status: 'active' },
      { date: 'Pending', title: '📝 Service completed', description: 'Documents successfully delivered. Affidavit of service will be provided.', status: 'pending' },
      { date: 'Pending', title: '📊 Proof of service', description: 'GPS-verified affidavit and photos available for download.', status: 'pending' }
    ]
  },
  'SOP-2026-001235': {
    orderNumber: 'SOP-2026-001235',
    status: 'Completed',
    statusClass: 'completed',
    orderDate: 'January 18, 2026',
    serviceType: 'Standard Service',
    recipient: 'Jane Smith',
    estimatedDelivery: 'January 25, 2026',
    timeline: [
      { date: 'Jan 18, 2026 – 11:00', title: '✅ Order received', description: 'Your order has been recorded and confirmed.', status: 'completed' },
      { date: 'Jan 18, 2026 – 16:30', title: '📋 Documents verified', description: 'All documents have been reviewed and validated by our legal team.', status: 'completed' },
      { date: 'Jan 19, 2026 – 09:00', title: '🚗 Process server dispatched', description: 'A process server is on their way to the service address.', status: 'completed' },
      { date: 'Jan 20, 2026 – 14:45', title: '📝 Service completed', description: 'Documents successfully delivered. Affidavit of service will be provided.', status: 'completed' },
      { date: 'Jan 20, 2026 – 15:30', title: '📊 Proof of service', description: 'GPS-verified affidavit and photos available for download.', status: 'completed' }
    ]
  }
}

const statusStyles = {
  'In Progress': { background: '#cce5ff', color: '#004085' },
  Completed: { background: '#d4edda', color: '#155724' },
  Pending: { background: '#fff3cd', color: '#856404' }
}

const Tracking = () => {
  const location = useLocation()
  const [trackingInput, setTrackingInput] = useState('')
  const [trackingData, setTrackingData] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (location.state?.trackingNumber) {
      setTrackingInput(location.state.trackingNumber)
      handleTracking(location.state.trackingNumber)
    }
  }, [location.state])

  const handleTracking = (num) => {
    const searchNum = num.trim().toUpperCase()
    setError('')
    setTrackingData(null)

    if (!searchNum) {
      setError('❌ Please enter a tracking number')
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      const order = mockOrders[searchNum]
      if (order) {
        setTrackingData(order)
        setTimeout(() => {
          document.getElementById('trackingResult')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      } else {
        if (searchNum.startsWith('SOP-2026-')) {
          setTrackingData({
            orderNumber: searchNum,
            status: 'In Progress',
            statusClass: 'in-progress',
            orderDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            serviceType: 'Standard Service',
            recipient: 'Client',
            estimatedDelivery: 'TBD',
            timeline: [
              { date: 'Just now', title: '✅ Order received', description: 'Your order has been recorded and confirmed.', status: 'completed' },
              { date: 'Pending', title: '📋 Documents verified', description: 'Documents are being reviewed.', status: 'pending' },
            ]
          })
        } else {
          setError('❌ Tracking number not found. Please check and try again.')
        }
      }
      setIsLoading(false)
    }, 600)
  }

  const trackOrder = () => {
    handleTracking(trackingInput)
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') trackOrder() }

  return (
    <div style={{ padding: '50px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header card — matches HTML */}
        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '30px 20px', background: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '10px' }}>📦 Order Tracking</h1>
          <p style={{ color: '#7f8c8d', fontSize: '1.1rem' }}>Track your service of process in real time</p>
        </div>

        {/* Tracking Form */}
        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '40px', marginBottom: '30px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: '#2c3e50', fontSize: '0.95rem' }}>Tracking Number</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <input
                type="text"
                value={trackingInput}
                onChange={e => setTrackingInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ex: SOP-2026-001234"
                required
                style={{ flex: 1, padding: '14px', border: '2px solid #ecf0f1', borderRadius: '8px', fontSize: '1rem', fontFamily: 'inherit', outline: 'none', transition: 'all 0.3s ease' }}
                onFocus={e => { e.target.style.borderColor = '#ff6b35'; e.target.style.boxShadow = '0 0 0 3px rgba(255,107,53,0.1)' }}
                onBlur={e => { e.target.style.borderColor = '#ecf0f1'; e.target.style.boxShadow = 'none' }}
              />
              <button
                onClick={trackOrder}
                disabled={isLoading}
                style={{
                  padding: '16px 40px',
                  background: 'linear-gradient(135deg, #ff6b35 0%, #ff8c42 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  whiteSpace: 'nowrap',
                  opacity: isLoading ? 0.7 : 1
                }}
                onMouseEnter={e => { if (!isLoading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(255,107,53,0.3)' } }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '' }}
              >
                {isLoading ? 'Tracking...' : 'Track'}
              </button>
            </div>
          </div>
          <p style={{ color: '#7f8c8d', fontSize: '0.9rem', marginTop: '10px' }}>
            💡 Your tracking number was sent by email after your order
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{ background: '#f8d7da', color: '#721c24', padding: '20px', borderRadius: '12px', border: '2px solid #f5c6cb', animation: 'fadeIn 0.5s ease', marginBottom: '20px' }}>
            {error}
          </div>
        )}

        {/* Tracking Result */}
        {trackingData && (
          <div id="trackingResult" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '40px', animation: 'fadeIn 0.5s ease' }}>

            {/* Order Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '2px solid #ecf0f1', flexWrap: 'wrap', gap: '15px' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2c3e50' }}>Order #{trackingData.orderNumber}</div>
              <div style={{ padding: '10px 20px', borderRadius: '25px', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px', ...(statusStyles[trackingData.status] || { background: '#e9ecef', color: '#495057' }) }}>
                {trackingData.status}
              </div>
            </div>

            {/* Order Details */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {[
                { label: 'Order Date', value: trackingData.orderDate },
                { label: 'Service Type', value: trackingData.serviceType },
                { label: 'Recipient', value: trackingData.recipient },
                { label: 'Est. Delivery', value: trackingData.estimatedDelivery }
              ].map(item => (
                <div key={item.label} style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px', borderLeft: '4px solid #ff6b35' }}>
                  <div style={{ fontSize: '0.85rem', color: '#7f8c8d', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>{item.label}</div>
                  <div style={{ fontSize: '1.1rem', color: '#2c3e50', fontWeight: 600 }}>{item.value}</div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative', paddingLeft: '40px' }}>
              <div style={{ position: 'absolute', left: '15px', top: 0, bottom: 0, width: '3px', background: '#ecf0f1' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#2c3e50', fontWeight: 700, marginBottom: '30px', marginLeft: '-40px' }}>Tracking History</h3>

              {trackingData.timeline.map((item, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '30px', paddingBottom: '30px' }}>
                  {/* Dot */}
                  <div style={{
                    position: 'absolute',
                    left: '-32px',
                    top: '5px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: item.status === 'completed' ? '#27ae60' : item.status === 'active' ? '#ff6b35' : 'white',
                    border: `3px solid ${item.status === 'completed' ? '#27ae60' : item.status === 'active' ? '#ff6b35' : '#ecf0f1'}`,
                    zIndex: 1,
                    boxShadow: item.status === 'active' ? '0 0 0 4px rgba(255,107,53,0.2)' : 'none'
                  }} />

                  {/* Content */}
                  <div style={{
                    background: item.status === 'active' ? 'linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)' : '#f8f9fa',
                    padding: '20px',
                    borderRadius: '12px',
                    border: item.status === 'active' ? '2px solid #ff6b35' : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: '#7f8c8d', marginBottom: '8px' }}>{item.date}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#2c3e50', marginBottom: '8px' }}>{item.title}</div>
                    <div style={{ color: '#7f8c8d', lineHeight: 1.6 }}>{item.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tracking
