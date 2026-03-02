import React from 'react';

const Services = () => {
  return (
    <div style={{ 
      padding: '120px 20px', 
      textAlign: 'center', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🛠️</div>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '20px' }}>Nos Services</h1>
      <p style={{ fontSize: '1.2rem', color: '#7f8c8d', lineHeight: 1.6, marginBottom: '30px' }}>
        Nous affinons actuellement nos offres de services pour vous offrir la meilleure expérience possible. 
        Cette page est en cours de développement et sera disponible très bientôt !
      </p>
      <div style={{ 
        padding: '15px 30px', 
        background: 'linear-gradient(135deg, #fff5f0 0%, #ffe8dc 100%)', 
        borderRadius: '12px',
        border: '1px dashed #ff6b35',
        color: '#ff6b35',
        fontWeight: 600
      }}>
        Bientôt disponible - 2ème trimestre 2026
      </div>
    </div>
  );
};

export default Services;
