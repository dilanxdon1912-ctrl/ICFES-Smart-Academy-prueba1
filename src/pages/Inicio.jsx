import React, { useState, useEffect } from 'react';

export default function Inicio({ onIrAPrueba }) {
  // ================================
  // CONTADORES
  // ================================

  const [simulacrosRealizados, setSimulacrosRealizados] = useState(0);
  const [mejoraPromedio, setMejoraPromedio] = useState(0);

  // ================================
  // SELECCIÓN
  // ================================

  const [gradoSeleccionado, setGradoSeleccionado] = useState(null);
  const [materiaSeleccionada, setMateriaSeleccionada] = useState(null);

  // ================================
  // CANTIDAD DE PREGUNTAS
  // ================================

  const cantidadesPreguntas = {
    8: {
      ingles: 35,
      naturales: 25,
      sociales: 20,
      matematicas: 20,
      lectura: 30
    },
    9: {
      ingles: 40,
      naturales: 26,
      sociales: 22,
      matematicas: 22,
      lectura: 35
    },
    10: {
      ingles: 45,
      naturales: 28,
      sociales: 24,
      matematicas: 24,
      lectura: 40
    },
    11: {
      ingles: 50,
      naturales: 29,
      sociales: 25,
      matematicas: 25,
      lectura: 45
    }
  };

  // ================================
  // PROGRESO
  // ================================

  const [progresoUsuario] = useState({
    promedio: 0,
    materias: {
      matematicas: 0,
      lectura: 0,
      naturales: 0,
      sociales: 0,
      ingles: 0
    }
  });

  // ================================
  // CARGAR DATOS
  // ================================

  useEffect(() => {
    const simulacrosGuardados =
      Number(localStorage.getItem('total_simulacros')) || 0;

    const promedioGuardado =
      Number(localStorage.getItem('mejora_promedio')) || 0;

    const gradoGuardado =
      localStorage.getItem('grado_simulacro');

    const materiaGuardada =
      localStorage.getItem('materia_simulacro');

    setSimulacrosRealizados(simulacrosGuardados);
    setMejoraPromedio(promedioGuardado);

    if (gradoGuardado && cantidadesPreguntas[gradoGuardado]) {
      setGradoSeleccionado(gradoGuardado);
    }

    if (
      materiaGuardada &&
      gradoGuardado &&
      cantidadesPreguntas[gradoGuardado]?.[materiaGuardada]
    ) {
      setMateriaSeleccionada(materiaGuardada);
    }
  }, []);

  // ================================
  // SELECCIONAR GRADO
  // ================================

  const seleccionarGrado = (grado) => {
    setGradoSeleccionado(grado);
    setMateriaSeleccionada(null);

    localStorage.setItem(
      'grado_simulacro',
      grado
    );

    localStorage.removeItem('materia_simulacro');
    localStorage.removeItem('cantidad_preguntas');
    localStorage.removeItem('cantidad_preguntas_simulacro');
  };

  // ================================
  // SELECCIONAR MATERIA
  // ================================

  const seleccionarMateria = (materia) => {
    if (!gradoSeleccionado) {
      alert('Primero selecciona un grado.');
      return;
    }

    if (!cantidadesPreguntas[gradoSeleccionado]?.[materia]) {
      alert('Esta materia no está disponible para el grado seleccionado.');
      return;
    }

    setMateriaSeleccionada(materia);

    localStorage.setItem(
      'materia_simulacro',
      materia
    );
  };

  // ================================
  // OBTENER PREGUNTAS
  // ================================

  const obtenerPreguntas = (materia) => {
    if (!gradoSeleccionado) {
      return 0;
    }

    return (
      cantidadesPreguntas[gradoSeleccionado]?.[materia] || 0
    );
  };

  // ================================
  // NOMBRE DE LA MATERIA
  // ================================

  const obtenerNombreMateria = (materia) => {
    const nombres = {
      lectura: 'Español',
      matematicas: 'Matemáticas',
      naturales: 'Ciencias Naturales',
      sociales: 'Sociales y Ciudadanas',
      ingles: 'Inglés'
    };

    return nombres[materia] || '';
  };

  // ================================
  // INICIAR SIMULACRO
  // ================================

  const iniciarSimulacro = () => {
    if (!gradoSeleccionado) {
      alert('Primero selecciona un grado.');
      return;
    }

    if (!materiaSeleccionada) {
      alert('Primero selecciona una materia.');
      return;
    }

    const cantidad =
      cantidadesPreguntas[gradoSeleccionado]?.[materiaSeleccionada];

    if (!cantidad) {
      alert('No se encontró la cantidad de preguntas.');
      return;
    }

    localStorage.setItem(
      'grado_simulacro',
      gradoSeleccionado
    );

    localStorage.setItem(
      'materia_simulacro',
      materiaSeleccionada
    );

    localStorage.setItem(
      'cantidad_preguntas_simulacro',
      String(cantidad)
    );

    localStorage.setItem(
      'cantidad_preguntas',
      String(cantidad)
    );

    if (onIrAPrueba) {
      onIrAPrueba();
    } else {
      window.location.href = '/prueba';
    }
  };

  // ================================
  // DATOS DE GRADOS
  // ================================

  const grados = [
    {
      grado: '8',
      nombre: '8° Grado',
      desc: 'Fortalece tus bases',
      icon: '👨‍🎓'
    },
    {
      grado: '9',
      nombre: '9° Grado',
      desc: 'Sigue avanzando',
      icon: '👨‍🎓'
    },
    {
      grado: '10',
      nombre: '10° Grado',
      desc: 'Más cerca de tu meta',
      icon: '🧪'
    },
    {
      grado: '11',
      nombre: '11° Grado',
      desc: 'Prepárate para Saber 11',
      icon: '👨‍💻'
    }
  ];

  // ================================
  // MATERIAS
  // ================================

  const materias = [
    {
      id: 'lectura',
      nombre: 'Español',
      sub: 'Comprensión de textos, análisis y razonamiento verbal.',
      icon: '📖'
    },
    {
      id: 'matematicas',
      nombre: 'Matemáticas',
      sub: 'Resuelve problemas y aplica tus conocimientos matemáticos.',
      icon: '🧮'
    },
    {
      id: 'naturales',
      nombre: 'Ciencias Naturales',
      sub: 'Comprende la vida y el mundo que te rodea.',
      icon: '🧪'
    },
    {
      id: 'sociales',
      nombre: 'Sociales y Ciudadanas',
      sub: 'Analiza la sociedad y tu entorno.',
      icon: '👥'
    },
    {
      id: 'ingles',
      nombre: 'Inglés',
      sub: 'Evalúa tu comprensión de lectura y gramática.',
      icon: '🌐'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#EFF2F8',
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
        color: '#1E293B',
        overflowX: 'hidden'
      }}
    >
      <style>{`
        .main-container {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 24px;
        }
        .banner-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 20px;
          align-items: center;
        }
        .grados-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }
        .materias-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
        }
        .mas-simulacros-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        @media (max-width: 1024px) {
          .main-container {
            grid-template-columns: 1fr !important;
          }
          .materias-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }

        @media (max-width: 768px) {
          .banner-grid {
            grid-template-columns: 1fr !important;
          }
          .grados-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          .materias-grid {
            grid-template-columns: 1fr !important;
          }
          .mas-simulacros-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div
        className="main-container"
        style={{
          maxWidth: '1350px',
          margin: '0 auto',
          padding: '20px 15px'
        }}
      >
        {/* ================================
            COLUMNA IZQUIERDA
        ================================ */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            minWidth: 0
          }}
        >
          {/* BANNER */}

          <div
            className="banner-grid"
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '24px',
              padding: '24px',
              border: '1px solid #E2E8F0'
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 'clamp(28px, 5vw, 42px)',
                  fontWeight: '900',
                  color: '#1E1B4B',
                  lineHeight: '1.1',
                  margin: '0 0 16px 0'
                }}
              >
                Prepárate hoy,
                <br />
                <span style={{ color: '#4338CA' }}>
                  destaca mañana
                </span>
              </h1>

              <p
                style={{
                  fontSize: '13px',
                  color: '#64748B',
                  lineHeight: '1.6',
                  margin: '0 0 24px 0'
                }}
              >
                Simulacros tipo ICFES para estudiantes de grado
                8° a 11° que te preparan para alcanzar tu mejor
                resultado en las Pruebas Saber 11.
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  marginBottom: '32px',
                  flexWrap: 'wrap'
                }}
              >
                <button
                  onClick={iniciarSimulacro}
                  style={{
                    backgroundColor: '#4338CA',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '12px 22px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow:
                      '0 6px 15px rgba(67,56,202,0.25)'
                  }}
                >
                  Realizar Simulacro ➔
                </button>

                <button
                  onClick={() =>
                    alert(
                      'Todavía estamos creando tus resultados.'
                    )
                  }
                  style={{
                    backgroundColor: '#EEF2FF',
                    color: '#4338CA',
                    border: '1px solid #C7D2FE',
                    padding: '12px 22px',
                    borderRadius: '10px',
                    fontWeight: '700',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  Ver Mis Resultados
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  flexWrap: 'wrap'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>📝</span>
                    <strong>
                      {simulacrosRealizados.toLocaleString()}
                    </strong>
                  </div>

                  <span
                    style={{
                      fontSize: '10px',
                      color: '#64748B'
                    }}
                  >
                    Simulacros realizados
                  </span>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <span>🏆</span>
                    <strong>{mejoraPromedio}%</strong>
                  </div>

                  <span
                    style={{
                      fontSize: '10px',
                      color: '#64748B'
                    }}
                  >
                    Mejora promedio
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <div
                style={{
                  height: '220px',
                  background:
                    'linear-gradient(135deg, #4338CA, #312E81)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <span style={{ fontSize: '72px' }}>
                  👨‍🎓👩‍🎓
                </span>
              </div>

              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: '1px solid #E2E8F0',
                  textAlign: 'center',
                  marginTop: '12px'
                }}
              >
                <strong
                  style={{
                    fontSize: '12px',
                    color: '#312E81'
                  }}
                >
                  Tu esfuerzo, tu futuro 🚀
                </strong>
              </div>
            </div>
          </div>

          {/* GRADOS */}

          <div>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: '800',
                marginBottom: '12px'
              }}
            >
              Elige tu grado
            </h3>

            <div className="grados-grid">
              {grados.map((g) => {
                const seleccionado =
                  gradoSeleccionado === g.grado;

                return (
                  <div
                    key={g.grado}
                    onClick={() =>
                      seleccionarGrado(g.grado)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' ||
                        e.key === ' '
                      ) {
                        seleccionarGrado(g.grado);
                      }
                    }}
                    style={{
                      backgroundColor: seleccionado
                        ? '#4F46E5'
                        : '#FFFFFF',
                      color: seleccionado
                        ? '#FFFFFF'
                        : '#0F172A',
                      borderRadius: '14px',
                      padding: '16px 12px',
                      border: seleccionado
                        ? '2px solid #6366F1'
                        : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      boxShadow: seleccionado
                        ? '0 8px 20px rgba(79,70,229,0.35)'
                        : 'none'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '20px',
                        marginBottom: '8px'
                      }}
                    >
                      {g.icon}
                    </div>

                    <h4
                      style={{
                        margin: 0,
                        fontSize: '13px'
                      }}
                    >
                      {g.nombre}
                    </h4>

                    <p
                      style={{
                        margin: '4px 0 0',
                        fontSize: '10px',
                        color: seleccionado
                          ? '#E0E7FF'
                          : '#64748B'
                      }}
                    >
                      {g.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* MATERIAS */}

          <div>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: '800',
                marginBottom: '12px'
              }}
            >
              Áreas evaluadas
            </h3>

            <div className="materias-grid">
              {materias.map((m) => {
                const seleccionado =
                  materiaSeleccionada === m.id;

                const cantidad =
                  obtenerPreguntas(m.id);

                return (
                  <div
                    key={m.id}
                    onClick={() =>
                      seleccionarMateria(m.id)
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (
                        e.key === 'Enter' ||
                        e.key === ' '
                      ) {
                        seleccionarMateria(m.id);
                      }
                    }}
                    style={{
                      backgroundColor: seleccionado
                        ? '#4F46E5'
                        : '#FFFFFF',
                      color: seleccionado
                        ? '#FFFFFF'
                        : '#0F172A',
                      borderRadius: '14px',
                      padding: '14px',
                      border: seleccionado
                        ? '2px solid #6366F1'
                        : '1px solid #E2E8F0',
                      cursor: 'pointer',
                      boxShadow: seleccionado
                        ? '0 8px 20px rgba(79,70,229,0.35)'
                        : 'none'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '20px',
                        marginBottom: '8px'
                      }}
                    >
                      {m.icon}
                    </div>

                    <h4
                      style={{
                        margin: 0,
                        fontSize: '12px'
                      }}
                    >
                      {m.nombre}
                    </h4>

                    <p
                      style={{
                        margin: '6px 0 0',
                        fontSize: '10px',
                        color: seleccionado
                          ? '#E0E7FF'
                          : '#64748B',
                        lineHeight: '1.4'
                      }}
                    >
                      {m.sub}
                    </p>

                    <span
                      style={{
                        display: 'block',
                        marginTop: '12px',
                        fontSize: '10px',
                        fontWeight: '700',
                        color: seleccionado
                          ? '#C7D2FE'
                          : '#94A3B8'
                      }}
                    >
                      {gradoSeleccionado
                        ? `${cantidad} preguntas`
                        : 'Selecciona un grado'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RESUMEN */}

          {gradoSeleccionado &&
            materiaSeleccionada && (
              <div
                style={{
                  backgroundColor: '#EEF2FF',
                  border: '1px solid #C7D2FE',
                  borderRadius: '16px',
                  padding: '18px'
                }}
              >
                <h3
                  style={{
                    margin: '0 0 8px',
                    color: '#312E81',
                    fontSize: '15px'
                  }}
                >
                  Tu simulacro está listo 🎯
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: '#475569',
                    fontSize: '12px'
                  }}
                >
                  Grado:{' '}
                  <strong>
                    {gradoSeleccionado}°
                  </strong>

                  <br />

                  Materia:{' '}
                  <strong>
                    {obtenerNombreMateria(
                      materiaSeleccionada
                    )}
                  </strong>

                  <br />

                  Preguntas:{' '}
                  <strong>
                    {obtenerPreguntas(
                      materiaSeleccionada
                    )}
                  </strong>
                </p>

                <button
                  onClick={iniciarSimulacro}
                  style={{
                    marginTop: '15px',
                    backgroundColor: '#4F46E5',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '11px 20px',
                    borderRadius: '9px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}
                >
                  Comenzar prueba 🚀
                </button>
              </div>
            )}

          {/* MÁS QUE SIMULACROS */}

          <div>
            <h3
              style={{
                fontSize: '15px',
                fontWeight: '800',
                marginBottom: '12px'
              }}
            >
              Más que simulacros
            </h3>

            <div className="mas-simulacros-grid">
              {[
                {
                  titulo: 'Simulacros Tipo ICFES',
                  desc: 'Exámenes completos que siguen el formato real.'
                },
                {
                  titulo: 'Seguimiento de Progreso',
                  desc: 'Visualiza tu avance y fortalece tus áreas.'
                },
                {
                  titulo: 'Resultados Detallados',
                  desc: 'Conoce tus aciertos y áreas de mejora.'
                },
                {
                  titulo: 'Prepárate Mejor',
                  desc: 'Herramientas diseñadas para tu éxito.'
                }
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '14px',
                    padding: '16px',
                    border: '1px solid #E2E8F0'
                  }}
                >
                  <h4
                    style={{
                      margin: '0 0 6px',
                      fontSize: '12px'
                    }}
                  >
                    {card.titulo}
                  </h4>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '10px',
                      color: '#64748B',
                      lineHeight: '1.4'
                    }}
                  >
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ================================
            COLUMNA DERECHA
        ================================ */}

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            minWidth: 0
          }}
        >
          {/* PROGRESO */}

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #E2E8F0'
            }}
          >
            <h4
              style={{
                margin: '0 0 16px',
                fontSize: '13px'
              }}
            >
              Tu progreso general
            </h4>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  width: '90px',
                  height: '90px',
                  flexShrink: 0,
                  borderRadius: '50%',
                  background:
                    `conic-gradient(#2563EB 0% ${progresoUsuario.promedio}%, #E2E8F0 ${progresoUsuario.promedio}% 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <strong>
                    {progresoUsuario.promedio}%
                  </strong>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  fontSize: '10px'
                }}
              >
                <span>
                  🟢 Matemáticas{' '}
                  <strong>
                    {progresoUsuario.materias.matematicas}%
                  </strong>
                </span>

                <span>
                  🟣 Español{' '}
                  <strong>
                    {progresoUsuario.materias.lectura}%
                  </strong>
                </span>

                <span>
                  🟢 Naturales{' '}
                  <strong>
                    {progresoUsuario.materias.naturales}%
                  </strong>
                </span>

                <span>
                  🟠 Sociales{' '}
                  <strong>
                    {progresoUsuario.materias.sociales}%
                  </strong>
                </span>

                <span>
                  🔴 Inglés{' '}
                  <strong>
                    {progresoUsuario.materias.ingles}%
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* PRÓXIMO SIMULACRO */}

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #E2E8F0'
            }}
          >
            <h4
              style={{
                margin: '0 0 14px',
                fontSize: '13px'
              }}
            >
              Próximo simulacro
            </h4>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  backgroundColor: '#EEF2FF',
                  border: '1px solid #C7D2FE',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  textAlign: 'center'
                }}
              >
                <strong
                  style={{
                    fontSize: '16px',
                    color: '#4F46E5',
                    display: 'block'
                  }}
                >
                  19
                </strong>

                <span
                  style={{
                    fontSize: '8px',
                    color: '#4F46E5'
                  }}
                >
                  MAY
                </span>
              </div>

              <div>
                <h5
                  style={{
                    margin: 0,
                    fontSize: '12px'
                  }}
                >
                  Simulacro Saber 11
                </h5>

                <p
                  style={{
                    margin: '2px 0',
                    fontSize: '10px',
                    color: '#64748B'
                  }}
                >
                  Domingo, 19 de Mayo - 9:00 AM
                </p>
              </div>
            </div>
          </div>

          {/* ACTIVIDADES */}

          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid #E2E8F0'
            }}
          >
            <h4
              style={{
                margin: '0 0 12px',
                fontSize: '13px'
              }}
            >
              Últimas actividades
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '12px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E2E8F0'
                }}
              >
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#334155',
                    margin: '0 0 4px 0'
                  }}
                >
                  Estado de la Evaluación
                </h3>
                <p
                  style={{
                    margin: '2px 0',
                    fontSize: '11px',
                    color: '#64748B'
                  }}
                >
                  Evaluación diagnóstica completa
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ================================
          FOOTER
      ================================ */}

      <footer
        style={{
          backgroundColor: '#0F172A',
          color: '#FFFFFF',
          padding: '40px 20px 20px',
          marginTop: '40px',
          textAlign: 'center'
        }}
      >
        <strong>SMART ACADEMY</strong>

        <p
          style={{
            fontSize: '11px',
            color: '#94A3B8'
          }}
        >
          Prepárate hoy, transforma tu futuro.
        </p>

        <div
          style={{
            fontSize: '10px',
            color: '#64748B',
            marginTop: '20px'
          }}
        >
          © 2026 Smart Academy. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}