import React, { useEffect, useMemo, useState } from 'react';

export default function Prueba({ onVolverInicio }) {

  // =========================================================
  // CONFIGURACIÓN
  // =========================================================

  const [grado, setGrado] = useState('');
  const [materia, setMateria] = useState('');
  const [cantidadPreguntas, setCantidadPreguntas] = useState(0);
  const [cargando, setCargando] = useState(true);

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState({});

  // =========================================================
  // CANTIDAD EXACTA DE PREGUNTAS
  // =========================================================

  const cantidades = {
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

  // =========================================================
  // FUNCIÓN PARA MEZCLAR OPCIONES
  // =========================================================

  const mezclarOpciones = (correcta, incorrectas, semilla) => {

    const todas = [
      { texto: correcta, correcta: true },
      ...incorrectas.map((texto) => ({
        texto,
        correcta: false
      }))
    ];

    const resultado = [...todas];

    for (let i = resultado.length - 1; i > 0; i--) {
      const j = (semilla * (i + 3) + i * 7) % (i + 1);

      const temp = resultado[i];
      resultado[i] = resultado[j];
      resultado[j] = temp;
    }

    const indiceCorrecto = resultado.findIndex(
      (opcion) => opcion.correcta
    );

    return {
      opciones: resultado.map((opcion) => opcion.texto),
      correcta: indiceCorrecto
    };
  };

  // =========================================================
  // CREAR PREGUNTA
  // =========================================================

  const crearPregunta = (
    texto,
    pregunta,
    correcta,
    incorrectas,
    semilla
  ) => {

    const opciones = mezclarOpciones(
      correcta,
      incorrectas,
      semilla
    );

    return {
      texto,
      pregunta,
      opciones: opciones.opciones,
      correcta: opciones.correcta
    };
  };

  // =========================================================
  // MATEMÁTICAS
  // =========================================================

  const generarMatematicas = (gradoActual, cantidad) => {

    const banco = [];

    for (let i = 0; i < cantidad; i++) {

      const n = i + 1;
      let pregunta;

      if (gradoActual === '8') {

        const precio = 20000 + ((n * 7350) % 80000);
        const descuento = [10, 15, 20, 25][i % 4];
        const valorDescuento =
          Math.round((precio * descuento) / 100 / 100) * 100;
        const final = precio - valorDescuento;

        pregunta = crearPregunta(
          `Una tienda ofrece un producto con precio de $${precio.toLocaleString(
            'es-CO'
          )}. Durante una promoción se aplica un descuento del ${descuento}%.`,
          '¿Cuál es aproximadamente el precio del producto después del descuento?',
          `$${final.toLocaleString('es-CO')}`,
          [
            `$${(final + 5000).toLocaleString('es-CO')}`,
            `$${(final - 3000).toLocaleString('es-CO')}`,
            `$${(precio + valorDescuento).toLocaleString('es-CO')}`
          ],
          n
        );

      } else if (gradoActual === '9') {

        const a = 3 + (n % 8);
        const b = 2 + (n % 6);
        const x = 2 + (n % 5);
        const resultado = a * x + b;

        pregunta = crearPregunta(
          `Se define la función f(x) = ${a}x + ${b}.`,
          `¿Cuál es el valor de f(${x})?`,
          String(resultado),
          [
            String(resultado + 2),
            String(resultado - 2),
            String(resultado + 5)
          ],
          n
        );

      } else if (gradoActual === '10') {

        const base = 4 + (n % 7);
        const altura = 3 + ((n * 2) % 8);
        const area = (base * altura) / 2;

        pregunta = crearPregunta(
          `Un triángulo tiene una base de ${base} cm y una altura de ${altura} cm.`,
          '¿Cuál es el área del triángulo?',
          `${area} cm²`,
          [
            `${base * altura} cm²`,
            `${area + 5} cm²`,
            `${area + 10} cm²`
          ],
          n
        );

      } else {

        const a = 2 + (n % 5);
        const b = 4 + (n % 7);
        const discriminante = b * b - 4 * a * 1;

        pregunta = crearPregunta(
          `Una ecuación cuadrática tiene la forma ${a}x² + ${b}x + 1 = 0.`,
          '¿Qué expresión permite determinar la naturaleza de sus soluciones?',
          'El discriminante b² - 4ac',
          [
            'La suma de los coeficientes',
            'El producto de los exponentes',
            'La raíz cuadrada de a + b'
          ],
          n
        );
      }

      banco.push(pregunta);
    }

    return banco;
  };

  // =========================================================
  // LECTURA CRÍTICA / ESPAÑOL
  // =========================================================

  const generarLectura = (gradoActual, cantidad) => {

    const banco = [];

    const temas = [
      'la participación estudiantil',
      'el uso responsable de internet',
      'la importancia de la lectura',
      'el cuidado del medio ambiente',
      'la convivencia escolar',
      'la tecnología en la educación',
      'la comunicación entre personas',
      'el pensamiento crítico',
      'la responsabilidad ciudadana',
      'el trabajo en equipo'
    ];

    for (let i = 0; i < cantidad; i++) {

      const tema = temas[i % temas.length];

      let nivel;

      if (gradoActual === '8') {
        nivel = 'identificar la idea principal';
      } else if (gradoActual === '9') {
        nivel = 'establecer una conclusión';
      } else if (gradoActual === '10') {
        nivel = 'analizar la intención del autor';
      } else {
        nivel = 'evaluar el argumento presentado';
      }

      const textos = [
        `En una comunidad se decidió fortalecer ${tema}. La propuesta generó diferentes opiniones, pero sus participantes coincidieron en que escuchar distintas perspectivas podía ayudar a encontrar soluciones más adecuadas.`,
        `Un grupo de estudiantes analizó ${tema}. Algunos señalaron sus beneficios, mientras otros indicaron que también era necesario reconocer sus posibles dificultades antes de tomar una decisión.`,
        `El texto plantea que ${tema} requiere responsabilidad y capacidad para analizar diferentes puntos de vista. Por esta razón, no basta con aceptar una opinión sin revisar los argumentos que la sustentan.`
      ];

      const texto = textos[i % textos.length];

      const correctas = [
        `Analizar diferentes perspectivas antes de tomar decisiones.`,
        `Considerar los argumentos y la información disponible.`,
        `Reconocer que un problema puede tener diferentes puntos de vista.`,
        `Reflexionar sobre la información antes de formar una opinión.`
      ];

      const correcta = correctas[i % correctas.length];

      banco.push(
        crearPregunta(
          texto,
          `Según el texto, ¿qué permite ${nivel}?`,
          correcta,
          [
            'Aceptar automáticamente la primera opinión.',
            'Ignorar las opiniones diferentes.',
            'Evitar cualquier tipo de discusión.'
          ],
          i + 20
        )
      );
    }

    return banco;
  };

  // =========================================================
  // CIENCIAS NATURALES
  // =========================================================

  const generarNaturales = (gradoActual, cantidad) => {

    const banco = [];

    const temas = [
      {
        texto: 'Las plantas utilizan la energía proveniente del Sol para producir materia orgánica.',
        pregunta: '¿Qué proceso permite realizar esta función?',
        correcta: 'Fotosíntesis',
        malas: ['Digestión', 'Evaporación', 'Fermentación']
      },
      {
        texto: 'En un ecosistema, diferentes organismos dependen unos de otros para obtener energía y recursos.',
        pregunta: '¿Qué concepto representa mejor esta relación?',
        correcta: 'Interdependencia entre organismos',
        malas: ['Aislamiento absoluto', 'Ausencia de relaciones', 'Desaparición de energía']
      },
      {
        texto: 'Cuando aumenta la temperatura de una sustancia, sus partículas pueden moverse con mayor rapidez.',
        pregunta: '¿Qué concepto se relaciona con esta situación?',
        correcta: 'Energía cinética de las partículas',
        malas: ['Masa inexistente', 'Desaparición de materia', 'Cambio de color']
      },
      {
        texto: 'Algunas bacterias sobreviven a determinados antibióticos y pueden reproducirse.',
        pregunta: '¿Qué fenómeno puede explicar esta situación?',
        correcta: 'Selección natural',
        malas: ['Fotosíntesis', 'Evaporación', 'Condensación']
      },
      {
        texto: 'El ADN contiene información necesaria para el funcionamiento y desarrollo de los organismos.',
        pregunta: '¿Cuál es una función fundamental del ADN?',
        correcta: 'Almacenar información genética',
        malas: [
          'Producir directamente la luz solar',
          'Eliminar toda el agua de las células',
          'Impedir cualquier reproducción'
        ]
      },
      {
        texto: 'El agua puede pasar de estado líquido a gaseoso cuando recibe suficiente energía térmica.',
        pregunta: '¿Cómo se denomina este cambio de estado?',
        correcta: 'Evaporación',
        malas: ['Condensación', 'Solidificación', 'Fusión']
      },
      {
        texto: 'Los seres humanos necesitan oxígeno para realizar procesos celulares que permiten obtener energía.',
        pregunta: '¿Qué proceso está relacionado principalmente con esta función?',
        correcta: 'Respiración celular',
        malas: ['Fotosíntesis', 'Polinización', 'Sedimentación']
      },
      {
        texto: 'En una cadena alimentaria, la energía pasa de un organismo a otro mediante las relaciones de alimentación.',
        pregunta: '¿Qué organismo suele ocupar el primer nivel trófico?',
        correcta: 'Los productores',
        malas: ['Los consumidores secundarios', 'Los descomponedores únicamente', 'Los depredadores']
      }
    ];

    for (let i = 0; i < cantidad; i++) {

      const tema = temas[i % temas.length];

      banco.push(
        crearPregunta(
          tema.texto,
          tema.pregunta,
          tema.correcta,
          tema.malas,
          i + 40
        )
      );
    }

    return banco;
  };

  // =========================================================
  // SOCIALES Y CIUDADANAS
  // =========================================================

  const generarSociales = (gradoActual, cantidad) => {

    const banco = [];

    const temas = [
      {
        texto:
          'En una democracia existen diferentes grupos con opiniones e intereses distintos.',
        pregunta:
          '¿Qué mecanismo permite abordar estas diferencias de manera democrática?',
        correcta:
          'El diálogo y la deliberación',
        malas: [
          'La imposición de una sola opinión',
          'La eliminación de las minorías',
          'La prohibición del debate'
        ]
      },
      {
        texto:
          'Los ciudadanos pueden participar en decisiones relacionadas con asuntos públicos.',
        pregunta:
          '¿Qué principio se evidencia principalmente?',
        correcta:
          'Participación ciudadana',
        malas: [
          'Aislamiento político',
          'Ausencia de derechos',
          'Concentración absoluta del poder'
        ]
      },
      {
        texto:
          'Las instituciones públicas deben actuar de acuerdo con las normas establecidas.',
        pregunta:
          '¿Qué principio se relaciona con esta situación?',
        correcta:
          'Estado de derecho',
        malas: [
          'Gobierno sin normas',
          'Poder ilimitado',
          'Ausencia de instituciones'
        ]
      },
      {
        texto:
          'Una comunidad debe decidir si construye una obra que puede generar beneficios económicos pero también impactos ambientales.',
        pregunta:
          '¿Qué sería lo más adecuado antes de tomar una decisión?',
        correcta:
          'Analizar las diferentes consecuencias y escuchar a los afectados',
        malas: [
          'Ignorar los impactos',
          'Decidir sin información',
          'Escuchar solamente a una persona'
        ]
      },
      {
        texto:
          'Los derechos humanos buscan proteger la dignidad y las libertades fundamentales de las personas.',
        pregunta:
          '¿Cuál es una característica de estos derechos?',
        correcta:
          'Buscan proteger la dignidad humana',
        malas: [
          'Solo pertenecen a algunas personas',
          'Dependen únicamente del nivel económico',
          'Eliminan las libertades'
        ]
      },
      {
        texto:
          'En una sociedad democrática, los medios de comunicación pueden informar sobre asuntos de interés público.',
        pregunta:
          '¿Por qué es importante verificar la información?',
        correcta:
          'Para formar opiniones basadas en información confiable',
        malas: [
          'Para evitar cualquier debate',
          'Para aceptar todas las noticias',
          'Para impedir la participación'
        ]
      }
    ];

    for (let i = 0; i < cantidad; i++) {

      const tema = temas[i % temas.length];

      banco.push(
        crearPregunta(
          tema.texto,
          tema.pregunta,
          tema.correcta,
          tema.malas,
          i + 70
        )
      );
    }

    return banco;
  };

  // =========================================================
  // INGLÉS
  // =========================================================

  const generarIngles = (gradoActual, cantidad) => {

    const banco = [];

    const temas = [
      {
        texto:
          'Laura gets up at six o’clock every morning. She has breakfast with her family and then walks to school.',
        pregunta:
          'What does Laura do after breakfast?',
        correcta:
          'She walks to school.',
        malas: [
          'She goes to bed.',
          'She plays soccer.',
          'She watches television.'
        ]
      },
      {
        texto:
          'Tom likes playing basketball after school. On rainy days, however, he stays at home and reads books.',
        pregunta:
          'What does Tom do when it rains?',
        correcta:
          'He reads books at home.',
        malas: [
          'He plays basketball.',
          'He goes swimming.',
          'He goes to school.'
        ]
      },
      {
        texto:
          'Many students use the internet to search for information and complete school assignments. They should learn how to identify reliable sources.',
        pregunta:
          'What is the main idea?',
        correcta:
          'Students should evaluate information carefully.',
        malas: [
          'Students should never use the internet.',
          'Students only use the internet for games.',
          'School assignments cannot be completed online.'
        ]
      },
      {
        texto:
          'Maria is studying for an important exam. She usually studies in the afternoon because the house is quieter at that time.',
        pregunta:
          'When does Maria usually study?',
        correcta:
          'In the afternoon.',
        malas: [
          'At midnight.',
          'In the morning only.',
          'During breakfast.'
        ]
      },
      {
        texto:
          'David wanted to buy a new bicycle, but he did not have enough money. He decided to save part of his allowance every week.',
        pregunta:
          'Why did David decide to save money?',
        correcta:
          'Because he wanted to buy a bicycle.',
        malas: [
          'Because he wanted to travel.',
          'Because he lost his bicycle.',
          'Because he wanted to buy a computer.'
        ]
      },
      {
        texto:
          'Students should drink enough water during the day because hydration helps the body function properly.',
        pregunta:
          'According to the text, why is water important?',
        correcta:
          'It helps the body function properly.',
        malas: [
          'It replaces sleep.',
          'It makes students taller immediately.',
          'It eliminates the need for food.'
        ]
      },
      {
        texto:
          'The school organized a recycling campaign. Students collected paper, plastic and glass during the week.',
        pregunta:
          'What did the students collect?',
        correcta:
          'Paper, plastic and glass.',
        malas: [
          'Books and computers.',
          'Food and clothes.',
          'Only plastic bottles.'
        ]
      },
      {
        texto:
          'Sofia enjoys reading novels because they allow her to imagine different places and characters.',
        pregunta:
          'Why does Sofia enjoy reading novels?',
        correcta:
          'They allow her to imagine different places and characters.',
        malas: [
          'They are always very short.',
          'They contain only pictures.',
          'They help her avoid studying.'
        ]
      }
    ];

    for (let i = 0; i < cantidad; i++) {

      const tema = temas[i % temas.length];

      let preguntaExtra = tema.pregunta;

      if (gradoActual === '10') {
        preguntaExtra =
          tema.pregunta + ' Choose the option that best matches the text.';
      }

      if (gradoActual === '11') {
        preguntaExtra =
          tema.pregunta + ' Answer according to the information provided.';
      }

      banco.push(
        crearPregunta(
          tema.texto,
          preguntaExtra,
          tema.correcta,
          tema.malas,
          i + 100
        )
      );
    }

    return banco;
  };

  // =========================================================
  // GENERADOR GENERAL
  // =========================================================

  const generarBanco = (materiaActual, gradoActual, cantidad) => {

    if (materiaActual === 'matematicas') {
      return generarMatematicas(gradoActual, cantidad);
    }

    if (materiaActual === 'lectura') {
      return generarLectura(gradoActual, cantidad);
    }

    if (materiaActual === 'naturales') {
      return generarNaturales(gradoActual, cantidad);
    }

    if (materiaActual === 'sociales') {
      return generarSociales(gradoActual, cantidad);
    }

    if (materiaActual === 'ingles') {
      return generarIngles(gradoActual, cantidad);
    }

    return [];
  };

  // =========================================================
  // CARGAR CONFIGURACIÓN
  // =========================================================

  useEffect(() => {

    const gradoGuardado =
      localStorage.getItem('grado_simulacro');

    const materiaGuardada =
      localStorage.getItem('materia_simulacro');

    if (!gradoGuardado || !materiaGuardada) {

      alert('No hay un simulacro seleccionado.');

      if (onVolverInicio) {
        onVolverInicio();
      } else {
        window.location.href = '/';
      }

      return;
    }

    const cantidad =
      cantidades[gradoGuardado]?.[materiaGuardada] || 0;

    setGrado(gradoGuardado);
    setMateria(materiaGuardada);
    setCantidadPreguntas(cantidad);

    localStorage.setItem(
      'cantidad_preguntas',
      String(cantidad)
    );

    localStorage.setItem(
      'cantidad_preguntas_simulacro',
      String(cantidad)
    );

    setCargando(false);

  }, [onVolverInicio]);

  // =========================================================
  // CREAR LISTA COMPLETA
  // =========================================================

  const listaPreguntas = useMemo(() => {

    if (
      !grado ||
      !materia ||
      cantidadPreguntas <= 0
    ) {
      return [];
    }

    return generarBanco(
      materia,
      grado,
      cantidadPreguntas
    );

  }, [grado, materia, cantidadPreguntas]);

  // =========================================================
  // SELECCIONAR RESPUESTA
  // =========================================================

  const seleccionarRespuesta = (indice) => {

    setRespuestas((anteriores) => ({
      ...anteriores,
      [preguntaActual]: indice
    }));
  };

  // =========================================================
  // SIGUIENTE
  // =========================================================

  const siguiente = () => {

    if (
      respuestas[preguntaActual] === undefined
    ) {
      alert(
        'Debes responder esta pregunta antes de continuar.'
      );
      return;
    }

    if (
      preguntaActual <
      listaPreguntas.length - 1
    ) {

      setPreguntaActual(
        (actual) => actual + 1
      );

      window.scrollTo(0, 0);

    } else {

      finalizarPrueba();
    }
  };

  // =========================================================
  // FINALIZAR
  // =========================================================

  const finalizarPrueba = () => {

    const respondidas =
      Object.keys(respuestas).length;

    if (
      respondidas <
      listaPreguntas.length
    ) {

      alert(
        `Debes responder todas las preguntas antes de finalizar.

Respondidas: ${respondidas} de ${listaPreguntas.length}`
      );

      return;
    }

    let correctas = 0;

    listaPreguntas.forEach(
      (pregunta, indice) => {

        if (
          respuestas[indice] ===
          pregunta.correcta
        ) {
          correctas++;
        }

      }
    );

    const porcentaje =
      Math.round(
        (correctas /
          listaPreguntas.length) *
          100
      );

    // ==========================================
    // GUARDAR RESULTADO
    // ==========================================

    localStorage.setItem(
      'ultimo_resultado',
      String(porcentaje)
    );

    localStorage.setItem(
      'ultimo_aciertos',
      String(correctas)
    );

    localStorage.setItem(
      'ultimo_total',
      String(listaPreguntas.length)
    );

    localStorage.setItem(
      'ultimo_grado',
      grado
    );

    localStorage.setItem(
      'ultimo_materia',
      materia
    );

    const anteriores =
      Number(
        localStorage.getItem(
          'total_simulacros'
        )
      ) || 0;

    localStorage.setItem(
      'total_simulacros',
      String(anteriores + 1)
    );

    // ==========================================
    // MEJORA PROMEDIO
    // ==========================================

    localStorage.setItem(
      'mejora_promedio',
      String(porcentaje)
    );

    alert(
      `¡Simulacro terminado! 🎉

Aciertos: ${correctas} de ${listaPreguntas.length}

Resultado: ${porcentaje}%`
    );

    if (onVolverInicio) {
      onVolverInicio();
    } else {
      window.location.href = '/';
    }
  };

  // =========================================================
  // CARGANDO
  // =========================================================

  if (cargando) {

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#EFF2F8',
          fontFamily: 'Arial'
        }}
      >
        <h2>
          Preparando tu simulacro... 🚀
        </h2>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (
    !grado ||
    !materia ||
    cantidadPreguntas <= 0 ||
    listaPreguntas.length === 0
  ) {

    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          backgroundColor: '#EFF2F8',
          fontFamily: 'Arial',
          textAlign: 'center'
        }}
      >

        <h2>
          No se pudo cargar el simulacro
        </h2>

        <p>
          Grado: {grado || 'No seleccionado'}
          <br />
          Materia: {materia || 'No seleccionada'}
          <br />
          Preguntas: {cantidadPreguntas}
        </p>

        <button
          onClick={() => {

            if (onVolverInicio) {
              onVolverInicio();
            } else {
              window.location.href = '/';
            }

          }}
          style={{
            backgroundColor: '#4F46E5',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '700'
          }}
        >
          Volver al inicio
        </button>

      </div>
    );
  }

  // =========================================================
  // DATOS DE PANTALLA
  // =========================================================

  const pregunta =
    listaPreguntas[preguntaActual];

  const nombreMateria =
    materia === 'lectura'
      ? 'Lectura Crítica'
      : materia === 'matematicas'
      ? 'Matemáticas'
      : materia === 'naturales'
      ? 'Ciencias Naturales'
      : materia === 'sociales'
      ? 'Sociales y Ciudadanas'
      : 'Inglés';

  const progreso =
    Math.round(
      ((preguntaActual + 1) /
        listaPreguntas.length) *
        100
    );

  // =========================================================
  // INTERFAZ
  // =========================================================

  return (

    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#EFF2F8',
        padding: '20px',
        fontFamily:
          "'Segoe UI', Roboto, sans-serif",
        color: '#1E293B'
      }}
    >

      {/* ENCABEZADO */}

      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '20px',
          border:
            '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px'
        }}
      >

        <div>

          <h2
            style={{
              margin: 0,
              color: '#111827',
              fontSize: '20px',
              fontWeight: '900'
            }}
          >
            Simulacro {nombreMateria} {grado}°
          </h2>

          <p
            style={{
              margin:
                '6px 0 0',
              fontSize: '12px',
              color: '#64748B'
            }}
          >
            {cantidadPreguntas} preguntas
          </p>

        </div>

        <button
          onClick={() => {

            const confirmar =
              window.confirm(
                '¿Seguro que quieres salir del simulacro? Perderás el progreso actual.'
              );

            if (confirmar) {

              if (onVolverInicio) {
                onVolverInicio();
              } else {
                window.location.href = '/';
              }

            }

          }}
          style={{
            backgroundColor: '#FFFFFF',
            color: '#DC2626',
            border:
              '1px solid #FCA5A5',
            padding:
              '10px 16px',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Salir
        </button>

      </div>

      {/* CONTENIDO */}

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto'
        }}
      >

        {/* PROGRESO */}

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            border:
              '1px solid #E2E8F0'
          }}
        >

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              marginBottom: '10px'
            }}
          >

            <strong>
              Pregunta {preguntaActual + 1} de{' '}
              {listaPreguntas.length}
            </strong>

            <strong
              style={{
                color: '#4F46E5'
              }}
            >
              {progreso}%
            </strong>

          </div>

          <div
            style={{
              width: '100%',
              height: '8px',
              backgroundColor:
                '#E2E8F0',
              borderRadius: '20px',
              overflow: 'hidden'
            }}
          >

            <div
              style={{
                width: `${progreso}%`,
                height: '100%',
                backgroundColor:
                  '#4F46E5',
                transition:
                  'width 0.3s'
              }}
            />

          </div>

        </div>

        {/* PREGUNTA */}

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '18px',
            padding: '30px',
            border:
              '1px solid #E2E8F0',
            boxShadow:
              '0 4px 15px rgba(0,0,0,0.04)'
          }}
        >

          <div
            style={{
              display: 'inline-block',
              backgroundColor:
                '#EEF2FF',
              color: '#4338CA',
              padding:
                '7px 12px',
              borderRadius:
                '20px',
              fontSize: '11px',
              fontWeight: '800',
              marginBottom: '15px'
            }}
          >
            {nombreMateria} · {grado}°
          </div>

          <div
            style={{
              backgroundColor:
                '#F8FAFC',
              borderLeft:
                '4px solid #4F46E5',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '25px',
              lineHeight: '1.7',
              fontSize: '15px'
            }}
          >
            {pregunta.texto}
          </div>

          <h2
            style={{
              fontSize: '18px',
              marginBottom: '20px',
              color: '#111827'
            }}
          >
            {pregunta.pregunta}
          </h2>

          {/* OPCIONES */}

          <div
            style={{
              display: 'flex',
              flexDirection:
                'column',
              gap: '12px'
            }}
          >

            {pregunta.opciones.map(
              (opcion, indice) => {

                const seleccionada =
                  respuestas[
                    preguntaActual
                  ] === indice;

                return (

                  <button
                    key={indice}
                    onClick={() =>
                      seleccionarRespuesta(
                        indice
                      )
                    }
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '17px',
                      borderRadius: '12px',
                      border:
                        seleccionada
                          ? '2px solid #4F46E5'
                          : '1px solid #CBD5E1',
                      backgroundColor:
                        seleccionada
                          ? '#EEF2FF'
                          : '#FFFFFF',
                      color: '#1E293B',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight:
                        seleccionada
                          ? '700'
                          : '500',
                      transition:
                        'all 0.2s'
                    }}
                  >

                    <strong
                      style={{
                        display:
                          'inline-flex',
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                        width: '28px',
                        height: '28px',
                        borderRadius:
                          '50%',
                        marginRight:
                          '10px',
                        backgroundColor:
                          seleccionada
                            ? '#4F46E5'
                            : '#EEF2FF',
                        color:
                          seleccionada
                            ? '#FFFFFF'
                            : '#4F46E5'
                      }}
                    >
                      {String.fromCharCode(
                        65 + indice
                      )}
                    </strong>

                    {opcion}

                  </button>

                );
              }
            )}

          </div>

          {/* BOTÓN */}

          <div
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              marginTop: '30px',
              gap: '15px'
            }}
          >

            <span
              style={{
                fontSize: '11px',
                color: '#64748B'
              }}
            >
              {respuestas[
                preguntaActual
              ] !== undefined
                ? '✓ Respuesta seleccionada'
                : 'Selecciona una respuesta'}
            </span>

            <button
              onClick={siguiente}
              style={{
                backgroundColor:
                  '#4F46E5',
                color: '#FFFFFF',
                border: 'none',
                padding:
                  '13px 25px',
                borderRadius:
                  '9px',
                fontWeight: '800',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {preguntaActual ===
              listaPreguntas.length - 1
                ? 'Finalizar simulacro ✓'
                : 'Siguiente →'}
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}