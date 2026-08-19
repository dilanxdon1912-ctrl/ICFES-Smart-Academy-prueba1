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
  // RESULTADOS
  // ================================

  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [gradoResultados, setGradoResultados] = useState('8');
  const [materiaResultados, setMateriaResultados] = useState(null);

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
  // FECHA ACTUAL
  // ================================

  const [fechaProximoSimulacro, setFechaProximoSimulacro] = useState(
    new Date()
  );

  useEffect(() => {
    const actualizarFecha = () => {
      setFechaProximoSimulacro(new Date());
    };

    actualizarFecha();

    const intervalo = setInterval(actualizarFecha, 60000);

    return () => clearInterval(intervalo);
  }, []);

  const diasSemana = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado'
  ];

  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];

  const diaProximoSimulacro =
    fechaProximoSimulacro.getDate();

  const mesProximoSimulacro =
    meses[fechaProximoSimulacro.getMonth()];

  const fechaTextoProximoSimulacro =
    `${diasSemana[fechaProximoSimulacro.getDay()]}, ${diaProximoSimulacro} de ${mesProximoSimulacro}`;

  // ================================
  // PROGRESO
  // ================================

  const [progresoUsuario, setProgresoUsuario] = useState({
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
    const cargarDatos = () => {
      const simulacrosGuardados =
        Number(localStorage.getItem('total_simulacros')) || 0;

      const promedioGuardado =
        Number(localStorage.getItem('mejora_promedio')) || 0;

      const gradoGuardado =
        localStorage.getItem('grado_simulacro');

      const materiaGuardada =
        localStorage.getItem('materia_simulacro');

      const progresoPorGradoGuardado =
        localStorage.getItem('progreso_por_grado');

      let progresoPorGrado = {};

      try {
        if (progresoPorGradoGuardado) {
          progresoPorGrado =
            JSON.parse(progresoPorGradoGuardado);
        }
      } catch (error) {
        console.error(
          'No se pudo cargar el progreso por grado:',
          error
        );
      }

      const gradoParaMostrar =
        gradoGuardado || gradoSeleccionado;

      const materias = {
        matematicas: 0,
        lectura: 0,
        naturales: 0,
        sociales: 0,
        ingles: 0,
        ...(progresoPorGrado[gradoParaMostrar] || {})
      };

      const resultadosDelGrado =
        Object.values(materias).filter(
          (valor) => Number(valor) > 0
        );

      const promedioDelGrado =
        resultadosDelGrado.length > 0
          ? Math.round(
              resultadosDelGrado.reduce(
                (total, valor) => total + Number(valor),
                0
              ) / resultadosDelGrado.length
            )
          : 0;

      setSimulacrosRealizados(simulacrosGuardados);
      setMejoraPromedio(promedioDelGrado);

      setProgresoUsuario({
        promedio: promedioDelGrado,
        materias
      });

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
    };

    cargarDatos();

    window.addEventListener(
      'progresoActualizado',
      cargarDatos
    );

    window.addEventListener(
      'storage',
      cargarDatos
    );

    return () => {
      window.removeEventListener(
        'progresoActualizado',
        cargarDatos
      );

      window.removeEventListener(
        'storage',
        cargarDatos
      );
    };
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
  // RESULTADOS DETALLADOS
  // ================================

  const nombresMaterias = {
    lectura: 'Español',
    matematicas: 'Matemáticas',
    naturales: 'Ciencias Naturales',
    sociales: 'Sociales y Ciudadanas',
    ingles: 'Inglés'
  };

  const obtenerResultadosGuardados = () => {
    try {
      return JSON.parse(
        localStorage.getItem('resultados_detallados') || '{}'
      );
    } catch {
      return {};
    }
  };

  const abrirResultados = () => {
    const guardados = obtenerResultadosGuardados();

    const gradosConResultados = ['8', '9', '10', '11'].filter(
      (g) =>
        guardados[g] &&
        Object.keys(guardados[g]).length > 0
    );

    const ultimoGrado = String(
      localStorage.getItem('ultimo_grado') || ''
    );

    const gradoInicial =
      gradosConResultados.includes(ultimoGrado)
        ? ultimoGrado
        : gradosConResultados[0] || '8';

    setGradoResultados(gradoInicial);

    const materiasDelGrado = guardados[gradoInicial]
      ? Object.keys(guardados[gradoInicial])
      : [];

    setMateriaResultados(materiasDelGrado[0] || null);
    setMostrarResultados(true);
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

  // =========================================================
  // PANTALLA DE RESULTADOS
  // =========================================================

  if (mostrarResultados) {
    const resultadosGuardados = obtenerResultadosGuardados();
    const resultadosDelGrado =
      resultadosGuardados[gradoResultados] || {};

    const materiasDisponibles =
      Object.keys(resultadosDelGrado);

    const resultadoSeleccionado = materiaResultados
      ? resultadosDelGrado[materiaResultados]
      : null;

    const errores =
      resultadoSeleccionado?.preguntas?.filter(
        (item) => !item.correcta
      ) || [];

    const promedioGrado =
      materiasDisponibles.length > 0
        ? Math.round(
            materiasDisponibles.reduce(
              (total, nombreMateria) =>
                total +
                Number(
                  resultadosDelGrado[nombreMateria]?.porcentaje || 0
                ),
              0
            ) / materiasDisponibles.length
          )
        : 0;

    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#EFF2F8',
          padding: '30px 20px',
          fontFamily: "'Segoe UI', Roboto, sans-serif",
          color: '#1E293B'
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '15px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <h1
                style={{
                  margin: 0,
                  color: '#1E1B4B',
                  fontSize: '28px',
                  fontWeight: '900'
                }}
              >
                Mis resultados
              </h1>

              <p
                style={{
                  margin: '6px 0 0',
                  color: '#64748B',
                  fontSize: '13px'
                }}
              >
                Revisa tus porcentajes, errores y temas para mejorar.
              </p>
            </div>

            <button
              onClick={() => setMostrarResultados(false)}
              style={{
                border: '1px solid #C7D2FE',
                backgroundColor: '#FFFFFF',
                color: '#4338CA',
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: '800',
                cursor: 'pointer'
              }}
            >
              ← Volver al inicio
            </button>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '18px',
              padding: '16px',
              marginBottom: '18px'
            }}
          >
            <strong
              style={{
                display: 'block',
                marginBottom: '10px'
              }}
            >
              Selecciona el grado
            </strong>

            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}
            >
              {['8', '9', '10', '11'].map((grado) => (
                <button
                  key={grado}
                  onClick={() => {
                    setGradoResultados(grado);

                    setMateriaResultados(
                      resultadosGuardados[grado]
                        ? Object.keys(
                            resultadosGuardados[grado]
                          )[0] || null
                        : null
                    );
                  }}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '10px',
                    border:
                      gradoResultados === grado
                        ? '2px solid #4F46E5'
                        : '1px solid #CBD5E1',
                    backgroundColor:
                      gradoResultados === grado
                        ? '#EEF2FF'
                        : '#FFFFFF',
                    color:
                      gradoResultados === grado
                        ? '#4338CA'
                        : '#475569',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  {grado}°
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '18px',
              padding: '20px',
              marginBottom: '18px'
            }}
          >
            <h2
              style={{
                margin: '0 0 6px',
                fontSize: '20px',
                color: '#111827'
              }}
            >
              Resultados de {gradoResultados}°
            </h2>

            <p
              style={{
                margin: 0,
                color: '#64748B',
                fontSize: '12px'
              }}
            >
              Promedio de las asignaturas realizadas:{' '}
              <strong>{promedioGrado}%</strong>
            </p>
          </div>

          {materiasDisponibles.length === 0 ? (
            <div
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '18px',
                padding: '30px',
                textAlign: 'center'
              }}
            >
              <h3 style={{ marginTop: 0 }}>
                Todavía no hay resultados para {gradoResultados}°
              </h3>

              <p
                style={{
                  color: '#64748B',
                  fontSize: '13px'
                }}
              >
                Cuando realices un simulacro de este grado, aquí aparecerá
                su porcentaje y la corrección de cada pregunta.
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '12px',
                  marginBottom: '18px'
                }}
              >
                {materiasDisponibles.map((materia) => {
                  const resultado =
                    resultadosDelGrado[materia];

                  return (
                    <button
                      key={materia}
                      onClick={() =>
                        setMateriaResultados(materia)
                      }
                      style={{
                        textAlign: 'left',
                        backgroundColor:
                          materiaResultados === materia
                            ? '#EEF2FF'
                            : '#FFFFFF',
                        border:
                          materiaResultados === materia
                            ? '2px solid #4F46E5'
                            : '1px solid #E2E8F0',
                        borderRadius: '16px',
                        padding: '16px',
                        cursor: 'pointer'
                      }}
                    >
                      <div
                        style={{
                          color: '#475569',
                          fontSize: '12px',
                          fontWeight: '800'
                        }}
                      >
                        {nombresMaterias[materia] || materia}
                      </div>

                      <div
                        style={{
                          fontSize: '28px',
                          fontWeight: '900',
                          color: '#4338CA',
                          marginTop: '5px'
                        }}
                      >
                        {resultado?.porcentaje || 0}%
                      </div>

                      <div
                        style={{
                          color: '#64748B',
                          fontSize: '11px'
                        }}
                      >
                        {resultado?.correctas || 0} de{' '}
                        {resultado?.total || 0} correctas
                      </div>
                    </button>
                  );
                })}
              </div>

              {resultadoSeleccionado && (
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    borderRadius: '18px',
                    padding: '22px'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: '15px',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      marginBottom: '18px'
                    }}
                  >
                    <div>
                      <h2
                        style={{
                          margin: 0,
                          fontSize: '20px'
                        }}
                      >
                        {nombresMaterias[materiaResultados] ||
                          materiaResultados}{' '}
                        · {gradoResultados}°
                      </h2>

                      <p
                        style={{
                          margin: '5px 0 0',
                          color: '#64748B',
                          fontSize: '12px'
                        }}
                      >
                        Resultado:{' '}
                        <strong>
                          {resultadoSeleccionado.porcentaje}%
                        </strong>
                        {' · '}
                        {resultadoSeleccionado.correctas} de{' '}
                        {resultadoSeleccionado.total} correctas
                      </p>
                    </div>
                  </div>

                  <h3
                    style={{
                      fontSize: '16px',
                      margin: '0 0 12px'
                    }}
                  >
                    Preguntas que debes corregir ({errores.length})
                  </h3>

                  {errores.length === 0 ? (
                    <div
                      style={{
                        padding: '18px',
                        borderRadius: '12px',
                        backgroundColor: '#ECFDF5',
                        color: '#047857',
                        fontWeight: '700'
                      }}
                    >
                      🎉 No tuviste errores en este simulacro.
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px'
                      }}
                    >
                      {errores.map((item) => (
                        <div
                          key={item.numero}
                          style={{
                            border: '1px solid #F1F5F9',
                            borderRadius: '14px',
                            padding: '17px',
                            backgroundColor: '#FAFAFA'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '10px',
                              marginBottom: '8px',
                              flexWrap: 'wrap'
                            }}
                          >
                            <strong>
                              Pregunta {item.numero}
                            </strong>

                            <span
                              style={{
                                fontSize: '11px',
                                fontWeight: '800',
                                color: '#B45309'
                              }}
                            >
                              {item.tema}
                            </span>
                          </div>

                          <p
                            style={{
                              margin: '0 0 12px',
                              lineHeight: '1.6',
                              fontSize: '13px'
                            }}
                          >
                            {item.texto}
                          </p>

                          <p
                            style={{
                              margin: '0 0 10px',
                              fontWeight: '700',
                              fontSize: '13px'
                            }}
                          >
                            {item.pregunta}
                          </p>

                          <div
                            style={{
                              display: 'grid',
                              gap: '7px'
                            }}
                          >
                            <div
                              style={{
                                padding: '10px',
                                borderRadius: '9px',
                                backgroundColor: '#FEF2F2',
                                color: '#991B1B',
                                fontSize: '12px'
                              }}
                            >
                              ❌ Tu respuesta:{' '}
                              <strong>
                                {item.respuestaSeleccionadaTexto ||
                                  'Sin respuesta'}
                              </strong>
                            </div>

                            <div
                              style={{
                                padding: '10px',
                                borderRadius: '9px',
                                backgroundColor: '#ECFDF5',
                                color: '#047857',
                                fontSize: '12px'
                              }}
                            >
                              ✅ Respuesta correcta:{' '}
                              <strong>
                                {item.respuestaCorrectaTexto}
                              </strong>
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: '10px',
                              padding: '10px',
                              borderRadius: '9px',
                              backgroundColor: '#EEF2FF',
                              color: '#3730A3',
                              fontSize: '12px',
                              lineHeight: '1.5'
                            }}
                          >
                            <strong>Para mejorar:</strong>{' '}
                            repasa el tema{' '}
                            <strong>{item.tema}</strong> y vuelve a
                            intentar preguntas de este tipo.
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

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
                  onClick={abrirResultados}
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
              {localStorage.getItem('ultimo_grado')
                ? ` - ${localStorage.getItem('ultimo_grado')}° grado`
                : ''}
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

          {/* FECHA DE INICIO */}

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
              Fecha de inicio
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
                  {diaProximoSimulacro}
                </strong>

                <span
                  style={{
                    fontSize: '8px',
                    color: '#4F46E5'
                  }}
                >
                  {mesProximoSimulacro
                    .slice(0, 3)
                    .toUpperCase()}
                </span>
              </div>

              <div>
                <p
                  style={{
                    margin: 0,
                    fontSize: '10px',
                    color: '#64748B'
                  }}
                >
                  {fechaTextoProximoSimulacro}
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

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  padding: '16px',
                  borderRadius: '12px',
                  boxShadow:
                    '0 1px 3px rgba(0, 0, 0, 0.1)',
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
                  Último simulacro
                </h3>

                <p
                  style={{
                    margin: '2px 0',
                    fontSize: '11px',
                    color: '#64748B'
                  }}
                >
                  {localStorage.getItem('ultimo_grado')
                    ? `${localStorage.getItem('ultimo_grado')}° Grado · ${
                        localStorage.getItem(
                          'ultimo_materia'
                        ) === 'lectura'
                          ? 'Español'
                          : localStorage.getItem(
                              'ultimo_materia'
                            ) === 'matematicas'
                          ? 'Matemáticas'
                          : localStorage.getItem(
                              'ultimo_materia'
                            ) === 'naturales'
                          ? 'Naturales'
                          : localStorage.getItem(
                              'ultimo_materia'
                            ) === 'sociales'
                          ? 'Sociales'
                          : localStorage.getItem(
                              'ultimo_materia'
                            ) === 'ingles'
                          ? 'Inglés'
                          : 'Simulacro'
                      }`
                    : 'Todavía no has realizado un simulacro.'}

                  <br />

                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '5px',
                      fontWeight: '700'
                    }}
                  >
                    Resultado:{' '}
                    {localStorage.getItem(
                      'ultimo_resultado'
                    )
                      ? `${localStorage.getItem(
                          'ultimo_resultado'
                        )}%`
                      : '0%'}
                  </span>
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