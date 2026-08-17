import React from 'react';
import logoImg from '../assets/logo.jpg';

export default function Navbar({ paginaActual, setPaginaActual, user, setUser, onLogout }) {
  const handleLogout = () => {
    // Limpia el estado inmediatamente en React
    if (setUser) setUser(null);
    if (onLogout) onLogout();
    
    // Limpia storage local
    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <header style={{
      width: '100%',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #E2E8F0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}>
        
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={logoImg} 
            alt="Smart Academy Logo" 
            style={{ width: '48px', height: '48px', objectFit: 'contain' }} 
          />
          <div>
            <h1 style={{ 
              fontSize: '18px', 
              fontWeight: '900', 
              margin: 0, 
              color: '#4338CA', 
              letterSpacing: '0.5px',
              fontFamily: 'sans-serif'
            }}>
              SMART ACADEMY
            </h1>
            <p style={{ fontSize: '11px', margin: 0, color: '#64748B', fontWeight: '500' }}>
              Prepárate hoy, transforma tu futuro.
            </p>
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <button 
            onClick={() => setPaginaActual('inicio')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700',
              color: paginaActual === 'inicio' ? '#4F46E5' : '#64748B',
              borderBottom: paginaActual === 'inicio' ? '2.5px solid #4F46E5' : '2.5px solid transparent',
              paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <span>🏠</span> Inicio
          </button>

          <button 
            onClick={() => setPaginaActual('simulacros')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700',
              color: paginaActual === 'simulacros' ? '#4F46E5' : '#64748B',
              borderBottom: paginaActual === 'simulacros' ? '2.5px solid #4F46E5' : '2.5px solid transparent',
              paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <span>📝</span> Simulacros
          </button>

          <button 
            onClick={() => setPaginaActual('ranking')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700',
              color: paginaActual === 'ranking' ? '#4F46E5' : '#64748B',
              borderBottom: paginaActual === 'ranking' ? '2.5px solid #4F46E5' : '2.5px solid transparent',
              paddingBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <span>📊</span> Ranking
          </button>
        </nav>

        {/* PARTE DERECHA DINÁMICA */}
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginLeft: '32px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              👤 {user?.nombre || 'dilan'}
            </span>

            <button
              onClick={handleLogout}
              title="Cerrar sesión"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#FEF2F2',
                color: '#EF4444',
                border: '1px solid #FCA5A5',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              🚪 Cerrar sesión
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '32px' }}>
            <button
              onClick={() => setPaginaActual('login')}
              style={{
                backgroundColor: '#4F46E5',
                color: '#FFFFFF',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(79, 70, 229, 0.2)'
              }}
            >
              Iniciar Sesión
            </button>

            <button
              onClick={() => setPaginaActual('register')}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#4F46E5',
                border: '1.5px solid #4F46E5',
                padding: '7px 18px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Registrarse
            </button>

            <div 
              onClick={() => setPaginaActual('login')}
              style={{
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                padding: '6px 10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B',
                cursor: 'pointer'
              }}
            >
              👤
            </div>
          </div>
        )}

      </div>
    </header>
  );
}