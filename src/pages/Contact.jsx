import React from 'react';

const Contact = () => {
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
      <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✉️</div>
      <h1 style={{ fontSize: '2.5rem', color: '#2c3e50', marginBottom: '20px' }}>Contactez-nous</h1>
      <p style={{ fontSize: '1.2rem', color: '#7f8c8d', lineHeight: 1.6, marginBottom: '30px' }}>
        Vous avez des questions ? Nous sommes là pour vous aider. Notre portail de contact est en cours de création pour faciliter nos échanges.
        En attendant, n'hésitez pas à utiliser les informations dans notre pied de page !
      </p>
      <div style={{ 
        padding: '15px 30px', 
        background: 'linear-gradient(135deg, #f5fdf5 0%, #e8f7e8 100%)', 
        borderRadius: '12px',
        border: '1px dashed #27ae60',
        color: '#27ae60',
        fontWeight: 600
      }}>
        Lancement du portail bientôt
      </div>
    </div>
  );
};

export default Contact;
