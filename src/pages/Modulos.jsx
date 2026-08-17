import React from 'react';

export default function Modulos() {
  const modulos = [
    { titulo: 'Lectura Crítica', desc: 'Análisis de textos continuos y discontinuos.' },
    { titulo: 'Matemáticas', desc: 'Álgebra, geometría y estadística.' },
    { titulo: 'Sociales y Ciudadanas', desc: 'Competencias ciudadanas e historia.' },
    { titulo: 'Ciencias Naturales', desc: 'Biología, física y química.' },
    { titulo: 'Inglés', desc: 'Comprensión lectora y vocabulario por niveles.' }
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#6A0DAD', textAlign: 'center', marginBottom: '10px' }}>Módulos de Estudio</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Selecciona un área para acceder a los materiales de preparación.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {modulos.map((m, index) => (
          <div key={index} style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #e0e0e0',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <h3 style={{ color: '#6A0DAD', marginTop: 0 }}>{m.titulo}</h3>
            <p style={{ color: '#555', fontSize: '14px' }}>{m.desc}</p>
            <button style={{
              backgroundColor: '#6A0DAD',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}>
              Estudiar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
