import React from 'react';

const About = () => {
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
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📖</div>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '20px' }}>À propos de Yutramlegal</h1>
      <p style={{ fontSize: '1.2rem', color: '#7f8c8d', lineHeight: 1.6, marginBottom: '30px' }}>
        Découvrez notre histoire, nos valeurs et notre engagement envers l'excellence. 
        Nous préparons cette page pour partager davantage sur notre mission en tant qu'entreprise gérée par des vétérans.
      </p>
      <div style={{ 
        padding: '15px 30px', 
        background: 'linear-gradient(135deg, #f0f7ff 0%, #e0efff 100%)', 
        borderRadius: '12px',
        border: '1px dashed #3498db',
        color: '#3498db',
        fontWeight: 600
      }}>
        En cours de construction
      </div>
    </div>
  );
};

export default About;
