import React, { useState } from 'react';

import Navbar from './components/Navbar';

import Inicio from './pages/Inicio';
import Simulacros from './pages/Simulacros';
import Ranking from './pages/Ranking';
import Prueba from './pages/Prueba';

import AuthModal from './components/AuthModal';


export default function App() {

  const [paginaActual, setPaginaActual] = useState('inicio');

  const [user, setUser] = useState(null);

  const [registeredUser, setRegisteredUser] = useState(null);

  const [isAuthModalOpen, setIsAuthModalOpen] =
    useState(false);

  const [authTab, setAuthTab] =
    useState('register');


  // =====================================
  // CAMBIAR DE PÁGINA
  // =====================================

  const handleSetPaginaActual = (pagina) => {

    if (pagina === 'login') {

      setAuthTab('login');
      setIsAuthModalOpen(true);

    } else if (pagina === 'register') {

      setAuthTab('register');
      setIsAuthModalOpen(true);

    } else {

      setPaginaActual(pagina);

    }

  };


  // =====================================
  // CUANDO EL LOGIN ES CORRECTO
  // =====================================

  const handleLoginSuccess = (usuario) => {

    setRegisteredUser(usuario);

    setUser(usuario);

  };


  // =====================================
  // IR A LA PRUEBA
  // =====================================

  const irAPrueba = () => {

    setPaginaActual('prueba');

  };


  // =====================================
  // VOLVER AL INICIO
  // =====================================

  const volverInicio = () => {

    setPaginaActual('inicio');

  };


  return (

    <div style={{
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      overflowX: 'hidden',
      margin: 0,
      padding: 0
    }}>

      {/* NAVBAR */}
      <div style={{ width: '100%' }}>
        <Navbar
          paginaActual={paginaActual}
          setPaginaActual={handleSetPaginaActual}
          user={user}
          setUser={setUser}
        />
      </div>


      {/* CONTENIDO */}

      <main style={{
        width: '100%',
        padding: '24px 32px',
        boxSizing: 'border-box'
      }}>

        {paginaActual === 'inicio' && (

          <Inicio
            onIrAPrueba={irAPrueba}
          />

        )}


        {paginaActual === 'simulacros' && (

          <Simulacros />

        )}


        {paginaActual === 'ranking' && (

          <Ranking />

        )}


        {paginaActual === 'prueba' && (

          <Prueba
            onVolverInicio={volverInicio}
          />

        )}

      </main>


      {/* LOGIN / REGISTRO */}

      <AuthModal

        isOpen={isAuthModalOpen}

        initialTab={authTab}

        registeredUser={registeredUser}

        onClose={() =>
          setIsAuthModalOpen(false)
        }

        onLoginSuccess={handleLoginSuccess}

      />

    </div>

  );

}