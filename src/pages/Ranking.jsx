import React, { useEffect, useState } from 'react';

export default function Ranking() {
  const [puntajeUsuario, setPuntajeUsuario] = useState(0);
  const [nombreUsuario, setNombreUsuario] = useState('Estudiante');
  const [gradoUsuario, setGradoUsuario] = useState('Sin simulacro');

  // =========================================================
  // CARGAR DATOS
  // =========================================================
  const cargarDatos = () => {

    // -------------------------
    // NOMBRE DEL USUARIO
    // -------------------------
    let nombre = 'Estudiante';

    const datosRanking = localStorage.getItem('datos_ranking_usuario');

    if (datosRanking) {
      try {
        const datos = JSON.parse(datosRanking);

        if (datos.nombre) {
          nombre = datos.nombre;
        }
      } catch (error) {
        console.error('Error leyendo datos_ranking_usuario:', error);
      }
    }

    if (nombre === 'Estudiante') {
      const usuarioActivo = localStorage.getItem('usuario_activo');

      if (usuarioActivo) {
        try {
          const usuario = JSON.parse(usuarioActivo);

          if (usuario.nombre) {
            nombre = usuario.nombre;
          }
        } catch (error) {
          console.error('Error leyendo usuario_activo:', error);
        }
      }
    }

    setNombreUsuario(nombre);

    // =========================================================
    // SOLO MOSTRAR RESULTADO SI YA TERMINÓ UN SIMULACRO
    // =========================================================

    const simulacroFinalizado =
      localStorage.getItem('simulacro_finalizado') === 'true';

    if (!simulacroFinalizado) {
      // Todavía no ha terminado ningún simulacro
      setGradoUsuario('Sin simulacro');
      setPuntajeUsuario(0);
      return;
    }

    // -------------------------
    // GRADO DEL SIMULACRO
    // -------------------------
    let grado = localStorage.getItem('grado_simulacro');

    if (grado) {
      grado = grado.toString();

      if (!grado.includes('Grado')) {
        grado = `Grado ${grado}°`;
      }

      setGradoUsuario(grado);
    } else {
      setGradoUsuario('Sin simulacro');
    }

    // -------------------------
    // PUNTAJE
    // -------------------------
    const puntajeGuardado =
      localStorage.getItem('puntaje_usuario');

    if (puntajeGuardado !== null) {
      let puntaje = Number(puntajeGuardado);

      if (isNaN(puntaje) || puntaje < 0) {
        puntaje = 0;
      }

      if (puntaje > 500) {
        puntaje = 500;
      }

      setPuntajeUsuario(Math.round(puntaje));
    } else {
      setPuntajeUsuario(0);
    }
  };

  // =========================================================
  // CARGAR AL ABRIR
  // =========================================================
  useEffect(() => {
    cargarDatos();

    const intervalo = setInterval(() => {
      cargarDatos();
    }, 500);

    const actualizarRanking = () => {
      cargarDatos();
    };

    window.addEventListener('storage', actualizarRanking);

    return () => {
      clearInterval(intervalo);
      window.removeEventListener('storage', actualizarRanking);
    };
  }, []);

  // =========================================================
  // ESTUDIANTES DEL RANKING
  // =========================================================
  const estudiantesRanking = [
    {
      id: 1,
      nombre: nombreUsuario,
      grado: gradoUsuario,
      puntos: puntajeUsuario,
      usuario: true
    },

    {
      id: 2,
      nombre: 'Estudiante 2',
      grado: 'Grado 11°',
      puntos: 0,
      usuario: false
    },

    {
      id: 3,
      nombre: 'Estudiante 3',
      grado: 'Grado 10°',
      puntos: 0,
      usuario: false
    },

    {
      id: 4,
      nombre: 'Estudiante 4',
      grado: 'Grado 11°',
      puntos: 0,
      usuario: false
    },

    {
      id: 5,
      nombre: 'Estudiante 5',
      grado: 'Grado 9°',
      puntos: 0,
      usuario: false
    }
  ];

  // =========================================================
  // ORDENAR POR PUNTAJE
  // =========================================================
  const estudiantesOrdenados = [...estudiantesRanking].sort(
    (a, b) => b.puntos - a.puntos
  );

  // =========================================================
  // POSICIÓN DEL USUARIO
  // =========================================================
  const posicionUsuario =
    estudiantesOrdenados.findIndex(
      (estudiante) => estudiante.usuario
    ) + 1;

  // =========================================================
  // RENDER
  // =========================================================
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#0B132B',
        padding: '40px 20px',
        boxSizing: 'border-box',
        fontFamily: "'Segoe UI', Roboto, sans-serif"
      }}
    >

      <div
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          borderRadius: '22px',
          padding: '30px',
          boxSizing: 'border-box',
          boxShadow: '0 20px 50px rgba(0,0,0,0.35)'
        }}
      >

        {/* TITULO */}
        <div style={{ marginBottom: '25px' }}>

          <h1
            style={{
              margin: 0,
              fontSize: '32px',
              fontWeight: '900',
              color: '#111827',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            🏆 Ranking General
          </h1>

          <p
            style={{
              margin: '8px 0 0',
              color: '#64748B',
              fontSize: '14px'
            }}
          >
            Compara tu rendimiento con otros estudiantes.
          </p>

        </div>

        {/* TARJETA DEL USUARIO */}
        <div
          style={{
            background:
              'linear-gradient(135deg, #4F46E5, #3730A3)',
            borderRadius: '18px',
            padding: '25px',
            color: '#FFFFFF',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '25px',
            boxShadow: '0 12px 25px rgba(79,70,229,0.25)'
          }}
        >

          {/* POSICION */}
          <div>
            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                opacity: 0.85,
                marginBottom: '5px'
              }}
            >
              Tu posición
            </div>

            <div
              style={{
                fontSize: '30px',
                fontWeight: '900'
              }}
            >
              {posicionUsuario}°
            </div>
          </div>

          {/* NOMBRE */}
          <div style={{ flex: 1 }}>

            <div
              style={{
                fontSize: '20px',
                fontWeight: '900'
              }}
            >
              {nombreUsuario}
            </div>

            <div
              style={{
                fontSize: '13px',
                opacity: 0.85,
                marginTop: '3px'
              }}
            >
              {gradoUsuario}
            </div>

          </div>

          {/* PUNTAJE */}
          <div style={{ textAlign: 'right' }}>

            <div
              style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                opacity: 0.85
              }}
            >
              Puntaje
            </div>

            <div
              style={{
                fontSize: '30px',
                fontWeight: '900'
              }}
            >
              {puntajeUsuario}

              <span
                style={{
                  fontSize: '14px',
                  marginLeft: '5px'
                }}
              >
                pts
              </span>
            </div>

          </div>

        </div>

        {/* TABLA */}
        <div
          style={{
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >

          {/* ENCABEZADO */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '70px 1fr 120px',
              alignItems: 'center',
              padding: '16px',
              backgroundColor: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              color: '#64748B',
              fontSize: '11px',
              fontWeight: '800',
              textTransform: 'uppercase'
            }}
          >
            <span>Pos.</span>
            <span>Estudiante</span>
            <span style={{ textAlign: 'right' }}>
              Puntaje
            </span>
          </div>

          {/* FILAS */}
          {estudiantesOrdenados.map((estudiante, index) => {

            const esUsuario = estudiante.usuario;
            const esPrimero =
              index === 0 && estudiante.puntos > 0;

            return (
              <div
                key={estudiante.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr 120px',
                  alignItems: 'center',
                  padding: '20px 16px',
                  backgroundColor: esUsuario
                    ? '#EEF2FF'
                    : '#FFFFFF',
                  borderBottom:
                    index <
                    estudiantesOrdenados.length - 1
                      ? '1px solid #E2E8F0'
                      : 'none',
                  transition: 'all 0.3s ease'
                }}
              >

                {/* POSICION */}
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: '900',
                    color: esPrimero
                      ? '#7C3AED'
                      : '#64748B'
                  }}
                >
                  {esPrimero
                    ? '🏅'
                    : `${index + 1}°`}
                </div>

                {/* ESTUDIANTE */}
                <div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}
                  >

                    <span
                      style={{
                        fontSize: '15px',
                        fontWeight: '900',
                        color: '#111827'
                      }}
                    >
                      {estudiante.nombre}
                    </span>

                    {esUsuario && (
                      <span
                        style={{
                          backgroundColor: '#4F46E5',
                          color: '#FFFFFF',
                          padding: '4px 8px',
                          borderRadius: '20px',
                          fontSize: '10px',
                          fontWeight: '900'
                        }}
                      >
                        TÚ
                      </span>
                    )}

                  </div>

                  {/* SOLO EL USUARIO MUESTRA EL GRADO */}
                  {esUsuario && (
                    <div
                      style={{
                        marginTop: '5px',
                        fontSize: '12px',
                        color: '#64748B'
                      }}
                    >
                      {estudiante.grado}
                    </div>
                  )}

                </div>

                {/* PUNTAJE */}
                <div
                  style={{
                    textAlign: 'right',
                    fontSize: '16px',
                    fontWeight: '900',
                    color: esUsuario
                      ? '#4F46E5'
                      : '#111827'
                  }}
                >
                  {estudiante.puntos} pts
                </div>

              </div>
            );
          })}

        </div>

        {/* INFORMACION */}
        <div
          style={{
            marginTop: '20px',
            padding: '14px 16px',
            borderRadius: '12px',
            backgroundColor: '#F8FAFC',
            color: '#64748B',
            fontSize: '12px',
            textAlign: 'center'
          }}
        >
          Tu puntaje se actualiza automáticamente al finalizar un
          simulacro. El puntaje máximo es de <strong>500 puntos</strong>.
        </div>

      </div>
    </div>
  );
}