Simulacros.jsx

import React, { useState, useEffect, useMemo } from 'react';

/* ============================================================
   BANCO DE PREGUNTAS
   Preguntas originales para el simulador.
   Se generan según el grado seleccionado.
   Áreas:
   - Lectura Crítica
   - Matemáticas
   - Sociales y Ciudadanas
   - Ciencias Naturales
   - Inglés
   ============================================================ */

const generarPreguntas = (grado) => {

  const nivel = Number(grado);

  /* ------------------------------------------------------------
     LECTURA CRÍTICA
     ------------------------------------------------------------ */

  const lecturasBase = [
    {
      texto: 'En una institución educativa, un grupo de estudiantes propone transformar un espacio abandonado en una biblioteca comunitaria. Unos quieren utilizarlo exclusivamente para estudiar, mientras otros consideran que también debería servir para encuentros culturales. Antes de decidir, realizan una reunión, escuchan las propuestas y buscan una alternativa que permita combinar varias de ellas. La decisión final no coincide exactamente con la propuesta de ningún estudiante, pero la mayoría considera que el acuerdo representa mejor las necesidades del grupo.',
      pregunta: '¿Qué aspecto del texto permite identificar que la decisión se tomó mediante un proceso participativo?',
      opciones: ['Se escucharon diferentes propuestas antes de establecer un acuerdo.', 'Se impuso la propuesta del estudiante con mayor autoridad.', 'Se descartaron las opiniones que no coincidían con la mayoría.', 'Se tomó la primera propuesta sin discutir alternativas.'],
      correcta: 'A'
    },
    {
      texto: 'Una estudiante observa que en su colegio se desperdicia agua. En lugar de concluir inmediatamente que la causa es la falta de cuidado, observa distintos momentos del día, conversa con estudiantes y revisa el estado de algunas instalaciones. Encuentra que existen varias causas: algunas llaves presentan fallas, ciertos estudiantes desconocen el problema y en determinados momentos hay poca supervisión. Con esa información propone una estrategia que combina reparación, información y seguimiento.',
      pregunta: '¿Por qué el procedimiento de la estudiante permite construir una explicación más sólida del problema?',
      opciones: ['Porque considera información obtenida de diferentes fuentes antes de proponer una solución.', 'Porque confirma desde el comienzo una única causa del problema.', 'Porque evita consultar a las personas involucradas en la situación.', 'Porque decide que la solución debe aplicarse antes de recoger información.'],
      correcta: 'A'
    },
    {
      texto: 'Una ciudad anuncia la construcción de una ciclovía para conectar varios barrios. El proyecto recibe apoyo porque podría facilitar algunos desplazamientos y reducir el uso de automóviles. Sin embargo, comerciantes y residentes manifiestan preocupaciones sobre cambios en el estacionamiento y la circulación. La administración decide revisar el diseño y estudiar alternativas antes de iniciar las obras, teniendo en cuenta tanto los beneficios esperados como las dificultades señaladas.',
      pregunta: '¿Cuál interpretación explica mejor el conflicto presentado?',
      opciones: ['Una decisión pública puede producir beneficios esperados y, al mismo tiempo, generar preocupaciones en distintos grupos.', 'La existencia de opiniones diferentes demuestra que ningún proyecto público puede realizarse.', 'Las preocupaciones de los residentes hacen innecesario analizar los posibles beneficios.', 'Los proyectos de movilidad solamente deben evaluarse desde el punto de vista de los comerciantes.'],
      correcta: 'A'
    },
    {
      texto: 'Un artículo sobre información digital advierte que leer muchas publicaciones no significa necesariamente estar bien informado. Según el autor, algunas páginas presentan datos sin explicar su origen, utilizan titulares que buscan provocar una reacción inmediata o mezclan opiniones con afirmaciones que parecen hechos. Por ello, recomienda comparar fuentes, revisar la evidencia disponible y preguntarse quién produce la información y con qué propósito.',
      pregunta: '¿Qué criterio de lectura crítica propone principalmente el autor?',
      opciones: ['Evaluar el origen, la evidencia y la intención de la información antes de aceptarla.', 'Preferir siempre la publicación que tenga el titular más llamativo.', 'Considerar verdadera cualquier información que aparezca en varias redes sociales.', 'Evitar todas las fuentes digitales sin importar el contenido que presenten.'],
      correcta: 'A'
    },
    {
      texto: 'En una discusión escolar sobre el uso de celulares en clase, un estudiante afirma que deberían prohibirse porque distraen. Otra estudiante señala que también pueden utilizarse para consultar información y desarrollar actividades. Un tercero propone establecer momentos y condiciones concretas para su utilización. La discusión termina con la construcción de unas reglas que permiten el uso pedagógico del dispositivo, pero limitan su utilización cuando interfiere con las actividades académicas.',
      pregunta: '¿Qué función cumple la propuesta final dentro del desarrollo del texto?',
      opciones: ['Presenta una alternativa que intenta responder a los argumentos de las diferentes posiciones.', 'Demuestra que la primera opinión era completamente correcta.', 'Elimina la posibilidad de utilizar tecnología durante las clases.', 'Indica que ninguna de las opiniones anteriores tenía relación con el problema.'],
      correcta: 'A'
    },
    {
      texto: 'Una comunidad cercana a un río inicia una campaña para reducir los residuos que llegan al agua. Al comienzo se instalan nuevos recipientes para separar materiales. Después de varias semanas, los organizadores descubren que algunos sectores continúan acumulando residuos porque no cuentan con rutas frecuentes de recolección y porque parte de la población no conoce las normas de separación. La estrategia se modifica para incluir educación ambiental y ajustes en las rutas de recolección.',
      pregunta: '¿Qué conclusión está mejor respaldada por el caso?',
      opciones: ['La solución de un problema ambiental puede requerir analizar varias causas y combinar diferentes acciones.', 'La instalación de recipientes nunca puede contribuir a solucionar un problema ambiental.', 'La educación ambiental por sí sola garantiza que desaparezca toda la contaminación.', 'Las decisiones ambientales deben depender exclusivamente de las autoridades.'],
      correcta: 'A'
    },
    {
      texto: 'Dos noticias describen una misma decisión económica. Ambas presentan los datos básicos del acontecimiento, pero una destaca los beneficios que podría recibir determinado sector y la otra concentra su atención en los riesgos para otros grupos. Un lector afirma que una de las noticias necesariamente miente porque no utiliza exactamente las mismas palabras que la otra. Sin embargo, al compararlas con mayor cuidado, se observa que ambas seleccionan información y organizan el relato desde perspectivas diferentes.',
      pregunta: '¿Qué permite explicar mejor la diferencia entre las dos noticias?',
      opciones: ['El enfoque de cada medio influye en la selección y organización de los hechos que presenta.', 'Dos medios nunca pueden informar correctamente sobre un mismo acontecimiento.', 'La noticia que utiliza más datos siempre representa la única perspectiva válida.', 'Las diferencias de lenguaje demuestran por sí solas que una noticia es falsa.'],
      correcta: 'A'
    },
    {
      texto: 'Una institución educativa realiza una encuesta para comprender por qué algunos estudiantes participan poco en actividades culturales. Los resultados muestran que algunos no sienten interés por las actividades disponibles, mientras otros tienen horarios que coinciden con responsabilidades familiares o escolares. También aparece un grupo que afirma no conocer suficientemente la oferta de actividades. La institución decide modificar los horarios, ampliar las opciones y mejorar la difusión antes de volver a medir la participación.',
      pregunta: '¿Por qué sería incorrecto afirmar que todos los estudiantes no participan por falta de interés?',
      opciones: ['Porque la información recogida muestra que existen varias razones relacionadas con la baja participación.', 'Porque las encuestas no permiten conocer ninguna característica de una comunidad.', 'Porque los estudiantes que participan siempre tienen las mismas motivaciones.', 'Porque modificar los horarios demuestra que el interés nunca influye en la participación.'],
      correcta: 'A'
    },
    {
      texto: 'Un debate sobre inteligencia artificial reúne tres posiciones. Una persona destaca que estas herramientas pueden facilitar tareas y ampliar el acceso a determinados recursos. Otra advierte que sus resultados pueden contener errores o reproducir sesgos presentes en los datos con los que fueron desarrolladas. Una tercera sostiene que el problema no consiste simplemente en aceptar o rechazar la tecnología, sino en establecer criterios para evaluar sus resultados y determinar cuándo es apropiado utilizarla.',
      pregunta: '¿Cuál posición integra de manera más completa los argumentos del debate?',
      opciones: ['Aprovechar las posibilidades de la tecnología mientras se evalúan críticamente sus resultados y limitaciones.', 'Aceptar cualquier resultado tecnológico porque una herramienta digital siempre es objetiva.', 'Rechazar toda herramienta de inteligencia artificial porque cualquier error la vuelve inútil.', 'Utilizar estas herramientas sin establecer criterios porque la tecnología reemplaza el juicio humano.'],
      correcta: 'A'
    },
    {
      texto: 'Un investigador estudia el efecto de ampliar una avenida sobre el tráfico de una ciudad. Durante los primeros meses, el tiempo promedio de desplazamiento disminuye. Un año después, algunos horarios vuelven a presentar congestión. Un funcionario concluye que la obra fracasó. El equipo investigador considera que esa conclusión es prematura y propone analizar el crecimiento del número de vehículos, las modificaciones en las rutas de transporte y las nuevas actividades económicas de la zona.',
      pregunta: '¿Por qué la interpretación del equipo investigador es más rigurosa?',
      opciones: ['Porque considera que un resultado puede estar relacionado con múltiples factores y no con una sola causa.', 'Porque descarta los datos que muestran que el tráfico volvió a aumentar.', 'Porque supone que toda obra de infraestructura produce exactamente el mismo resultado.', 'Porque considera que las observaciones realizadas durante los primeros meses no tienen valor.'],
      correcta: 'A'
    },
    {
      texto: 'Un texto argumentativo sostiene que una sociedad puede tomar mejores decisiones cuando sus ciudadanos tienen acceso a información diversa y desarrollan capacidades para analizarla. El autor aclara que disponer de muchas fuentes no garantiza por sí mismo una decisión responsable. Una persona puede seleccionar únicamente contenidos que confirmen sus ideas previas y terminar reforzando sus prejuicios. Por eso, el texto recomienda comparar argumentos, identificar evidencias y reconocer los supuestos que sostienen cada posición.',
      pregunta: '¿Cuál es la idea que funciona como fundamento del argumento del autor?',
      opciones: ['La diversidad de información resulta útil cuando se acompaña de análisis crítico y comparación de evidencias.', 'La cantidad de información disponible garantiza automáticamente decisiones acertadas.', 'Las personas deberían evitar cualquier contenido que contradiga sus opiniones.', 'Todas las fuentes contienen exactamente la misma perspectiva sobre un problema.'],
      correcta: 'A'
    },
    {
      texto: 'Una campaña publicitaria presenta un producto como una solución indispensable para mejorar la vida cotidiana. El anuncio utiliza imágenes de personas felices, frases breves y testimonios seleccionados. Una estudiante señala que el producto probablemente sea útil, pero advierte que el anuncio no ofrece información suficiente para concluir que sea indispensable para todas las personas. También considera necesario comparar sus características con otras alternativas y revisar si las afirmaciones pueden comprobarse.',
      pregunta: '¿Qué actitud frente al mensaje publicitario representa mejor la postura de la estudiante?',
      opciones: ['Cuestionar las afirmaciones del anuncio y buscar información adicional antes de aceptar su conclusión.', 'Aceptar el mensaje porque utiliza testimonios de personas satisfechas.', 'Rechazar automáticamente cualquier producto que aparezca en una publicidad.', 'Considerar que una imagen positiva es suficiente evidencia de la utilidad del producto.'],
      correcta: 'A'
    },
    {
      texto: 'En una comunidad se discute si un antiguo edificio debe ser demolido para construir una nueva instalación. Quienes apoyan la demolición destacan los problemas de mantenimiento y el costo de conservarlo. Quienes se oponen señalan que el edificio tiene valor histórico y podría adaptarse a nuevos usos. Después de revisar estudios técnicos, la comunidad descubre que una restauración parcial sería posible, aunque requeriría una inversión importante. La decisión final debe considerar tanto las condiciones actuales como el significado que el lugar tiene para sus habitantes.',
      pregunta: '¿Qué elemento hace que el problema no pueda resolverse únicamente comparando costos?',
      opciones: ['La decisión también involucra valores históricos, usos sociales y distintas formas de entender el patrimonio.', 'Los costos económicos nunca deben considerarse en decisiones públicas.', 'Los edificios antiguos siempre deben conservarse sin importar su estado.', 'Una comunidad no puede tomar decisiones cuando existen opiniones diferentes.'],
      correcta: 'A'
    },
    {
      texto: 'Una investigación sobre hábitos de lectura encuentra que los estudiantes que leen con mayor frecuencia suelen obtener mejores resultados en una prueba de comprensión. Un informe inicial afirma que leer más es la causa directa de esos resultados. Sin embargo, otro investigador señala que también podrían influir variables como el tiempo disponible para estudiar, el acompañamiento familiar o el acceso a materiales educativos. Propone realizar un análisis adicional antes de establecer una relación causal definitiva.',
      pregunta: '¿Qué problema identifica el segundo investigador en la conclusión inicial?',
      opciones: ['Confundir una relación observada entre variables con una explicación causal que todavía necesita mayor evidencia.', 'Negar que los resultados de una investigación puedan utilizarse para formular preguntas.', 'Suponer que ninguna variable puede relacionarse con el rendimiento académico.', 'Considerar que los datos obtenidos mediante una prueba no tienen ningún valor.'],
      correcta: 'A'
    },
    {
      texto: 'Un municipio publica un mapa que muestra los lugares donde se concentran determinados servicios públicos. Un grupo de ciudadanos utiliza la información para argumentar que algunos barrios tienen menos acceso que otros. Otro grupo señala que el mapa solamente muestra la ubicación de los servicios y no indica cuántas personas utilizan cada uno ni cuánto tardan en llegar. Ambos grupos reconocen que el mapa es útil, pero consideran que no permite responder por sí solo todas las preguntas sobre igualdad de acceso.',
      pregunta: '¿Qué interpretación demuestra una lectura crítica del mapa?',
      opciones: ['El mapa aporta información relevante, pero sus datos deben interpretarse de acuerdo con lo que realmente permite observar.', 'El mapa permite conocer absolutamente todas las condiciones de acceso de la población.', 'El mapa carece de utilidad porque ninguna representación gráfica puede aportar información.', 'La ubicación de un servicio demuestra automáticamente que todas las personas pueden acceder a él.'],
      correcta: 'A'
    },
    {
      texto: 'Un estudiante lee dos explicaciones sobre un fenómeno científico. La primera utiliza lenguaje sencillo y presenta un ejemplo cotidiano. La segunda emplea conceptos técnicos y describe con mayor precisión el procedimiento utilizado para obtener los resultados. El estudiante decide que la primera explicación debe ser verdadera porque es más fácil de entender. Su profesora le recuerda que la claridad del lenguaje y la calidad de la evidencia son criterios diferentes y que una explicación sencilla no es necesariamente más confiable que una explicación técnica.',
      pregunta: '¿Qué error de interpretación comete inicialmente el estudiante?',
      opciones: ['Confunde la facilidad de comprensión del texto con la validez de la información que presenta.', 'Reconoce correctamente que todo texto sencillo carece de evidencia.', 'Considera que las explicaciones científicas deben ser imposibles de comprender.', 'Distingue adecuadamente entre el estilo de escritura y la evidencia disponible.'],
      correcta: 'A'
    }
  ];

  const crearPreguntaLectura = (i) => {
    const base = lecturasBase[i % lecturasBase.length];
    const variante = Math.floor(i / lecturasBase.length) + 1;
    const gradoTexto = nivel === 8 ? 'octavo' : nivel === 9 ? 'noveno' : nivel === 10 ? 'décimo' : 'undécimo';

    const introducciones = [
      `En un ejercicio de análisis para ${gradoTexto}, se presenta la siguiente situación:`,
      `Durante una actividad de Lectura Crítica de ${gradoTexto}, se analiza el siguiente caso:`,
      `Para evaluar la capacidad de interpretar y relacionar información, se plantea este texto:`,
      `En una situación cercana a la vida escolar y ciudadana, se propone analizar lo siguiente:`,
      `Como parte de una actividad de comprensión, el lector encuentra el siguiente planteamiento:`
    ];

    const cierre = variante % 2 === 0
      ? ' A partir de esta situación, el lector debe distinguir entre la información explícita y las conclusiones que pueden justificarse con ella.'
      : ' El propósito del ejercicio es identificar la interpretación que cuenta con mayor respaldo dentro del texto.';

    return {
      area: 'Lectura Crítica',
      texto: `${introducciones[i % introducciones.length]} ${base.texto}${cierre}`,
      pregunta: `${base.pregunta} (Variante ${variante})`,
      opciones: base.opciones,
      correcta: base.correcta,
      dificultad: nivel
    };
  };

  /* ------------------------------------------------------------
     MATEMÁTICAS
     ------------------------------------------------------------ */

  const crearPreguntaMatematica = (i) => {

    const tipo = i % 8;

    if (tipo === 0) {
      const precio = 20000 + (i * 137) % 30000;
      const descuento = 10 + (i % 4) * 5;
      const descuentoValor = precio * descuento / 100;
      const final = precio - descuentoValor;

      return {
        area: 'Matemáticas',
        texto: `Una tienda ofrece un descuento del ${descuento}% sobre un producto que cuesta $${precio.toLocaleString('es-CO')}. ¿Cuál es aproximadamente el precio final del producto?`,
        pregunta: 'Selecciona el resultado correcto.',
        opciones: [
          `$${Math.round(final).toLocaleString('es-CO')}`,
          `$${Math.round(precio + descuentoValor).toLocaleString('es-CO')}`,
          `$${Math.round(precio - descuentoValor / 2).toLocaleString('es-CO')}`,
          `$${Math.round(precio * descuento / 100).toLocaleString('es-CO')}`
        ],
        correcta: 'A'
      };
    }

    if (tipo === 1) {
      const base = 4 + (i % 7);
      const altura = 5 + ((i * 2) % 8);
      const area = base * altura / 2;

      return {
        area: 'Matemáticas',
        texto: `Un triángulo tiene una base de ${base} cm y una altura de ${altura} cm.`,
        pregunta: '¿Cuál es el área del triángulo?',
        opciones: [
          `${area} cm²`,
          `${base * altura} cm²`,
          `${base + altura} cm²`,
          `${area + 5} cm²`
        ],
        correcta: 'A'
      };
    }

    if (tipo === 2) {
      const cantidad = 3 + (i % 9);
      const precioUnitario = 2500 + (i % 5) * 500;
      const total = cantidad * precioUnitario;

      return {
        area: 'Matemáticas',
        texto: `Una estudiante compra ${cantidad} cuadernos. Cada cuaderno cuesta $${precioUnitario.toLocaleString('es-CO')}.`,
        pregunta: '¿Cuánto dinero debe pagar en total?',
        opciones: [
          `$${total.toLocaleString('es-CO')}`,
          `$${(total + precioUnitario).toLocaleString('es-CO')}`,
          `$${(total - precioUnitario).toLocaleString('es-CO')}`,
          `$${(cantidad + precioUnitario).toLocaleString('es-CO')}`
        ],
        correcta: 'A'
      };
    }

    if (tipo === 3) {
      const x = 2 + (i % 10);
      const resultado = 3 * x + 4;

      return {
        area: 'Matemáticas',
        texto: `Considera la expresión 3x + 4. Si x = ${x}, ¿cuál es el valor de la expresión?`,
        pregunta: 'Selecciona la respuesta correcta.',
        opciones: [
          `${resultado}`,
          `${resultado + 3}`,
          `${resultado - 4}`,
          `${x * 4}`
        ],
        correcta: 'A'
      };
    }

    if (tipo === 4) {
      const total = 40 + (i % 6) * 10;
      const favorables = total / 2;

      return {
        area: 'Matemáticas',
        texto: `En una caja hay ${total} fichas y ${favorables} de ellas son azules. Se selecciona una ficha al azar.`,
        pregunta: '¿Cuál es la probabilidad de seleccionar una ficha azul?',
        opciones: [
          '50%',
          '25%',
          '75%',
          '10%'
        ],
        correcta: 'A'
      };
    }

    if (tipo === 5) {
      const numero = 5 + (i % 10);
      const cuadrado = numero * numero;

      return {
        area: 'Matemáticas',
        texto: `Un cuadrado tiene lados de ${numero} cm.`,
        pregunta: '¿Cuál es su área?',
        opciones: [
          `${cuadrado} cm²`,
          `${numero * 4} cm²`,
          `${numero * 2} cm²`,
          `${cuadrado + numero} cm²`
        ],
        correcta: 'A'
      };
    }

    if (tipo === 6) {
      const horas = 2 + (i % 5);
      const minutos = horas * 60;

      return {
        area: 'Matemáticas',
        texto: `Una actividad dura ${horas} horas.`,
        pregunta: '¿Cuántos minutos dura la actividad?',
        opciones: [
          `${minutos} minutos`,
          `${minutos + 30} minutos`,
          `${horas * 30} minutos`,
          `${horas * 100} minutos`
        ],
        correcta: 'A'
      };
    }

    const numero1 = 20 + (i % 20);
    const numero2 = 5 + (i % 10);

    return {
      area: 'Matemáticas',
      texto: `Una cantidad de ${numero1} unidades aumenta en ${numero2} unidades.`,
      pregunta: '¿Cuál es la nueva cantidad?',
      opciones: [
        `${numero1 + numero2}`,
        `${numero1 - numero2}`,
        `${numero1 * numero2}`,
        `${numero1 / numero2}`
      ],
      correcta: 'A'
    };
  };

  /* ------------------------------------------------------------
     SOCIALES Y CIUDADANAS
     ------------------------------------------------------------ */

  const sociales = [
    {
      texto:
        'En una institución educativa se propone cambiar una norma que afecta a todos los estudiantes. Antes de tomar una decisión, se realiza una reunión donde diferentes representantes pueden expresar sus argumentos.',
      pregunta:
        '¿Qué principio democrático se evidencia principalmente?',
      opciones: [
        'La participación en la toma de decisiones.',
        'La eliminación de opiniones diferentes.',
        'La imposición de una única perspectiva.',
        'La ausencia de diálogo.'
      ],
      correcta: 'A'
    },
    {
      texto:
        'Una alcaldía publica información sobre el presupuesto destinado a diferentes proyectos y permite que los ciudadanos consulten cómo se utilizaron los recursos.',
      pregunta:
        '¿Qué finalidad tiene principalmente esta práctica?',
      opciones: [
        'Favorecer la transparencia en la gestión pública.',
        'Impedir que los ciudadanos conozcan la información.',
        'Eliminar la responsabilidad de los funcionarios.',
        'Evitar la participación ciudadana.'
      ],
      correcta: 'A'
    },
    {
      texto:
        'Dos grupos de una comunidad tienen opiniones diferentes sobre el uso de un espacio público. Para resolver el conflicto, acuerdan reunirse y escuchar las propuestas de ambas partes.',
      pregunta:
        '¿Cuál sería la estrategia más adecuada para manejar el conflicto?',
      opciones: [
        'El diálogo y la búsqueda de acuerdos.',
        'La imposición de la opinión del grupo más grande.',
        'La exclusión de una de las partes.',
        'La suspensión permanente del espacio.'
      ],
      correcta: 'A'
    },
    {
      texto:
        'Durante una elección, una persona decide apoyar una propuesta después de analizar sus argumentos y compararla con otras opciones.',
      pregunta:
        '¿Qué característica representa mejor esta decisión?',
      opciones: [
        'Participación informada.',
        'Participación obligatoria.',
        'Decisión basada únicamente en rumores.',
        'Ausencia de criterio.'
      ],
      correcta: 'A'
    }
  ];

  /* ------------------------------------------------------------
     CIENCIAS NATURALES
     ------------------------------------------------------------ */

  const ciencias = [
    {
      texto:
        'Una estudiante coloca una planta cerca de una ventana y otra planta en un lugar oscuro. Después de varios días observa diferencias en su crecimiento.',
      pregunta:
        '¿Cuál variable debería considerarse principalmente para explicar la diferencia?',
      opciones: [
        'La cantidad de luz recibida.',
        'El color de la maceta.',
        'El nombre de la planta.',
        'La ubicación de la ventana en la casa.'
      ],
      correcta: 'A'
    },
    {
      texto:
        'En un experimento se calienta agua y se observa que después de cierto tiempo comienza a convertirse en vapor.',
      pregunta:
        '¿Qué cambio de estado está ocurriendo?',
      opciones: [
        'Vaporización.',
        'Condensación.',
        'Solidificación.',
        'Fusión.'
      ],
      correcta: 'A'
    },
    {
      texto:
        'Un ecosistema contiene plantas, animales, microorganismos, agua, suelo y condiciones climáticas.',
      pregunta:
        '¿Cuál afirmación describe mejor un ecosistema?',
      opciones: [
        'Es la interacción entre organismos y factores físicos del ambiente.',
        'Está formado únicamente por animales.',
        'Está formado únicamente por plantas.',
        'No depende de factores ambientales.'
      ],
      correcta: 'A'
    },
    {
      texto:
        'Una persona consume alimentos que contienen nutrientes y posteriormente utiliza esa energía para realizar actividades físicas.',
      pregunta:
        '¿Qué relación se establece principalmente?',
      opciones: [
        'Los nutrientes pueden aportar energía para las funciones del organismo.',
        'Los alimentos no tienen relación con la energía.',
        'La actividad física elimina la necesidad de nutrientes.',
        'Los nutrientes solamente sirven para producir agua.'
      ],
      correcta: 'A'
    }
  ];

  /* ------------------------------------------------------------
     INGLÉS
     ------------------------------------------------------------ */

  const ingles = [
    {
      texto: 'Laura usually walks to school because it is close to her house.',
      pregunta: 'Why does Laura walk to school?',
      opciones: [
        'Because it is close to her house.',
        'Because she has a car.',
        'Because school is far away.',
        'Because she dislikes walking.'
      ],
      correcta: 'A'
    },
    {
      texto: 'Tom is studying for his science test. He wants to improve his grade.',
      pregunta: 'What does Tom want to improve?',
      opciones: [
        'His grade.',
        'His house.',
        'His bicycle.',
        'His lunch.'
      ],
      correcta: 'A'
    },
    {
      texto: 'Maria bought a new notebook yesterday because her old one was full.',
      pregunta: 'Why did Maria buy a new notebook?',
      opciones: [
        'Her old notebook was full.',
        'She lost her backpack.',
        'She needed a new uniform.',
        'Her teacher gave her a book.'
      ],
      correcta: 'A'
    },
    {
      texto: 'The library opens at eight in the morning and closes at five in the afternoon.',
      pregunta: 'When does the library close?',
      opciones: [
        'At five in the afternoon.',
        'At eight in the morning.',
        'At six in the morning.',
        'At noon.'
      ],
      correcta: 'A'
    }
  ];

  /* ------------------------------------------------------------
     CREAR BANCO BASE
     ------------------------------------------------------------ */

  const banco = [];

  /*
     Para que las preguntas no sean siempre las mismas,
     combinamos las preguntas base con variaciones.
  */

  const cantidadBase = 80;

  for (let i = 0; i < cantidadBase; i++) {

    const lectura = crearPreguntaLectura(i);

    banco.push({
      id: `L-${grado}-${i}`,
      area: 'Lectura Crítica',
      texto: lectura.texto,
      pregunta: lectura.pregunta,
      opciones: lectura.opciones,
      correcta: lectura.correcta,
      dificultad: nivel
    });

    const socialBase = sociales[i % sociales.length];
    const social = {
      ...socialBase,
      texto: `${socialBase.texto} Caso de análisis ${i + 1}: responde considerando únicamente la información presentada.`,
      pregunta: `${socialBase.pregunta} Selecciona la interpretación mejor sustentada en este caso.`,
    };

    banco.push({
      id: `S-${grado}-${i}`,
      area: 'Sociales y Ciudadanas',
      texto: social.texto,
      pregunta: social.pregunta,
      opciones: social.opciones,
      correcta: social.correcta,
      dificultad: nivel
    });

    const cienciaBase = ciencias[i % ciencias.length];
    const ciencia = {
      ...cienciaBase,
      texto: `${cienciaBase.texto} En el caso ${i + 1}, analiza la situación antes de elegir la respuesta.`,
      pregunta: `${cienciaBase.pregunta} ¿Cuál explicación está mejor respaldada por la información disponible?`,
    };

    banco.push({
      id: `C-${grado}-${i}`,
      area: 'Ciencias Naturales',
      texto: ciencia.texto,
      pregunta: ciencia.pregunta,
      opciones: ciencia.opciones,
      correcta: ciencia.correcta,
      dificultad: nivel
    });

    const inglesBase = ingles[i % ingles.length];
    const ing = {
      ...inglesBase,
      texto: `${inglesBase.texto} Read the sentence carefully and focus on the information given in this case (${i + 1}).`,
      pregunta: `${inglesBase.pregunta} Choose the option that is directly supported by the text.`,
    };

    banco.push({
      id: `I-${grado}-${i}`,
      area: 'Inglés',
      texto: ing.texto,
      pregunta: ing.pregunta,
      opciones: ing.opciones,
      correcta: ing.correcta,
      dificultad: nivel
    });

    banco.push({
      id: `M-${grado}-${i}`,
      ...crearPreguntaMatematica(i)
    });
  }

  /*
     Preguntas matemáticas adicionales.
     Cambian según el grado para aumentar dificultad.
  */

  for (let i = 0; i < 150; i++) {

    if (nivel >= 10) {

      const a = 2 + (i % 9);
      const b = 3 + ((i * 2) % 8);
      const c = 4 + (i % 7);

      const resultado = a * b + c;

      banco.push({
        id: `MA-${grado}-${i}`,
        area: 'Matemáticas',
        texto: `Una expresión matemática está definida como ${a} × ${b} + ${c}.`,
        pregunta: '¿Cuál es el resultado de la expresión?',
        opciones: [
          `${resultado}`,
          `${resultado + a}`,
          `${resultado - b}`,
          `${a + b + c}`
        ],
        correcta: 'A',
        dificultad: nivel
      });

    } else {

      const a = 10 + (i % 30);
      const b = 2 + (i % 10);

      banco.push({
        id: `MB-${grado}-${i}`,
        area: 'Matemáticas',
        texto: `Una cantidad de ${a} elementos se distribuye en ${b} grupos iguales.`,
        pregunta: '¿Cuántos elementos corresponden a cada grupo?',
        opciones: [
          `${Math.floor(a / b)}`,
          `${a + b}`,
          `${a - b}`,
          `${a * b}`
        ],
        correcta: 'A',
        dificultad: nivel
      });
    }
  }

  /* ------------------------------------------------------------
     MEZCLAR PREGUNTAS
     ------------------------------------------------------------ */

  const mezcladas = [...banco];

  for (let i = mezcladas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [mezcladas[i], mezcladas[j]] =
      [mezcladas[j], mezcladas[i]];
  }

  /*
     Aseguramos que la cantidad sea suficiente.
     Si todavía no hay suficientes, se reutiliza el banco
     con una variante de identificación.
  */

  const totalNecesario =
    nivel === 8 ? 260 :
    nivel === 9 ? 290 :
    nivel === 10 ? 322 :
    348;

  const resultadoFinal = [];

  for (let i = 0; i < totalNecesario; i++) {

    const pregunta = mezcladas[i % mezcladas.length];

    resultadoFinal.push({
      ...pregunta,
      numero: i + 1,
      id: `${pregunta.id}-${i}`
    });
  }

  return resultadoFinal;
};


/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */

export default function Simulacros() {

  const [gradoSeleccionado, setGradoSeleccionado] =
    useState('8');

  const [enExamen, setEnExamen] =
    useState(false);

  const grados = ['8', '9', '10', '11'];

  const usuarioActivo =
    JSON.parse(localStorage.getItem('usuario_activo'));

  const nombreUsuario =
    usuarioActivo ? usuarioActivo.nombre : 'Estudiante';

  const [preguntaActual, setPreguntaActual] =
    useState(1);

  const [opcionSeleccionada, setOpcionSeleccionada] =
    useState(null);

  const [respuestasUsuario, setRespuestasUsuario] =
    useState({});

  const [preguntasMarcadas, setPreguntasMarcadas] =
    useState({});

  const [tiempoRestante, setTiempoRestante] =
    useState(16200);

  const [totalPreguntasGrado, setTotalPreguntasGrado] =
    useState(260);

  const [simulacrosRealizados, setSimulacrosRealizados] =
    useState(0);


  /* ============================================================
     BANCO DEL GRADO ACTUAL
     ============================================================ */

  const preguntas = useMemo(() => {

    return generarPreguntas(gradoSeleccionado);

  }, [gradoSeleccionado, enExamen]);


  /* ============================================================
     CARGAR ESTADÍSTICAS
     ============================================================ */

  useEffect(() => {

    const simulacrosGuardados =
      Number(localStorage.getItem('total_simulacros')) || 0;

    setSimulacrosRealizados(simulacrosGuardados);

  }, []);


  /* ============================================================
     TEMPORIZADOR
     ============================================================ */

  useEffect(() => {

    let timer;

    if (enExamen && tiempoRestante > 0) {

      timer = setInterval(() => {

        setTiempoRestante((prev) =>
          prev - 1
        );

      }, 1000);
    }

    return () =>
      clearInterval(timer);

  }, [enExamen, tiempoRestante]);


  /* ============================================================
     FORMATO DEL TIEMPO
     ============================================================ */

  const formatearTiempo = (segundos) => {

    const hrs =
      Math.floor(segundos / 3600)
        .toString()
        .padStart(2, '0');

    const mins =
      Math.floor((segundos % 3600) / 60)
        .toString()
        .padStart(2, '0');

    const secs =
      (segundos % 60)
        .toString()
        .padStart(2, '0');

    return `${hrs}:${mins}:${secs}`;
  };


  /* ============================================================
     INICIAR PRUEBA
     ============================================================ */

  const iniciarPrueba = (grado) => {

    setGradoSeleccionado(grado);

    let cantidad = 260;

    if (grado === '9')
      cantidad = 290;

    if (grado === '10')
      cantidad = 322;

    if (grado === '11')
      cantidad = 348;

    setTotalPreguntasGrado(cantidad);

    setEnExamen(true);

    setTiempoRestante(16200);

    setPreguntaActual(1);

    setOpcionSeleccionada(null);

    setRespuestasUsuario({});

    setPreguntasMarcadas({});
  };


  /* ============================================================
     SELECCIONAR RESPUESTA
     ============================================================ */

  const handleSeleccionarOpcion = (letra) => {

    setOpcionSeleccionada(letra);

    setRespuestasUsuario({
      ...respuestasUsuario,
      [preguntaActual]: letra
    });

  };


  /* ============================================================
     PREGUNTA ACTUAL
     ============================================================ */

  const pregunta =
    preguntas[preguntaActual - 1];


  /* ============================================================
     ESTADÍSTICAS
     ============================================================ */

  const cantidadRespondidas =
    Object.keys(respuestasUsuario).length;

  const cantidadMarcadas =
    Object.keys(preguntasMarcadas)
      .filter(k => preguntasMarcadas[k])
      .length;

  const porcentajeAvance =
    Math.round(
      (preguntaActual /
        totalPreguntasGrado) * 100
    );


  /* ============================================================
     FINALIZAR SOLO CUANDO TODAS ESTÉN RESPONDIDAS
     ============================================================ */

  const intentarFinalizarSimulacro = () => {
    const pendientes = [];

    for (let i = 1; i <= totalPreguntasGrado; i++) {
      if (respuestasUsuario[i] === undefined) {
        pendientes.push(i);
      }
    }

    if (pendientes.length > 0) {
      const primeraPendiente = pendientes[0];

      setPreguntaActual(primeraPendiente);
      setOpcionSeleccionada(
        respuestasUsuario[primeraPendiente] || null
      );

      alert(
        `No puedes finalizar todavía.\n\n` +
        `Te faltan ${pendientes.length} preguntas por responder.\n` +
        `Debes responder todas antes de finalizar el simulacro.`
      );

      return;
    }

    registrarSimulacroCompletado();

    alert(
      '¡Simulacro finalizado con éxito! Todas las preguntas fueron respondidas.'
    );

    setEnExamen(false);
  };


  /* ============================================================
     REGISTRAR SIMULACRO
     ============================================================ */

  const registrarSimulacroCompletado = () => {

    const nuevoTotal =
      simulacrosRealizados + 1;

    setSimulacrosRealizados(
      nuevoTotal
    );

    localStorage.setItem(
      'total_simulacros',
      nuevoTotal
    );

    const puntajeObtenido = 500;

    localStorage.setItem(
      'puntaje_usuario',
      puntajeObtenido
    );

    const datosRanking = {

      nombre: nombreUsuario,

      grado:
        `Grado ${gradoSeleccionado}°`,

      puntos:
        puntajeObtenido

    };

    localStorage.setItem(
      'datos_ranking_usuario',
      JSON.stringify(datosRanking)
    );
  };


  /* ============================================================
     VISTA DEL EXAMEN
     ============================================================ */

  if (enExamen) {

    return (

      <div
        style={{
          backgroundColor: '#F8FAFC',
          minHeight: '100vh',
          width: '100%',
          padding: '16px',
          boxSizing: 'border-box',
          fontFamily:
            "'Segoe UI', Roboto, sans-serif"
        }}
      >

        {/* ENCABEZADO */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            backgroundColor: '#FFFFFF',
            padding: '16px 20px',
            borderRadius: '12px',
            boxShadow:
              '0 2px 8px rgba(0,0,0,0.05)',
            marginBottom: '20px'
          }}
        >

          <div>

            <h2
              style={{
                margin: 0,
                fontSize: '18px',
                color: '#0F172A',
                fontWeight: '800'
              }}
            >
              Simulacro Saber {gradoSeleccionado}° - Completo
            </h2>

            <div
              style={{
                display: 'flex',
                gap: '16px',
                marginTop: '4px',
                fontSize: '12px',
                color: '#64748B'
              }}
            >

              <span>
                ⏱ Tiempo total: 4:30:00
              </span>

              <span>
                📖 Área: {pregunta?.area || 'Lectura Crítica'}
              </span>

            </div>

          </div>


          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border:
                  '1px solid #E2E8F0',
                padding: '6px 12px',
                borderRadius: '8px'
              }}
            >

              <span
                style={{
                  fontSize: '16px'
                }}
              >
                ⏱
              </span>

              <div>

                <div
                  style={{
                    fontSize: '9px',
                    color: '#64748B',
                    textTransform: 'uppercase'
                  }}
                >
                  Tiempo restante
                </div>

                <div
                  style={{
                    fontSize: '14px',
                    fontWeight: '700',
                    color: '#0F172A',
                    fontFamily: 'monospace'
                  }}
                >
                  {formatearTiempo(
                    tiempoRestante
                  )}
                </div>

              </div>

            </div>


            <button
              onClick={intentarFinalizarSimulacro}
              style={{
                backgroundColor: '#FFF1F2',
                color: '#E11D48',
                border:
                  '1px solid #FECDD3',
                padding: '8px 14px',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: 'pointer',
                fontSize: '13px'
              }}
            >
              Finalizar simulacro
            </button>

          </div>

        </div>


        {/* CONTENIDO */}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              '1fr 340px',
            gap: '20px',
            width: '100%',
            alignItems: 'start'
          }}
        >


          {/* PREGUNTA */}

          <div
            style={{
              backgroundColor: '#FFFFFF',
              padding: '24px',
              borderRadius: '16px',
              boxShadow:
                '0 2px 8px rgba(0,0,0,0.05)'
            }}
          >

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                alignItems: 'center',
                marginBottom: '16px'
              }}
            >

              <div
                style={{
                  backgroundColor: '#4F46E5',
                  color: '#FFFFFF',
                  display: 'inline-block',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700'
                }}
              >
                Pregunta {preguntaActual} de {totalPreguntasGrado}
              </div>

              <span
                style={{
                  fontSize: '12px',
                  fontWeight: '800',
                  color: '#4F46E5'
                }}
              >
                {porcentajeAvance}%
              </span>

            </div>


            {/* BARRA */}

            <div
              style={{
                width: '100%',
                height: '6px',
                backgroundColor: '#F1F5F9',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '16px'
              }}
            >

              <div
                style={{
                  width:
                    `${porcentajeAvance}%`,
                  height: '100%',
                  backgroundColor: '#4F46E5',
                  transition:
                    'width 0.3s'
                }}
              />

            </div>


            {/* ÁREA */}

            <div
              style={{
                display: 'inline-block',
                backgroundColor: '#EEF2FF',
                color: '#4F46E5',
                padding: '5px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '800',
                marginBottom: '14px'
              }}
            >
              {pregunta?.area}
            </div>


            {/* TEXTO */}

            <p
              style={{
                color: '#334155',
                fontWeight: '600',
                marginBottom: '12px',
                fontSize: '14px'
              }}
            >
              {pregunta?.area === 'Inglés'
                ? 'Read the following text and answer the question.'
                : 'Lee el siguiente texto y responde la pregunta.'}
            </p>


            <div
              style={{
                backgroundColor: '#F8FAFC',
                borderLeft:
                  '4px solid #6366F1',
                padding: '14px',
                borderRadius:
                  '0 8px 8px 0',
                fontSize: '13px',
                color: '#475569',
                marginBottom: '20px',
                lineHeight: '1.5'
              }}
            >
              {pregunta?.texto}
            </div>


            {/* PREGUNTA */}

            <h4
              style={{
                color: '#0F172A',
                fontSize: '14px',
                marginBottom: '14px'
              }}
            >
              {pregunta?.pregunta}
            </h4>


            {/* OPCIONES */}

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}
            >

              {pregunta?.opciones?.map(
                (texto, index) => {

                  const letra =
                    ['A', 'B', 'C', 'D'][index];

                  const seleccionado =
                    opcionSeleccionada === letra;

                  return (

                    <button
                      key={letra}
                      onClick={() =>
                        handleSeleccionarOpcion(
                          letra
                        )
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px',
                        borderRadius: '12px',
                        border:
                          seleccionado
                            ? '2px solid #4F46E5'
                            : '1px solid #E2E8F0',
                        backgroundColor:
                          seleccionado
                            ? '#EEF2FF'
                            : '#FFFFFF',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontSize: '13px',
                        color: '#1E293B',
                        transition:
                          'all 0.2s'
                      }}
                    >

                      <span
                        style={{
                          fontWeight: '700',
                          backgroundColor:
                            seleccionado
                              ? '#4F46E5'
                              : '#F1F5F9',
                          color:
                            seleccionado
                              ? '#FFFFFF'
                              : '#64748B',
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent:
                            'center',
                          flexShrink: 0
                        }}
                      >
                        {letra}
                      </span>

                      {texto}

                    </button>

                  );
                }
              )}

            </div>


            {/* CONTROLES */}

            <div
              style={{
                display: 'flex',
                justifyContent:
                  'space-between',
                gap: '8px',
                marginTop: '20px',
                flexWrap: 'wrap'
              }}
            >

              {/* ANTERIOR */}

              <button
                onClick={() => {

                  const anterior =
                    Math.max(
                      1,
                      preguntaActual - 1
                    );

                  setPreguntaActual(
                    anterior
                  );

                  setOpcionSeleccionada(
                    respuestasUsuario[
                      anterior
                    ] || null
                  );

                }}
                style={{
                  padding:
                    '8px 14px',
                  border:
                    '1px solid #E2E8F0',
                  borderRadius: '8px',
                  backgroundColor:
                    '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                ← Anterior
              </button>


              {/* MARCAR */}

              <button
                onClick={() => {

                  setPreguntasMarcadas({
                    ...preguntasMarcadas,
                    [preguntaActual]:
                      !preguntasMarcadas[
                        preguntaActual
                      ]
                  });

                }}
                style={{
                  padding:
                    '8px 14px',
                  border:
                    '1px solid #E2E8F0',
                  borderRadius: '8px',
                  backgroundColor:
                    preguntasMarcadas[
                      preguntaActual
                    ]
                      ? '#FEF3C7'
                      : '#FFFFFF',
                  color: '#D97706',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '13px'
                }}
              >
                {preguntasMarcadas[
                  preguntaActual
                ]
                  ? '📌 Marcada para revisar'
                  : '📌 Marcar para revisar'}
              </button>


              {/* SIGUIENTE */}

              <button
                onClick={() => {

                  if (
                    preguntaActual <
                    totalPreguntasGrado
                  ) {

                    const siguiente =
                      preguntaActual + 1;

                    setPreguntaActual(
                      siguiente
                    );

                    setOpcionSeleccionada(
                      respuestasUsuario[
                        siguiente
                      ] || null
                    );

                  } else {
                    intentarFinalizarSimulacro();
                  }

                }}
                style={{
                  padding:
                    '8px 14px',
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor:
                    '#4F46E5',
                  color: '#FFFFFF',
                  cursor: 'pointer',
                  fontWeight: '700',
                  fontSize: '13px'
                }}
              >
                {preguntaActual ===
                totalPreguntasGrado
                  ? 'Finalizar'
                  : 'Siguiente →'}
              </button>

            </div>

          </div>


          {/* PANEL DERECHO */}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >

            {/* NAVEGACIÓN */}

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '16px',
                borderRadius: '16px',
                boxShadow:
                  '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >

              <h4
                style={{
                  margin:
                    '0 0 10px 0',
                  fontSize: '13px',
                  color: '#0F172A',
                  fontWeight: '800'
                }}
              >
                Navegación de preguntas
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(10, 1fr)',
                  gap: '4px',
                  maxHeight: '180px',
                  overflowY: 'auto',
                  paddingRight: '4px'
                }}
              >

                {Array.from(
                  {
                    length:
                      totalPreguntasGrado
                  },
                  (_, i) => i + 1
                ).map(num => {

                  const respondida =
                    respuestasUsuario[
                      num
                    ] !== undefined;

                  const marcada =
                    preguntasMarcadas[
                      num
                    ];

                  const esActual =
                    preguntaActual === num;

                  let bgColor =
                    '#F8FAFC';

                  let textColor =
                    '#0F172A';

                  let borderColor =
                    '#E2E8F0';

                  if (respondida) {

                    bgColor =
                      '#EEF2FF';

                    textColor =
                      '#4F46E5';

                    borderColor =
                      '#4F46E5';
                  }

                  if (marcada) {

                    bgColor =
                      '#FEF3C7';

                    textColor =
                      '#D97706';

                    borderColor =
                      '#F59E0B';
                  }

                  return (

                    <button
                      key={num}
                      onClick={() => {

                        setPreguntaActual(
                          num
                        );

                        setOpcionSeleccionada(
                          respuestasUsuario[
                            num
                          ] || null
                        );

                      }}
                      style={{
                        padding:
                          '6px 0',
                        borderRadius:
                          '6px',
                        border:
                          esActual
                            ? '2px solid #4F46E5'
                            : `1px solid ${borderColor}`,
                        backgroundColor:
                          bgColor,
                        color:
                          textColor,
                        fontWeight:
                          '700',
                        fontSize:
                          '10px',
                        cursor:
                          'pointer'
                      }}
                    >
                      {num}
                    </button>

                  );

                })}

              </div>

            </div>


            {/* RESULTADO */}

            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '16px',
                borderRadius: '16px',
                boxShadow:
                  '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >

              <h4
                style={{
                  margin:
                    '0 0 12px 0',
                  fontSize: '13px',
                  color: '#0F172A',
                  fontWeight: '800'
                }}
              >
                Resultado en tiempo real
              </h4>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '80px 1fr',
                  gap: '10px',
                  alignItems:
                    'center'
                }}
              >

                <div
                  style={{
                    width: '76px',
                    height: '76px',
                    borderRadius: '50%',
                    background:
                      `conic-gradient(#16A34A 0% ${porcentajeAvance}%, #E2E8F0 ${porcentajeAvance}% 100%)`,
                    display: 'flex',
                    alignItems:
                      'center',
                    justifyContent:
                      'center'
                  }}
                >

                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      backgroundColor:
                        '#FFFFFF',
                      borderRadius:
                        '50%',
                      display: 'flex',
                      flexDirection:
                        'column',
                      alignItems:
                        'center',
                      justifyContent:
                        'center'
                    }}
                  >

                    <span
                      style={{
                        fontSize:
                          '14px',
                        fontWeight:
                          '900',
                        color:
                          '#0F172A'
                      }}
                    >
                      {porcentajeAvance}%
                    </span>

                    <span
                      style={{
                        fontSize:
                          '6px',
                        color:
                          '#64748B',
                        fontWeight:
                          '700'
                      }}
                    >
                      Progreso
                    </span>

                  </div>

                </div>


                <div
                  style={{
                    display:
                      'flex',
                    flexDirection:
                      'column',
                    gap: '4px',
                    fontSize:
                      '11px',
                    fontWeight:
                      '600'
                  }}
                >

                  <div
                    style={{
                      display:
                        'flex',
                      justifyContent:
                        'space-between'
                    }}
                  >
                    <span>
                      🟢 Respondidas
                    </span>

                    <strong>
                      {cantidadRespondidas}
                    </strong>
                  </div>

                  <div
                    style={{
                      display:
                        'flex',
                      justifyContent:
                        'space-between'
                    }}
                  >
                    <span>
                      🔵 Por responder
                    </span>

                    <strong>
                      {totalPreguntasGrado -
                        cantidadRespondidas}
                    </strong>
                  </div>

                  <div
                    style={{
                      display:
                        'flex',
                      justifyContent:
                        'space-between'
                    }}
                  >
                    <span>
                      🟠 Marcadas
                    </span>

                    <strong>
                      {cantidadMarcadas}
                    </strong>
                  </div>

                </div>

              </div>

            </div>


            {/* ÚLTIMAS RESPUESTAS */}

            <div
              style={{
                backgroundColor:
                  '#FFFFFF',
                padding: '16px',
                borderRadius: '16px',
                boxShadow:
                  '0 2px 8px rgba(0,0,0,0.05)'
              }}
            >

              <h4
                style={{
                  margin: 0,
                  fontSize: '13px',
                  color: '#0F172A',
                  fontWeight: '800',
                  marginBottom:
                    '10px'
                }}
              >
                Últimas respuestas
              </h4>

              {Object.keys(
                respuestasUsuario
              ).length === 0 ? (

                <div
                  style={{
                    padding:
                      '12px 0',
                    textAlign:
                      'center'
                  }}
                >
                  <span
                    style={{
                      fontSize:
                        '11px',
                      color:
                        '#94A3B8',
                      fontWeight:
                        '600'
                    }}
                  >
                    Sin respuestas recientes
                  </span>
                </div>

              ) : (

                Object.entries(
                  respuestasUsuario
                )
                  .slice(-3)
                  .map(
                    ([num, letra]) => (

                      <div
                        key={num}
                        style={{
                          display:
                            'flex',
                          justifyContent:
                            'space-between',
                          alignItems:
                            'center',
                          backgroundColor:
                            '#F8FAFC',
                          padding:
                            '6px 10px',
                          borderRadius:
                            '8px',
                          border:
                            '1px solid #E2E8F0',
                          marginBottom:
                            '6px'
                        }}
                      >

                        <span
                          style={{
                            fontSize:
                              '11px',
                            fontWeight:
                              '700'
                          }}
                        >
                          {num}. Opción {letra}
                        </span>

                        <span
                          style={{
                            fontSize:
                              '10px',
                            backgroundColor:
                              '#DCFCE7',
                            color:
                              '#166534',
                            padding:
                              '2px 6px',
                            borderRadius:
                              '4px',
                            fontWeight:
                              '700'
                          }}
                        >
                          Respondida
                        </span>

                      </div>

                    )
                  )

              )}

            </div>

          </div>

        </div>

      </div>

    );
  }


  /* ============================================================
     MENÚ PRINCIPAL
     ============================================================ */

  return (

    <div
      style={{
        textAlign: 'center',
        padding: '40px 16px',
        backgroundColor: '#0B132B',
        minHeight: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        fontFamily:
          "'Segoe UI', Roboto, sans-serif"
      }}
    >

      <h2
        style={{
          fontSize:
            'clamp(24px, 5vw, 32px)',
          color: '#38BDF8',
          margin:
            '0 0 10px 0',
          fontWeight: '800'
        }}
      >
        ¡Hola, {nombreUsuario}! 👋
      </h2>

      <p
        style={{
          color: '#94A3B8',
          fontSize: '14px',
          marginBottom: '28px'
        }}
      >
        Aquí están tus simulacros disponibles para practicar.
      </p>


      {/* GRADOS */}

      <div
        style={{
          display: 'flex',
          justifyContent:
            'center',
          gap: '8px',
          marginBottom:
            '28px',
          flexWrap:
            'wrap'
        }}
      >

        {grados.map(grado => {

          const esSeleccionado =
            gradoSeleccionado ===
            grado;

          return (

            <button
              key={grado}
              type="button"
              onClick={() =>
                setGradoSeleccionado(
                  grado
                )
              }
              style={{
                padding:
                  '8px 18px',
                borderRadius:
                  '25px',
                border:
                  esSeleccionado
                    ? '2px solid #6366F1'
                    : '1px solid rgba(255,255,255,0.1)',
                fontWeight:
                  '700',
                fontSize:
                  '14px',
                cursor:
                  'pointer',
                backgroundColor:
                  esSeleccionado
                    ? '#4F46E5'
                    : 'rgba(255,255,255,0.05)',
                color:
                  esSeleccionado
                    ? '#FFFFFF'
                    : '#94A3B8'
              }}
            >
              Grado {grado}°
            </button>

          );

        })}

      </div>


      {/* TARJETA */}

      <div
        style={{
          backgroundColor:
            '#FFFFFF',
          borderRadius:
            '20px',
          padding:
            '30px 20px',
          maxWidth:
            '480px',
          width:
            '100%',
          margin:
            '0 auto',
          boxShadow:
            '0 20px 40px rgba(0,0,0,0.4)',
          color:
            '#1E293B',
          boxSizing:
            'border-box'
        }}
      >

        <h3
          style={{
            fontSize:
              'clamp(18px,4vw,22px)',
            fontWeight:
              '800',
            margin:
              '0 0 10px 0',
            color:
              '#0F172A'
          }}
        >
          Simulacro Saber {gradoSeleccionado}° - Completo
        </h3>

        <p
          style={{
            color:
              '#64748B',
            fontSize:
              '13px',
            margin:
              '0 0 24px 0',
            fontWeight:
              '500'
          }}
        >
          {gradoSeleccionado === '8' &&
            '260 Preguntas • Tiempo total: 4:30:00'}

          {gradoSeleccionado === '9' &&
            '290 Preguntas • Tiempo total: 4:30:00'}

          {gradoSeleccionado === '10' &&
            '322 Preguntas • Tiempo total: 4:30:00'}

          {gradoSeleccionado === '11' &&
            '348 Preguntas • Tiempo total: 4:30:00'}
        </p>


        <button
          onClick={() =>
            iniciarPrueba(
              gradoSeleccionado
            )
          }
          style={{
            width:
              '100%',
            padding:
              '14px',
            backgroundColor:
              '#4F46E5',
            color:
              '#FFFFFF',
            border:
              'none',
            borderRadius:
              '12px',
            fontWeight:
              '700',
            fontSize:
              '15px',
            cursor:
              'pointer',
            boxShadow:
              '0 6px 20px rgba(79,70,229,0.35)'
          }}
        >
          Iniciar Prueba
        </button>

      </div>

    </div>

  );
}