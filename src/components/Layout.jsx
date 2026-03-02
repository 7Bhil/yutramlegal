import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PrivacyModal from './PrivacyModal'
import TermsModal from './TermsModal'
import CookieModal from './CookieModal'

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showCookieModal, setShowCookieModal] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const navLinkStyle = (path) => ({
    color: isActive(path) ? '#ff6b35' : '#7f8c8d',
    textDecoration: 'none',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    padding: '8px 16px',
    borderRadius: '8px',
    background: isActive(path) ? 'linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)' : 'transparent',
    display: 'inline-block'
  })

  const mobileNavLinkStyle = (path) => ({
    color: isActive(path) ? '#ff6b35' : '#7f8c8d',
    textDecoration: 'none',
    fontWeight: 600,
    padding: '12px 16px',
    borderRadius: '10px',
    fontSize: '1rem',
    display: 'block',
    width: '100%',
    background: isActive(path) ? 'linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)' : 'transparent',
    transition: 'all 0.3s ease'
  })

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7fa' }}>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1100 }}
          onClick={closeMenu}
        />
      )}

      {/* Navigation */}
      <nav style={{ background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1200 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '15px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} className="container-px">
          {/* Logo */}
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#2c3e50', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span style={{ fontSize: '2rem' }}>⚖️</span>
            <span>Yutramlegal</span>
          </Link>

          {/* Desktop menu */}
          <ul style={{ display: 'flex', gap: '30px', listStyle: 'none', margin: 0, padding: 0 }} className="desktop-nav">
            <li><Link to="/" style={navLinkStyle('/')} onMouseEnter={e => { if (!isActive('/')) { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.background = '#fff5f0' } }} onMouseLeave={e => { if (!isActive('/')) { e.currentTarget.style.color = '#7f8c8d'; e.currentTarget.style.background = 'transparent' } }}>Home</Link></li>
            <li><Link to="/tracking" style={navLinkStyle('/tracking')} onMouseEnter={e => { if (!isActive('/tracking')) { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.background = '#fff5f0' } }} onMouseLeave={e => { if (!isActive('/tracking')) { e.currentTarget.style.color = '#7f8c8d'; e.currentTarget.style.background = 'transparent' } }}>Track Order</Link></li>
            <li><a href="#" style={{ color: '#7f8c8d', textDecoration: 'none', fontWeight: 600, padding: '8px 16px', borderRadius: '8px', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.background = '#fff5f0' }} onMouseLeave={e => { e.currentTarget.style.color = '#7f8c8d'; e.currentTarget.style.background = 'transparent' }}>Services</a></li>
            <li><a href="#" style={{ color: '#7f8c8d', textDecoration: 'none', fontWeight: 600, padding: '8px 16px', borderRadius: '8px', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.background = '#fff5f0' }} onMouseLeave={e => { e.currentTarget.style.color = '#7f8c8d'; e.currentTarget.style.background = 'transparent' }}>About Us</a></li>
            <li><a href="#" style={{ color: '#7f8c8d', textDecoration: 'none', fontWeight: 600, padding: '8px 16px', borderRadius: '8px', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.background = '#fff5f0' }} onMouseLeave={e => { e.currentTarget.style.color = '#7f8c8d'; e.currentTarget.style.background = 'transparent' }}>Contact</a></li>
          </ul>

          {/* Hamburger button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '8px',
              background: 'none',
              border: 'none',
              zIndex: 1200,
              position: 'relative'
            }}
            className="hamburger-btn"
          >
            <span style={{ display: 'block', width: '25px', height: '3px', background: '#2c3e50', borderRadius: '3px', transition: 'all 0.35s ease', transform: isMenuOpen ? 'translateY(8px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '25px', height: '3px', background: '#2c3e50', borderRadius: '3px', transition: 'all 0.35s ease', opacity: isMenuOpen ? 0 : 1, transform: isMenuOpen ? 'scaleX(0)' : 'none' }} />
            <span style={{ display: 'block', width: '25px', height: '3px', background: '#2c3e50', borderRadius: '3px', transition: 'all 0.35s ease', transform: isMenuOpen ? 'translateY(-8px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>

        {/* Mobile slide-in menu */}
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '280px',
          height: '100vh',
          background: 'white',
          boxShadow: '-5px 0 30px rgba(0,0,0,0.15)',
          padding: '80px 25px 40px',
          zIndex: 1150,
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
        onClick={(e) => e.stopPropagation()}
        >
          <Link to="/" style={mobileNavLinkStyle('/')} onClick={closeMenu}>Home</Link>
          <Link to="/tracking" style={mobileNavLinkStyle('/tracking')} onClick={closeMenu}>Track Order</Link>
          <a href="#" style={mobileNavLinkStyle('#')} onClick={closeMenu}>Services</a>
          <a href="#" style={mobileNavLinkStyle('#')} onClick={closeMenu}>About Us</a>
          <a href="#" style={mobileNavLinkStyle('#')} onClick={closeMenu}>Contact</a>
        </div>
      </nav>

      {/* Main content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: '#2c3e50', color: 'white', padding: '60px 0 30px', marginTop: '80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }} className="container-px">
          {/* Top grid: 2fr 1fr 1fr 1fr */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="footer-top-grid">
            {/* Brand */}
            <div style={{ paddingRight: '20px' }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>⚖️</span><span>Yutramlegal</span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '20px' }}>
                Authorized by the Minnesota Department of Justice to perform service of legal documents. Veteran-owned and operated since 2014.
              </p>
              <div style={{ marginTop: '20px' }}>
                {[
                  { icon: '📍', text: '[Your Business Address], Minneapolis, MN', href: null },
                  { icon: '📞', text: '(651) 460-0943', href: 'tel:+16514600943' },
                  { icon: '📞', text: '(888) 000-0000', href: 'tel:+18880000000' },
                  { icon: '📧', text: 'info@yutramlegal.com', href: 'mailto:info@yutramlegal.com' },
                ].map((item, i) => (
                  <p key={i} style={{ color: 'rgba(255,255,255,0.7)', margin: '8px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {item.icon} {item.href ? <a href={item.href} style={{ color: '#ff6b35', textDecoration: 'none' }}>{item.text}</a> : item.text}
                  </p>
                ))}
                <p style={{ marginTop: '15px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                  <strong>Service Hours:</strong><br />Mon-Fri: 7am – 10pm<br />Sat-Sun: 10am – 10pm
                </p>
              </div>
            </div>

            {/* Services & Pricing */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700, color: 'white' }}>Services &amp; Pricing</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Posting – $40', 'Standard – $75', 'Expedited – $120', 'Same Day (Rush) – $190', 'Track Your Order', 'Free Notary'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px' }}>
                    {item === 'Track Your Order'
                      ? <Link to="/tracking" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.paddingLeft = '5px' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.paddingLeft = '0' }}>{item}</Link>
                      : <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.paddingLeft = '5px' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.paddingLeft = '0' }}>{item}</a>
                    }
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Choose Us */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700, color: 'white' }}>Why Choose Us</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Veteran-Owned Team', 'MN DOJ Authorized', 'GPS & Photo Evidence', 'No Hidden Fees', 'Free Zelle & Card Processing', 'Experienced Since 2014'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.paddingLeft = '5px' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.paddingLeft = '0' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', fontWeight: 700, color: 'white' }}>Resources</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['About Us', 'Our Mission', 'Service Areas', 'FAQ', 'Testimonials', 'Contact Us'].map((item, i) => (
                  <li key={i} style={{ marginBottom: '12px' }}>
                    <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-block', transition: 'all 0.3s ease' }} onMouseEnter={e => { e.currentTarget.style.color = '#ff6b35'; e.currentTarget.style.paddingLeft = '5px' }} onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.paddingLeft = '0' }}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '30px', flexWrap: 'wrap', gap: '20px' }} className="footer-bottom-row">
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>
              © 2026 Yutramlegal Services. All rights reserved. | Authorized by Minnesota Department of Justice
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              {[{ label: 'Facebook', text: 'f' }, { label: 'Twitter', text: '𝕏' }, { label: 'LinkedIn', text: 'in' }, { label: 'Instagram', text: '📷' }].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textDecoration: 'none', fontSize: '1.2rem', transition: 'all 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ff6b35'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = '' }}>
                  {s.text}
                </a>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <a href="#" onClick={e => { e.preventDefault(); setShowPrivacyModal(true) }} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6b35'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Privacy Policy</a>
              <a href="#" onClick={e => { e.preventDefault(); setShowTermsModal(true) }} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6b35'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Terms of Service</a>
              <a href="#" onClick={e => { e.preventDefault(); setShowCookieModal(true) }} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = '#ff6b35'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}>Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <CookieModal isOpen={showCookieModal} onClose={() => setShowCookieModal(false)} />
    </div>
  )
}

export default Layout
