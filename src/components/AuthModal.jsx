import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, initialTab = 'register', registeredUser }) {
  const [isRegistering, setIsRegistering] = useState(initialTab === 'register');

  useEffect(() => {
    setIsRegistering(initialTab === 'register');
  }, [initialTab, isOpen]);

  // Campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [codigoIngresado, setCodigoIngresado] = useState('');

  // Estados de verificación
  const [codigoGenerado, setCodigoGenerado] = useState(null);
  const [cargandoEnvio, setCargandoEnvio] = useState(false);
  const [codigoEnviado, setCodigoEnviado] = useState(false);

  if (!isOpen) return null;

  // FUNCIÓN PARA ENVIAR EL CÓDIGO AL CORREO
  const handleEnviarCodigoEmail = async () => {
    if (!email) {
      alert('Por favor ingresa tu correo electrónico primero.');
      return;
    }

    const nuevoCodigo = Math.floor(100000 + Math.random() * 900000).toString();
    setCodigoGenerado(nuevoCodigo);
    setCargandoEnvio(true);

    const templateParams = {
      to_name: nombre || 'Estudiante',
      to_email: email,
      code: nuevoCodigo,
    };

    try {
      await emailjs.send(
        'service_dh39j4z',          // Service ID
        'template_hw6bi0i',         // Template ID
        templateParams,
        '-cvWiSrz6FHCKjhmi'         // Public Key
      );

      setCodigoEnviado(true);
      alert(`¡Código de verificación enviado a ${email}!`);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      alert(`Error al enviar el correo: ${error?.text || error?.message || 'Revisa tu conexión.'}`);
    } finally {
      setCargandoEnvio(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (!codigoEnviado) {
        alert('Debes solicitar el código de verificación por correo.');
        return;
      }
      if (codigoIngresado !== codigoGenerado) {
        alert('El código de verificación ingresado no es correcto.');
        return;
      }

      const nuevoUsuario = {
        nombre: nombre.trim() || 'Usuario',
        email: email.trim()
      };

      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(nuevoUsuario);
      }
      onClose();
    } else {
      // VALIDACIÓN OBLIGATORIA PARA INICIAR SESIÓN
      if (!registeredUser || !registeredUser.email) {
        alert('No existe ninguna cuenta registrada. Debes registrarte primero.');
        setIsRegistering(true); // Redirige a pestaña de registro
        return;
      }

      if (email.trim().toLowerCase() !== registeredUser.email.trim().toLowerCase()) {
        alert('Este correo no está registrado. Por favor regístrate primero.');
        setIsRegistering(true);
        return;
      }

      // Si coincide el registro:
      if (typeof onLoginSuccess === 'function') {
        onLoginSuccess(registeredUser);
      }
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(15, 23, 42, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'center',       // Centrado vertical
      justifyContent: 'center',   // Centrado horizontal
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '20px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        position: 'relative'
      }}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748B' }}
        >
          ✕
        </button>

        {/* PESTAÑAS LOGIN / REGISTRO */}
        <div style={{ display: 'flex', borderBottom: '2px solid #E2E8F0', marginBottom: '20px' }}>
          <button
            type="button"
            onClick={() => setIsRegistering(false)}
            style={{
              flex: 1, padding: '10px 0', background: 'none', border: 'none',
              borderBottom: !isRegistering ? '3px solid #4F46E5' : 'none',
              fontWeight: !isRegistering ? '800' : '600',
              color: !isRegistering ? '#4F46E5' : '#64748B', cursor: 'pointer'
            }}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering(true)}
            style={{
              flex: 1, padding: '10px 0', background: 'none', border: 'none',
              borderBottom: isRegistering ? '3px solid #4F46E5' : 'none',
              fontWeight: isRegistering ? '800' : '600',
              color: isRegistering ? '#4F46E5' : '#64748B', cursor: 'pointer'
            }}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          {/* NOMBRE COMPLETO (SOLO REGISTRO) */}
          {isRegistering && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                Nombre completo
              </label>
              <input 
                type="text" 
                required={isRegistering}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Juan Pérez" 
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
          )}

          {/* CORREO ELECTRÓNICO */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>
                Correo Electrónico
              </label>
              
              {isRegistering && (
                <button
                  type="button"
                  onClick={handleEnviarCodigoEmail}
                  disabled={cargandoEnvio}
                  style={{
                    backgroundColor: codigoEnviado ? '#22C55E' : '#4F46E5',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {cargandoEnvio ? 'Enviando...' : codigoEnviado ? '✓ Reenviar' : 'Enviar Código'}
                </button>
              )}
            </div>

            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="estudiante@smart.edu.co" 
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          {/* CÓDIGO DE VERIFICACIÓN (SOLO REGISTRO) */}
          {isRegistering && (
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
                Código de Verificación (Correo electrónico)
              </label>
              <input 
                type="text" 
                maxLength="6"
                required={isRegistering}
                value={codigoIngresado}
                onChange={(e) => setCodigoIngresado(e.target.value)}
                placeholder="Ej. 123456" 
                style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', boxSizing: 'border-box', letterSpacing: '2px', fontWeight: '700' }}
              />
            </div>
          )}

          {/* CONTRASEÑA CON OJITO */}
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>
              Contraseña
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={mostrarPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ 
                  width: '100%', 
                  padding: '10px 40px 10px 12px', 
                  borderRadius: '10px', 
                  border: '1px solid #CBD5E1', 
                  fontSize: '13px', 
                  boxSizing: 'border-box' 
                }}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#64748B',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {mostrarPassword ? '👁️‍🗨️' : '👁️'}
              </button>
            </div>
          </div>

          {/* BOTÓN SUBMIT */}
          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#4F46E5', color: '#ffffff', border: 'none', 
              padding: '12px', borderRadius: '10px', fontWeight: '700', 
              fontSize: '14px', cursor: 'pointer', marginTop: '8px',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)' 
            }}
          >
            {isRegistering ? 'Crear Cuenta y Entrar' : 'Ingresar a mi Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}