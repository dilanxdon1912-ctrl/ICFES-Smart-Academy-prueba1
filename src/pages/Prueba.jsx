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
  // CANTIDAD DE PREGUNTAS
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
  // MEZCLAR OPCIONES
  // =========================================================

  const mezclarOpciones = (correcta, incorrectas, semilla) => {

    const todas = [
      {
        texto: correcta,
        correcta: true
      },
      ...incorrectas.map((texto) => ({
        texto,
        correcta: false
      }))
    ];

    const resultado = [...todas];

    for (let i = resultado.length - 1; i > 0; i--) {

      const j =
        Math.abs(
          Math.floor(
            Math.sin((semilla + 1) * (i + 1)) * 10000
          )
        ) % (i + 1);

      const temporal = resultado[i];

      resultado[i] = resultado[j];
      resultado[j] = temporal;
    }

    const indiceCorrecto = resultado.findIndex(
      (opcion) => opcion.correcta
    );

    return {
      opciones: resultado.map(
        (opcion) => opcion.texto
      ),
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

    const resultado = mezclarOpciones(
      correcta,
      incorrectas,
      semilla
    );

    return {
      id: `${semilla}-${pregunta}`,
      texto,
      pregunta,
      opciones: resultado.opciones,
      correcta: resultado.correcta
    };
  };


  // =========================================================
  // MATEMÁTICAS - BANCO VARIADO POR GRADO
  // =========================================================

  // =========================================================
  // DISTRACTORES DIFERENTES POR PREGUNTA
  // Mantiene las preguntas y respuestas correctas originales,
  // pero evita reutilizar las mismas respuestas incorrectas.
  // =========================================================

  const obtenerDistractoresDiferentes = (
    asignatura,
    gradoActual,
    indice,
    correcta
  ) => {

    const pools = {

      lectura: [
        'Aceptar la primera opinión disponible sin revisar cómo fue construida.',
        'Dar prioridad a una afirmación únicamente porque coincide con lo que ya se pensaba.',
        'Concluir que todas las perspectivas tienen el mismo valor aunque no presenten razones.',
        'Rechazar una idea solamente porque proviene de una persona con una opinión diferente.',
        'Considerar innecesario comparar experiencias cuando existe una explicación sencilla.',
        'Interpretar que una situación se resuelve mejor cuando se evita escuchar a otros participantes.',
        'Suponer que una información es suficiente aunque el texto no aporte elementos que la respalden.',
        'Reducir el propósito del texto a repetir una frase sin analizar la relación entre sus ideas.',
        'Confundir una opinión personal con una conclusión demostrada por el contenido.',
        'Pensar que analizar información significa desconfiar automáticamente de todas las fuentes.',
        'Considerar que una decisión es correcta solo porque fue tomada por la mayoría.',
        'Ignorar las consecuencias de una propuesta cuando la intención de quien la presenta parece positiva.',
        'Explicar el mensaje únicamente a partir del título y no de las ideas desarrolladas.',
        'Afirmar que escuchar opiniones diferentes dificulta siempre la comprensión de un problema.',
        'Suponer que una conclusión puede aceptarse aunque contradiga la información presentada.',
        'Interpretar que el autor busca imponer una única respuesta cuando presenta argumentos para analizar.',
        'Confundir el tema general del texto con una afirmación específica que el autor no defiende.',
        'Considerar que reunir información es innecesario si ya existe una opinión ampliamente compartida.',
        'Entender el pensamiento crítico como rechazar cualquier afirmación en lugar de examinarla.',
        'Afirmar que las evidencias tienen menos importancia que la seguridad con la que alguien habla.',
        'Concluir que una propuesta debe aceptarse porque parece conveniente a corto plazo.',
        'Suponer que dos opiniones opuestas no pueden compararse mediante razones y evidencias.',
        'Interpretar que el texto pretende entretener aunque su contenido se centra en analizar una situación.',
        'Afirmar que una experiencia individual basta para explicar un fenómeno que involucra a muchas personas.',
        'Considerar que verificar una fuente cambia necesariamente el contenido de una afirmación.',
        'Suponer que una conclusión es objetiva simplemente porque está escrita de manera formal.',
        'Confundir una posibilidad mencionada en el texto con la posición principal que defiende el autor.',
        'Pensar que reconocer diferentes perspectivas obliga a aceptar todas las conclusiones como verdaderas.',
        'Reducir un argumento a una preferencia personal sin considerar las razones que lo acompañan.',
        'Afirmar que una información repetida muchas veces deja de necesitar comprobación.',
        'Interpretar que el autor rechaza cualquier decisión colectiva cuando en realidad analiza sus condiciones.',
        'Concluir que la mejor lectura es la que encuentra una respuesta rápida sin revisar el contexto.',
        'Suponer que una fuente es confiable solo por tener un lenguaje técnico o académico.',
        'Considerar que las consecuencias de una decisión son irrelevantes si existe consenso entre los participantes.',
        'Afirmar que comparar puntos de vista impide llegar a una conclusión razonada.',
        'Confundir una pregunta planteada por el autor con una respuesta que el texto ya haya demostrado.',
        'Pensar que una afirmación adquiere validez únicamente por ser popular en redes sociales.',
        'Interpretar cualquier desacuerdo como una señal de que ninguna de las posiciones puede estar sustentada.',
        'Concluir que el lector debe aceptar la postura del autor sin evaluar los argumentos utilizados.',
        'Suponer que el propósito de una reflexión es presentar datos aislados sin relacionarlos entre sí.',
        'Afirmar que las decisiones colectivas deben basarse solo en emociones y no en información.',
        'Confundir una consecuencia posible con la causa principal de la situación descrita.',
        'Pensar que reconocer una limitación de un argumento significa que todo el texto carece de valor.',
        'Considerar que una interpretación es válida aunque no pueda relacionarse con ninguna parte del texto.',
        'Afirmar que una fuente secundaria siempre es más confiable que una fuente primaria.',
        'Suponer que la cantidad de personas que apoyan una idea determina por sí sola su veracidad.',
        'Interpretar que analizar una afirmación significa buscar únicamente información que la confirme.'
      ],

      sociales: [
        'Tomar la decisión únicamente con base en la opinión de quien tenga mayor influencia económica.',
        'Excluir a los grupos afectados para evitar que aparezcan desacuerdos durante la discusión.',
        'Aceptar una medida pública sin revisar si respeta los derechos involucrados.',
        'Confundir el apoyo de una mayoría con la autorización para ignorar las normas.',
        'Resolver un conflicto mediante la imposición de la posición de un solo participante.',
        'Considerar que las instituciones pueden actuar sin tener competencias definidas por las normas.',
        'Elegir una propuesta por su popularidad aunque no se conozcan sus posibles consecuencias.',
        'Dar por cierta una publicación porque fue compartida muchas veces en redes sociales.',
        'Priorizar un beneficio inmediato aunque produzca una afectación grave a otros grupos.',
        'Evitar la participación ciudadana para que las decisiones sean tomadas con mayor rapidez.',
        'Considerar que los derechos dependen de la conveniencia política del momento.',
        'Reemplazar los procedimientos institucionales por decisiones personales de los funcionarios.',
        'Suponer que toda información difundida por un medio tiene automáticamente el mismo nivel de confiabilidad.',
        'Ignorar las responsabilidades de las autoridades cuando existe un conflicto entre intereses colectivos.',
        'Considerar innecesario explicar una decisión pública si cuenta con suficientes seguidores.',
        'Resolver una controversia atendiendo únicamente al interés del grupo que inició la propuesta.',
        'Afirmar que la participación ciudadana solo consiste en votar y no incluye deliberar o solicitar información.',
        'Aceptar una norma sin analizar si puede entrar en tensión con derechos fundamentales.',
        'Confundir una crítica a una institución con una prueba de que toda institución carece de legitimidad.',
        'Suponer que una política es justa porque beneficia a un sector aunque perjudique injustificadamente a otro.',
        'Dar prioridad a rumores frente a documentos oficiales y evidencias verificables.',
        'Considerar que la existencia de opiniones diferentes impide construir acuerdos democráticos.',
        'Elegir una alternativa sin comparar sus costos sociales, económicos y ambientales.',
        'Afirmar que una autoridad puede intervenir en cualquier asunto aunque no tenga competencia legal.',
        'Reducir un conflicto público a una diferencia personal entre dos individuos.',
        'Pensar que una decisión colectiva no necesita mecanismos de rendición de cuentas.',
        'Aceptar como argumento suficiente la cantidad de personas que apoyan una propuesta.',
        'Ignorar a las minorías porque su posición no coincide con la de la mayoría.',
        'Confundir libertad de expresión con la obligación de aceptar como verdadera cualquier afirmación.',
        'Considerar que consultar a la ciudadanía debilita necesariamente la autoridad de las instituciones.',
        'Evaluar una política únicamente por su intención y no por los efectos que produce.',
        'Suponer que la información pública no necesita ser contrastada antes de utilizarse en un debate.',
        'Resolver un problema institucional sin identificar qué entidad tiene la responsabilidad correspondiente.',
        'Afirmar que los derechos pueden suspenderse simplemente porque una propuesta tiene apoyo popular.',
        'Priorizar la rapidez de una decisión sobre la transparencia del procedimiento utilizado.',
        'Considerar que un argumento es válido solo porque proviene de una autoridad reconocida.',
        'Excluir la evidencia histórica cuando se analizan decisiones que afectan a una comunidad.',
        'Suponer que todos los intereses colectivos tienen exactamente las mismas consecuencias para cada grupo.',
        'Interpretar la participación como obedecer una decisión ya tomada y no como intervenir en su construcción.',
        'Aceptar una medida porque favorece al grupo más numeroso sin estudiar a quién podría perjudicar.',
        'Confundir competencia institucional con poder ilimitado para intervenir en cualquier situación.',
        'Considerar que una protesta elimina automáticamente la necesidad de presentar argumentos.',
        'Dar por solucionado un conflicto cuando una de las partes deja de participar en la discusión.',
        'Ignorar las normas aplicables cuando una decisión parece producir un beneficio económico.',
        'Suponer que una fuente es confiable únicamente porque coincide con la posición política propia.',
        'Afirmar que la mejor política pública es siempre la que obtiene más votos.',
        'Considerar innecesario revisar las consecuencias futuras de una decisión adoptada en el presente.',
        'Resolver una diferencia colectiva mediante presión social en lugar de mecanismos democráticos.',
        'Interpretar que la igualdad significa tratar todas las situaciones exactamente de la misma manera.',
        'Aceptar una decisión institucional sin preguntar por sus fundamentos, responsables y mecanismos de control.'
      ],

      naturales: [
        'La energía desaparece por completo cuando una sustancia cambia de estado.',
        'El aumento de temperatura hace que las partículas de cualquier sistema dejen de moverse.',
        'Una mezcla homogénea siempre está formada por una sola sustancia pura.',
        'Toda fuerza aplicada a un objeto produce necesariamente un movimiento permanente.',
        'Una característica observable no puede relacionarse con procesos ocurridos dentro de las células.',
        'Los organismos adquieren directamente cualquier característica que necesitan durante su vida.',
        'Una mutación siempre resulta perjudicial para el organismo que la presenta.',
        'La información genética permanece sin relación con la producción de proteínas.',
        'Una sola observación basta para demostrar de manera definitiva una relación de causa y efecto.',
        'Los datos experimentales deben ignorarse cuando contradicen la explicación inicial.',
        'Todas las especies responden de la misma manera a cualquier cambio ambiental.',
        'El calor y la temperatura son exactamente la misma magnitud física.',
        'Una sustancia se disuelve porque sus partículas desaparecen del sistema.',
        'La selección natural ocurre porque los individuos eligen conscientemente sus características.',
        'La masa de un sistema cerrado puede aparecer o desaparecer sin intercambio de materia.',
        'Un cambio físico siempre produce una sustancia completamente nueva.',
        'La energía cinética promedio de las partículas disminuye necesariamente cuando aumenta la temperatura.',
        'Los genes funcionan de manera independiente del ambiente y de la regulación celular.',
        'Una correlación entre dos variables demuestra por sí sola que una causa directamente a la otra.',
        'Toda variación genética proporciona una ventaja sin importar el ambiente.',
        'El equilibrio químico significa que las reacciones dejan de ocurrir por completo.',
        'El transporte de sustancias a través de una membrana nunca requiere energía.',
        'Los modelos científicos no deben modificarse aunque nueva evidencia muestre limitaciones.',
        'Una población cambia porque todos sus individuos se transforman de manera idéntica al mismo tiempo.',
        'La reproducción no influye en la frecuencia de características dentro de una población.',
        'La información genética solo sirve para producir energía y no participa en la estructura celular.',
        'Un resultado experimental puede aceptarse sin controlar las variables relevantes.',
        'La evaporación convierte una sustancia en otra diferente porque cambia su estado.',
        'Las partículas de una sustancia permanecen completamente inmóviles a cualquier temperatura.',
        'Un aumento de luz siempre garantiza que cualquier planta crecerá al mismo ritmo.',
        'La evidencia científica tiene el mismo significado aunque las condiciones del experimento cambien.',
        'Una proteína puede producirse correctamente aunque la información necesaria para fabricarla sea alterada.',
        'La selección natural ocurre a nivel de decisiones individuales y no de cambios en poblaciones.',
        'Los organismos resistentes aparecen porque cada individuo modifica voluntariamente su ADN.',
        'Toda alteración del ADN provoca necesariamente la muerte de la célula.',
        'La materia de un recipiente cerrado puede transformarse en energía sin conservarse la cantidad total del sistema.',
        'Las variables de un experimento no necesitan mantenerse controladas para comparar resultados.',
        'Un modelo matemático o científico representa siempre todos los detalles de un fenómeno real.',
        'La velocidad de una reacción no depende de las condiciones del sistema.',
        'Una población sin variación genética puede adaptarse ilimitadamente a cualquier ambiente.',
        'Las características adquiridas durante la vida se transmiten automáticamente a toda la descendencia.',
        'La temperatura mide directamente la cantidad total de materia presente en un objeto.',
        'La concentración de una sustancia no influye en los procesos de transporte a través de membranas.',
        'Una hipótesis se convierte en una ley científica después de comprobarla una sola vez.',
        'El ADN contiene energía utilizable, pero no información para producir moléculas celulares.',
        'Los efectos de una variable pueden interpretarse sin comparar un grupo control o una condición de referencia.',
        'Un cambio en una proteína nunca puede modificar una característica observable del organismo.',
        'La mitad de una sustancia radiactiva desaparece instantáneamente cada vez que se mide.',
        'Si dos fenómenos ocurren al mismo tiempo, necesariamente uno es la causa del otro.',
        'Una explicación científica no necesita ser contrastada con observaciones o experimentos.'
      ]

    };

    const pool = pools[asignatura] || [];
    if (!pool.length) return [];

    const offsetPorGrado = (Number(gradoActual) - 8) * 11;
    const inicio =
      (indice + offsetPorGrado) % pool.length;

    const resultado = [];
    let posicion = inicio;

    while (resultado.length < 3) {
      const candidato = pool[posicion % pool.length];

      if (
        candidato !== correcta &&
        !resultado.includes(candidato)
      ) {
        resultado.push(candidato);
      }

      posicion++;
    }

    return resultado;
  };


  const generarMatematicas = (gradoActual, cantidad) => {
    const banco = [];

    for (let i = 0; i < cantidad; i++) {
      const n = i + 1;
      let texto, pregunta, correcta, malas;

      if (gradoActual === '8') {
        const tipo = i % 10;

        if (tipo === 0) {
          const precio = 12000 + (n * 1375) % 48000;
          const descuento = [10, 15, 20, 25, 30][n % 5];
          const ahorro = Math.round(precio * descuento / 100);
          const final = precio - ahorro;
          texto = `En una feria escolar se venden materiales para un proyecto de ${n} estudiantes. Un cuaderno tiene un precio de $${precio.toLocaleString('es-CO')} y, durante una jornada especial, recibe un descuento del ${descuento}%. El grupo quiere calcular el valor exacto que debe pagar después de aplicar el descuento, sin confundir el porcentaje ahorrado con el precio final.`;
          pregunta = `¿Cuál es el precio final del cuaderno después de aplicar el descuento del ${descuento}%?`;
          correcta = `$${final.toLocaleString('es-CO')}`;
          malas = [`$${(precio + ahorro).toLocaleString('es-CO')}`, `$${(final + 1000).toLocaleString('es-CO')}`, `$${ahorro.toLocaleString('es-CO')}`];
        } else if (tipo === 1) {
          const total = 24 + (n % 8) * 6;
          const parte = 3 + (n % 5);
          const resultado = total / parte;
          texto = `Un docente organiza ${total} fichas en grupos iguales para una actividad de razonamiento. Cada grupo debe contener exactamente ${parte} fichas. Antes de comenzar, los estudiantes necesitan determinar cuántos grupos completos se pueden formar y justificar la operación utilizada.`;
          pregunta = `¿Cuántos grupos iguales de ${parte} fichas se pueden formar con ${total} fichas?`;
          correcta = String(resultado);
          malas = [String(resultado + 1), String(resultado - 1), String(total - parte)];
        } else if (tipo === 2) {
          const base = 8 + (n % 9);
          const altura = 5 + (n % 7);
          const area = base * altura / 2;
          texto = `Para construir una señal triangular de seguridad, una institución dispone de una lámina cuya forma debe respetar una base de ${base} cm y una altura perpendicular de ${altura} cm. El equipo de estudiantes debe calcular el área antes de decidir cuánta pintura necesita para cubrir toda la superficie.`;
          pregunta = '¿Cuál es el área de la señal triangular?';
          correcta = `${area} cm²`;
          malas = [`${base * altura} cm²`, `${area + base} cm²`, `${area + altura} cm²`];
        } else if (tipo === 3) {
          const x = 2 + (n % 7);
          const y = 5 + (n % 6);
          const resultado = x * x + y;
          texto = `En una actividad de patrones, los estudiantes reciben la regla numérica f(x) = x² + ${y}. La profesora les pide evaluar la expresión cuando x toma el valor ${x}, pero también solicita que expliquen por qué primero debe calcularse la potencia antes de realizar la suma.`;
          pregunta = `¿Cuál es el valor de f(${x})?`;
          correcta = String(resultado);
          malas = [String(x + x + y), String(x * y), String(resultado + x)];
        } else if (tipo === 4) {
          const total = 80 + (n % 9) * 10;
          const porcentaje = [20, 25, 30, 40][n % 4];
          const resultado = total * porcentaje / 100;
          texto = `En una campaña de reciclaje se recolectaron ${total} kg de material. Los organizadores estiman que aproximadamente el ${porcentaje}% corresponde a plástico reutilizable. Necesitan transformar ese porcentaje en una cantidad concreta para registrar el resultado en el informe ambiental de la institución.`;
          pregunta = `¿Cuántos kilogramos corresponden al ${porcentaje}% de ${total} kg?`;
          correcta = `${resultado} kg`;
          malas = [`${total - resultado} kg`, `${resultado + 10} kg`, `${total + resultado} kg`];
        } else if (tipo === 5) {
          const a = 4 + (n % 6);
          const b = 2 + (n % 5);
          const resultado = a + b;
          texto = `Un recorrido escolar está dividido en dos tramos. El primero mide ${a} km y el segundo ${b} km. Aunque parecen distancias sencillas, el grupo debe expresar la distancia total y explicar qué operación permite combinar las dos partes del recorrido.`;
          pregunta = '¿Cuál es la distancia total recorrida?';
          correcta = `${resultado} km`;
          malas = [`${a * b} km`, `${resultado + 2} km`, `${Math.abs(a - b)} km`];
        } else if (tipo === 6) {
          const numero = 15 + (n % 8) * 3;
          const multiplo = 2 + (n % 4);
          const resultado = numero * multiplo;
          texto = `En una competencia de cálculo mental, un estudiante debe multiplicar ${numero} por ${multiplo} sin utilizar calculadora. El profesor recomienda descomponer uno de los factores para comprobar el resultado mediante una segunda estrategia.`;
          pregunta = `¿Cuál es el resultado de ${numero} × ${multiplo}?`;
          correcta = String(resultado);
          malas = [String(resultado + numero), String(resultado - multiplo), String(numero + multiplo)];
        } else if (tipo === 7) {
          const inicio = 6 + (n % 7);
          const diferencia = 3 + (n % 4);
          const termino = inicio + diferencia * 4;
          texto = `Una secuencia numérica comienza en ${inicio} y aumenta siempre en ${diferencia}. Un grupo observa cuatro saltos consecutivos y necesita identificar el término que aparece después de esos cuatro aumentos para comprobar si su patrón está correctamente planteado.`;
          pregunta = '¿Cuál es el término obtenido después de cuatro aumentos?';
          correcta = String(termino);
          malas = [String(termino - diferencia), String(termino + diferencia), String(inicio * diferencia)];
        } else if (tipo === 8) {
          const perimetro = 40 + (n % 8) * 4;
          const lado = perimetro / 4;
          texto = `Una huerta escolar tiene forma cuadrada y su perímetro es de ${perimetro} metros. Para elaborar un plano, los estudiantes necesitan encontrar la longitud de cada lado suponiendo que los cuatro lados tienen exactamente la misma medida.`;
          pregunta = `¿Cuánto mide cada lado de la huerta?`;
          correcta = `${lado} m`;
          malas = [`${perimetro / 2} m`, `${lado + 2} m`, `${perimetro - lado} m`];
        } else {
          const valor = 18 + (n % 9);
          const resultado = valor * 2 + 7;
          texto = `Una máquina de la biblioteca asigna un código a cada caja mediante la regla 2x + 7. Para una caja cuyo valor de entrada es ${valor}, el estudiante debe aplicar la regla en el orden correcto y verificar el resultado antes de registrar el código.`;
          pregunta = `¿Qué código produce la máquina cuando x = ${valor}?`;
          correcta = String(resultado);
          malas = [String(valor + 7), String(valor * 7), String(resultado - 2)];
        }
      } else if (gradoActual === '9') {
        const tipo = i % 10;
        const a = 2 + (n % 8);
        const b = 3 + (n % 7);
        const x = 2 + (n % 6);

        if (tipo === 0) {
          const resultado = a * x + b;
          texto = `Una empresa juvenil modela el costo de transportar materiales mediante la función f(x) = ${a}x + ${b}, donde x representa el número de cajas y el término constante corresponde a un costo fijo. Para una entrega de ${x} cajas, el equipo necesita evaluar el modelo y justificar la sustitución.`;
          pregunta = `¿Cuál es el costo representado por f(${x})?`;
          correcta = String(resultado);
          malas = [String(resultado + a), String(resultado - b), String(a * b + x)];
        } else if (tipo === 1) {
          const area = 36 + (n % 9) * 4;
          const base = 6 + (n % 5);
          const altura = 2 * area / base;
          texto = `En un diseño rectangular, el área debe ser de ${area} cm² y la base mide ${base} cm. El grupo debe despejar la altura utilizando la relación entre área, base y altura, sin asumir que la altura es igual a la base.`;
          pregunta = '¿Cuál debe ser la altura del rectángulo?';
          correcta = `${altura} cm`;
          malas = [`${base + altura} cm`, `${area / 2} cm`, `${base * altura} cm`];
        } else if (tipo === 2) {
          const probTotal = 20 + (n % 5) * 5;
          const favorables = 3 + (n % 6);
          texto = `Una bolsa contiene ${probTotal} tarjetas del mismo tamaño. De ellas, ${favorables} tienen un símbolo determinado. Si se extrae una tarjeta al azar y todas tienen la misma posibilidad de ser seleccionadas, se desea estimar la probabilidad teórica de obtener ese símbolo.`;
          pregunta = '¿Cuál es la probabilidad de obtener una tarjeta con el símbolo indicado?';
          correcta = `${favorables}/${probTotal}`;
          malas = [`${probTotal}/${favorables}`, `${favorables + 1}/${probTotal}`, `1/${favorables}`];
        } else if (tipo === 3) {
          const primero = 7 + (n % 6);
          const segundo = 13 + (n % 7);
          const pendiente = segundo - primero;
          texto = `Dos puntos de una relación lineal pueden representarse como (${1}, ${primero}) y (${2}, ${segundo}). Un estudiante quiere determinar cuánto cambia la variable dependiente cuando la variable independiente aumenta una unidad y utilizar esa información para describir la tendencia de la relación.`;
          pregunta = '¿Cuál es la pendiente de la relación?';
          correcta = String(pendiente);
          malas = [String(segundo + primero), String(primero - segundo), String(pendiente + 1)];
        } else if (tipo === 4) {
          const numero = 12 + (n % 8);
          const porcentaje = 10 + (n % 4) * 5;
          const aumento = numero * porcentaje / 100;
          const final = numero + aumento;
          texto = `El precio de un material pasa de ${numero} unidades monetarias a un valor mayor debido a un incremento del ${porcentaje}%. Para comparar presupuestos, el estudiante debe calcular primero el aumento y después sumarlo al precio inicial.`;
          pregunta = `¿Cuál es el nuevo precio después del aumento del ${porcentaje}%?`;
          correcta = String(final);
          malas = [String(numero - aumento), String(aumento), String(numero + porcentaje)];
        } else if (tipo === 5) {
          const x1 = 2 + (n % 5);
          const x2 = x1 + 4;
          const y1 = 5 + (n % 6);
          const y2 = y1 + 8;
          const pendiente = (y2 - y1) / (x2 - x1);
          texto = `En un plano cartesiano se registran dos puntos de una trayectoria: (${x1}, ${y1}) y (${x2}, ${y2}). Los estudiantes necesitan determinar la razón de cambio vertical respecto al cambio horizontal para interpretar la inclinación de la trayectoria.`;
          pregunta = '¿Cuál es la pendiente entre los dos puntos?';
          correcta = String(pendiente);
          malas = [String(x2 - x1), String(y2 - y1), String((x2 + x1) / 2)];
        } else if (tipo === 6) {
          const n1 = 2 + (n % 5);
          const n2 = 3 + (n % 4);
          const producto = n1 * n2;
          texto = `Una expresión algebraica representa el área de una figura y puede factorizarse como (x + ${n1})(x + ${n2}). El estudiante necesita reconocer el producto de los términos constantes para comprobar una expansión algebraica realizada por su compañero.`;
          pregunta = '¿Cuál es el término constante que aparece al desarrollar la expresión?';
          correcta = String(producto);
          malas = [String(n1 + n2), String(producto + n1), String(n2 - n1)];
        } else if (tipo === 7) {
          const total = 60 + (n % 7) * 10;
          const grupo = 4 + (n % 5);
          const cociente = Math.floor(total / grupo);
          texto = `Un coordinador debe repartir ${total} materiales entre ${grupo} equipos procurando que todos reciban la misma cantidad entera y que el reparto sea lo más equitativo posible. El problema se resuelve mediante una división y requiere interpretar qué representa el cociente.`;
          pregunta = '¿Cuántos materiales recibe cada equipo si se reparten por igual?';
          correcta = String(cociente);
          malas = [String(cociente + 1), String(total - grupo), String(total / 2)];
        } else if (tipo === 8) {
          const media = 12 + (n % 6);
          const valores = [media - 3, media - 1, media + 1, media + 3];
          const suma = valores.reduce((a, b) => a + b, 0) + media;
          const promedio = suma / 5;
          texto = `Un grupo registra cinco mediciones relacionadas con el consumo de agua: ${valores.join(', ')} y ${media}. Antes de presentar el informe, necesitan calcular el promedio aritmético para obtener un valor representativo del conjunto.`;
          pregunta = '¿Cuál es el promedio de las cinco mediciones?';
          correcta = String(promedio);
          malas = [String(media + 1), String(media - 1), String(suma)];
        } else {
          const cateto1 = 3 + (n % 5);
          const cateto2 = 4 + (n % 4);
          const hip = Math.sqrt(cateto1 ** 2 + cateto2 ** 2);
          texto = `Una rampa forma un triángulo rectángulo cuyos catetos miden ${cateto1} m y ${cateto2} m. Para determinar si la rampa cabe en un espacio disponible, se necesita calcular la longitud de la hipotenusa utilizando una relación geométrica apropiada.`;
          pregunta = '¿Qué expresión permite calcular la longitud de la hipotenusa?';
          correcta = `√(${cateto1}² + ${cateto2}²)`;
          malas = [`${cateto1} + ${cateto2}`, `${cateto1}² - ${cateto2}²`, `${cateto1} × ${cateto2}`];
        }
      } else if (gradoActual === '10') {
        const tipo = i % 10;

        if (tipo === 0) {
          const base = 6 + (n % 8);
          const altura = 4 + (n % 7);
          const area = base * altura / 2;
          texto = `En un proyecto de arquitectura escolar se diseña una cubierta triangular con base de ${base} m y altura perpendicular de ${altura} m. El cálculo del área debe realizarse antes de comprar el material, porque una estimación incorrecta modificaría la cantidad de láminas necesarias.`;
          pregunta = '¿Cuál es el área de la cubierta triangular?';
          correcta = `${area} m²`;
          malas = [`${base * altura} m²`, `${area + base} m²`, `${area + altura} m²`];
        } else if (tipo === 1) {
          const a = 2 + (n % 5);
          const b = 3 + (n % 6);
          const c = 4 + (n % 7);
          const x = 2;
          const resultado = a * x * x + b * x + c;
          texto = `Un modelo de producción está dado por P(x) = ${a}x² + ${b}x + ${c}. El valor de x representa el número de turnos de trabajo. Para una jornada de ${x} turnos, el administrador necesita evaluar el polinomio y comparar el resultado con su registro experimental.`;
          pregunta = `¿Cuál es el valor de P(${x})?`;
          correcta = String(resultado);
          malas = [String(a * x + b + c), String(resultado + a), String(a + b + c)];
        } else if (tipo === 2) {
          const capital = 200000 + (n % 6) * 50000;
          const tasa = 0.05 + (n % 4) * 0.01;
          const interes = capital * tasa;
          texto = `Una cooperativa coloca $${capital.toLocaleString('es-CO')} durante un periodo con una tasa simple del ${(tasa * 100).toFixed(0)}%. Para analizar si la inversión es conveniente, el estudiante debe determinar únicamente el interés generado durante el periodo indicado, sin sumarlo todavía al capital.`;
          pregunta = '¿Cuánto interés genera la inversión en ese periodo?';
          correcta = `$${interes.toLocaleString('es-CO')}`;
          malas = [`$${(capital + interes).toLocaleString('es-CO')}`, `$${(capital * tasa * 2).toLocaleString('es-CO')}`, `$${(capital - interes).toLocaleString('es-CO')}`];
        } else if (tipo === 3) {
          const datos = [8 + n % 5, 10 + n % 4, 12 + n % 6, 14 + n % 3, 16 + n % 5];
          const media = datos.reduce((a, b) => a + b, 0) / datos.length;
          texto = `En un laboratorio se obtienen las mediciones ${datos.join(', ')}. Debido a que una sola medición podría no representar todo el experimento, el equipo decide utilizar una medida de tendencia central que permita describir el comportamiento general de los datos.`;
          pregunta = '¿Cuál es la media aritmética de las mediciones?';
          correcta = String(media);
          malas = [String(media + 1), String(media - 1), String(datos[0])];
        } else if (tipo === 4) {
          const frecuencia = 2 + (n % 5);
          const periodo = 3 + (n % 4);
          const velocidad = frecuencia * periodo;
          texto = `Un sistema periódico completa ${frecuencia} ciclos por segundo y cada ciclo está asociado con una distancia de referencia de ${periodo} unidades. El equipo necesita interpretar la relación entre ambas cantidades para estimar una magnitud total por segundo.`;
          pregunta = '¿Cuál es el producto de las dos magnitudes utilizadas en el modelo?';
          correcta = String(velocidad);
          malas = [String(frecuencia + periodo), String(frecuencia ** 2 + periodo), String(velocidad + frecuencia)];
        } else if (tipo === 5) {
          const r = 3 + (n % 6);
          const area = Math.PI * r * r;
          texto = `Una pieza circular de laboratorio tiene un radio de ${r} cm. Para calcular la superficie que debe cubrirse con un material protector, el estudiante utiliza la fórmula del área del círculo y conserva π como una constante para obtener una aproximación posterior.`;
          pregunta = '¿Qué expresión representa correctamente el área de la pieza?';
          correcta = `π(${r})²`;
          malas = [`2π(${r})`, `π(${r})`, `${r}² + π`];
        } else if (tipo === 6) {
          const a = 1 + (n % 5);
          const b = -4 - (n % 4);
          const discriminante = b * b - 4 * a * 1;
          texto = `Una ecuación cuadrática ${a}x² ${b >= 0 ? '+' : ''}${b}x + 1 = 0 aparece al modelar una trayectoria. Antes de resolverla, el estudiante calcula el discriminante D = b² - 4ac para determinar si existen dos soluciones reales, una o ninguna en ese conjunto numérico.`;
          pregunta = `¿Qué valor tiene el discriminante de la ecuación?`;
          correcta = String(discriminante);
          malas = [String(discriminante + 4), String(Math.abs(discriminante)), String(b * b + 4 * a)];
        } else if (tipo === 7) {
          const total = 120 + (n % 7) * 20;
          const propor = [0.15, 0.2, 0.25, 0.3][n % 4];
          const parte = total * propor;
          texto = `En una encuesta de ${total} estudiantes, una proporción del ${(propor * 100).toFixed(0)}% manifestó preferir una determinada estrategia de estudio. El equipo debe convertir el porcentaje en una cantidad de estudiantes para interpretar correctamente el resultado.`;
          pregunta = `¿Cuántos estudiantes representan aproximadamente el ${(propor * 100).toFixed(0)}%?`;
          correcta = String(parte);
          malas = [String(total - parte), String(parte + 10), String(total * propor + 5)];
        } else if (tipo === 8) {
          const a = 3 + (n % 5);
          const b = 2 + (n % 4);
          const c = 5 + (n % 6);
          const resultado = a * b + c;
          texto = `Para optimizar una secuencia de producción se propone la expresión ${a}x + ${b}y + ${c}. En una prueba se utilizan x = ${b} y y = ${a}. El estudiante debe sustituir ambos valores y respetar el orden de las operaciones para obtener el resultado del modelo.`;
          pregunta = '¿Cuál es el valor del modelo para esos datos?';
          correcta = String(resultado);
          malas = [String(a + b + c), String(a * a + b * b + c), String(resultado + c)];
        } else {
          const incremento = 4 + (n % 5);
          const inicial = 20 + (n % 8);
          const termino = inicial + incremento * 6;
          texto = `Una población experimental comienza con ${inicial} unidades y aumenta de manera constante en ${incremento} unidades por periodo. Los investigadores quieren proyectar el valor después de seis periodos, suponiendo que la tendencia lineal se mantiene sin cambios.`;
          pregunta = '¿Cuál sería el valor proyectado después de seis periodos?';
          correcta = String(termino);
          malas = [String(inicial + incremento * 5), String(inicial * incremento), String(termino + incremento)];
        }
      } else {
        const tipo = i % 10;

        if (tipo === 0) {
          const a = 1 + (n % 5);
          const b = -6 - (n % 5);
          const c = 5 + (n % 4);
          const D = b * b - 4 * a * c;
          const naturaleza = D > 0 ? 'dos soluciones reales diferentes' : D === 0 ? 'una solución real repetida' : 'dos soluciones complejas';
          texto = `En un modelo de trayectoria se obtiene la ecuación ${a}x² ${b >= 0 ? '+' : ''}${b}x + ${c} = 0. El estudiante decide analizar el discriminante antes de aplicar la fórmula general, porque esa cantidad permite anticipar la naturaleza de las soluciones y verificar la coherencia del modelo.`;
          pregunta = `Si el discriminante es ${D}, ¿qué tipo de soluciones presenta la ecuación?`;
          correcta = naturaleza;
          malas = ['Una única solución positiva', 'Siempre dos soluciones enteras', 'Ninguna solución en los números complejos'];
        } else if (tipo === 1) {
          const capital = 500000 + (n % 6) * 100000;
          const tasa = 0.04 + (n % 4) * 0.01;
          const tiempo = 2 + (n % 3);
          const interes = capital * tasa * tiempo;
          texto = `Una organización invierte $${capital.toLocaleString('es-CO')} a una tasa de interés simple del ${(tasa * 100).toFixed(0)}% anual durante ${tiempo} años. Para comparar esta inversión con otra alternativa, se necesita calcular el interés acumulado, sin confundirlo con el monto total final.`;
          pregunta = '¿Cuál es el interés simple generado?';
          correcta = `$${interes.toLocaleString('es-CO')}`;
          malas = [`$${(capital + interes).toLocaleString('es-CO')}`, `$${(capital * tasa).toLocaleString('es-CO')}`, `$${(interes + 50000).toLocaleString('es-CO')}`];
        } else if (tipo === 2) {
          const datos = [12 + n % 7, 18 + n % 5, 20 + n % 6, 25 + n % 4, 30 + n % 8, 35 + n % 3];
          const media = datos.reduce((a, b) => a + b, 0) / datos.length;
          texto = `Un grupo analiza ${datos.length} mediciones obtenidas en diferentes momentos: ${datos.join(', ')}. Como los valores no son idénticos, los investigadores calculan una medida de tendencia central que permita comparar este conjunto con el de otro laboratorio.`;
          pregunta = '¿Cuál es la media aritmética de las mediciones?';
          correcta = String(media);
          malas = [String(media + 2), String(media - 2), String(datos[Math.floor(datos.length / 2)])];
        } else if (tipo === 3) {
          const p = 0.2 + (n % 4) * 0.1;
          const q = 0.3 + (n % 3) * 0.1;
          const suma = Math.min(1, p + q);
          texto = `En un estudio, la probabilidad de que ocurra el evento A es ${(p * 100).toFixed(0)}% y la de que ocurra el evento B es ${(q * 100).toFixed(0)}%. Para una situación en la que los eventos son mutuamente excluyentes, se necesita calcular la probabilidad de que ocurra A o B.`;
          pregunta = '¿Cuál es la probabilidad de A o B bajo esa condición?';
          correcta = `${(suma * 100).toFixed(0)}%`;
          malas = [`${(p * q * 100).toFixed(0)}%`, `${(Math.abs(p - q) * 100).toFixed(0)}%`, `${(Math.max(p, q) * 100).toFixed(0)}%`];
        } else if (tipo === 4) {
          const a = 2 + (n % 5);
          const b = 3 + (n % 6);
          const c = 4 + (n % 4);
          const x = 2 + (n % 5);
          const resultado = a * x * x + b * x + c;
          texto = `Un modelo físico simplificado se expresa como f(x) = ${a}x² + ${b}x + ${c}. La variable x representa el tiempo en una escala determinada. Para comparar dos escenarios, el investigador necesita evaluar la función cuando x = ${x}.`;
          pregunta = `¿Cuál es el valor de f(${x})?`;
          correcta = String(resultado);
          malas = [String(a * x + b + c), String(resultado + b), String(a + b + c)];
        } else if (tipo === 5) {
          const distancia = 150 + (n % 7) * 25;
          const tiempo = 3 + (n % 5);
          const velocidad = distancia / tiempo;
          texto = `Un vehículo de prueba recorre ${distancia} km en ${tiempo} horas manteniendo una velocidad promedio constante. Para comparar su desempeño con otro recorrido, el equipo debe relacionar distancia y tiempo mediante la definición de velocidad media.`;
          pregunta = '¿Cuál es la velocidad media del recorrido?';
          correcta = `${velocidad} km/h`;
          malas = [`${distancia + tiempo} km/h`, `${distancia * tiempo} km/h`, `${tiempo / distancia} km/h`];
        } else if (tipo === 6) {
          const r = 2 + (n % 6);
          texto = `Una pieza circular tiene radio ${r} cm y debe ser cubierta completamente con una película protectora. El fabricante necesita una expresión matemática para el área antes de calcular una aproximación decimal, porque el costo del material depende directamente de la superficie cubierta.`;
          pregunta = '¿Qué expresión representa el área de la pieza?';
          correcta = `π(${r})²`;
          malas = [`2π(${r})`, `π(${r}² + 1)`, `${r}π`];
        } else if (tipo === 7) {
          const principal = 8 + (n % 6);
          const tasa = 0.05 + (n % 4) * 0.01;
          const crecimiento = principal * tasa;
          texto = `Una población experimental se modela inicialmente con ${principal} mil individuos y se supone un crecimiento proporcional del ${(tasa * 100).toFixed(0)}% en un periodo. El equipo debe interpretar la tasa como una fracción de la población inicial y no como una cantidad fija independiente del tamaño de la población.`;
          pregunta = '¿Qué cantidad representa el crecimiento correspondiente a ese periodo?';
          correcta = `${crecimiento} mil individuos`;
          malas = [`${principal + crecimiento} mil individuos`, `${principal * (tasa + 1)} mil individuos`, `${principal - crecimiento} mil individuos`];
        } else if (tipo === 8) {
          const logBase = 2;
          const exponente = 3 + (n % 5);
          const valor = 2 ** exponente;
          texto = `En un algoritmo, una cantidad se duplica repetidamente. Después de ${exponente} duplicaciones, el equipo representa el crecimiento mediante una potencia de base 2. Reconocer la estructura exponencial permite calcular el valor sin realizar cada multiplicación por separado.`;
          pregunta = `¿Cuál es el valor de 2^${exponente}?`;
          correcta = String(valor);
          malas = [String(2 * exponente), String(exponente ** 2), String(valor + 2)];
        } else {
          const inicio = 100 + (n % 8) * 20;
          const razon = 1.05 + (n % 3) * 0.05;
          const final = inicio * razon;
          texto = `Una inversión comienza con ${inicio} unidades y cambia por un factor de ${razon.toFixed(2)} cada periodo. El modelo supone crecimiento multiplicativo, por lo que el factor debe aplicarse al valor anterior y no sumarse como si fuera un incremento fijo.`;
          pregunta = '¿Cuál sería el valor después de un periodo?';
          correcta = final.toFixed(2);
          malas = [(inicio + razon).toFixed(2), (inicio * (razon - 1)).toFixed(2), (inicio + inicio * razon).toFixed(2)];
        }
      }

      banco.push(crearPregunta(
        texto,
        pregunta,
        correcta,
        malas,
        i + 1000 + Number(gradoActual) * 100
      ));
    }

    return banco;
  };
  // =========================================================

  const generarLectura = (
    gradoActual,
    cantidad
  ) => {

    const banco = [];

    const temas = [
      'la participación estudiantil en las decisiones de la comunidad',
      'el uso responsable de las redes sociales',
      'la lectura como herramienta para comprender otras perspectivas',
      'la protección de los recursos naturales de una región',
      'la convivencia entre personas con opiniones diferentes',
      'el uso de la tecnología dentro del aula',
      'la manera en que circula la información en internet',
      'la importancia de verificar una afirmación antes de compartirla',
      'la organización de proyectos colectivos',
      'la preservación de la memoria histórica de una comunidad',
      'la influencia de la publicidad en las decisiones de consumo',
      'la relación entre educación y participación ciudadana'
    ];

    for (
      let i = 0;
      i < cantidad;
      i++
    ) {

      const tema =
        temas[i % temas.length];

      const n = i + 1;

      let texto;
      let pregunta;
      let correcta;
      let malas;

      if (gradoActual === '8') {

        texto =
          `En una institución educativa, un grupo de estudiantes decidió investigar ${tema}. Durante varias semanas recogieron opiniones, compararon experiencias y organizaron la información obtenida. Algunas opiniones coincidían, mientras otras mostraban diferencias importantes. Al finalizar el proyecto, los estudiantes concluyeron que escuchar distintas voces les permitió comprender mejor el problema y proponer acciones más realistas.`;

        pregunta =
          '¿Cuál es la idea principal del texto?';

        correcta =
          'Comprender un problema requiere analizar información y escuchar diferentes perspectivas.';

        malas = [
          'La primera opinión que aparece siempre debe aceptarse sin discutir.',
          'Los estudiantes deben evitar recoger información antes de actuar.',
          'Los problemas de una comunidad solamente pueden ser solucionados por una persona.'
        ];

      } else if (gradoActual === '9') {

        texto =
          `Durante el proyecto número ${n}, los estudiantes analizaron ${tema}. Algunas personas defendían una solución inmediata, mientras otras consideraban necesario revisar datos y escuchar a quienes podían verse afectados. Después de discutir las diferentes posiciones, el grupo decidió comparar los argumentos antes de elegir una alternativa, pues comprendieron que una decisión rápida no siempre produce el mejor resultado.`;

        pregunta =
          '¿Qué conclusión puede inferirse de la decisión tomada por el grupo?';

        correcta =
          'Analizar argumentos y evidencias permite tomar decisiones más fundamentadas.';

        malas = [
          'Las decisiones más rápidas siempre son las más correctas.',
          'Escuchar a las personas afectadas impide resolver cualquier problema.',
          'Los datos no son útiles cuando existen opiniones diferentes.'
        ];

      } else if (gradoActual === '10') {

        texto =
          `El autor presenta una reflexión sobre ${tema}. Primero describe una situación cotidiana y posteriormente contrasta dos formas de actuar: aceptar la información sin revisarla o examinar sus razones, consecuencias y fuentes. A través de esta comparación busca mostrar que el pensamiento crítico no consiste simplemente en rechazar las ideas de otras personas, sino en evaluar de manera razonada aquello que se afirma.`;

        pregunta =
          '¿Cuál es la intención comunicativa principal del texto?';

        correcta =
          'Invitar al lector a evaluar críticamente las afirmaciones antes de aceptarlas.';

        malas = [
          'Convencer al lector de que ninguna fuente de información es confiable.',
          'Narrar una aventura sin relación con el análisis de información.',
          'Demostrar que todas las opiniones tienen exactamente el mismo fundamento.'
        ];

      } else {

        texto =
          `El texto examina ${tema} y sostiene que una postura responsable debe considerar tanto los beneficios como las posibles consecuencias de una decisión. El autor reconoce que existen perspectivas distintas, pero explica que no basta con expresar una opinión personal. Para defender una posición sólida es necesario utilizar razones, evidencias y una valoración de los efectos que podría producir una determinada decisión sobre diferentes grupos de personas.`;

        pregunta =
          '¿Cuál de las siguientes valoraciones interpreta mejor la postura del autor?';

        correcta =
          'Una postura sólida debe relacionar argumentos, evidencias y consecuencias antes de defender una decisión.';

        malas = [
          'Una opinión se vuelve verdadera únicamente porque muchas personas la repiten.',
          'Las consecuencias de una decisión no deben considerarse cuando existe una intención positiva.',
          'Presentar evidencias es innecesario cuando una persona expresa con seguridad su opinión.'
        ];
      }

      malas = obtenerDistractoresDiferentes(
        'lectura',
        gradoActual,
        i,
        correcta
      );

      banco.push(

        crearPregunta(
          texto,
          pregunta,
          correcta,
          malas,
          i + 400
        )
      );
    }

    return banco;
  };


  // =========================================================
  // CIENCIAS NATURALES - BANCO VARIADO POR GRADO
  // =========================================================
  const generarNaturales = (gradoActual, cantidad) => {
    const banco = [];

    for (let i = 0; i < cantidad; i++) {
      const n = i + 1;
      const tipo = i % 10;
      let texto, pregunta, correcta, malas;

      if (gradoActual === '8') {
        const situaciones = [
          ['una planta recibe más luz durante la mañana', 'la fotosíntesis permite transformar energía luminosa en energía química almacenada en materia orgánica'],
          ['un cubo de hielo se deja sobre una mesa', 'el aumento de temperatura favorece el cambio de estado de sólido a líquido'],
          ['una cuchara metálica permanece dentro de una bebida caliente', 'el calor se transfiere desde la zona de mayor temperatura hacia la de menor temperatura'],
          ['un estudiante mezcla agua y sal y observa que la sal deja de verse', 'la sal se disuelve y forma una mezcla homogénea'],
          ['un objeto ocupa un espacio determinado dentro de un recipiente', 'la materia tiene volumen y puede desplazar parte del espacio disponible'],
          ['una bicicleta permanece quieta hasta que alguien la empuja', 'una fuerza externa puede cambiar el estado de movimiento de un objeto'],
          ['una planta presenta hojas amarillas después de varios días sin suficiente luz', 'la falta de condiciones adecuadas puede afectar procesos necesarios para el crecimiento'],
          ['un recipiente cerrado contiene agua que se calienta', 'las partículas aumentan su movimiento promedio cuando reciben energía térmica'],
          ['dos organismos presentan características semejantes y diferentes', 'la diversidad puede observarse en las características de los individuos de una población'],
          ['un estudiante separa arena y agua mediante filtración', 'la diferencia en las propiedades físicas permite separar los componentes de la mezcla']
        ];
        const s = situaciones[tipo];
        texto = `En una actividad de ciencias se observa que ${s[0]}. Los estudiantes registran lo ocurrido, comparan la situación con sus conocimientos previos y buscan una explicación que relacione la evidencia observada con un principio científico. El propósito es evitar explicaciones basadas únicamente en la apariencia del fenómeno.`;
        pregunta = '¿Cuál explicación científica interpreta mejor la situación descrita?';
        correcta = s[1];
        malas = [
          'El fenómeno ocurre porque la materia desaparece y aparece nuevamente sin ninguna transformación.',
          'La explicación depende únicamente de la opinión del observador y no puede relacionarse con evidencia.',
          'Todos los fenómenos naturales tienen exactamente la misma causa sin importar las condiciones.'
        ];
      } else if (gradoActual === '9') {
        const situaciones = [
          'una muestra de agua aumenta su temperatura y sus partículas presentan mayor movimiento',
          'una reacción química produce nuevas sustancias con propiedades diferentes a las iniciales',
          'una población de bacterias cambia su proporción de individuos resistentes después de varias generaciones',
          'un circuito se modifica al aumentar la resistencia de uno de sus componentes',
          'una sustancia cambia de estado sin modificar la identidad química de sus partículas',
          'un ecosistema recibe una disminución importante de agua durante varios meses',
          'una célula intercambia sustancias con el medio a través de su membrana',
          'dos objetos con diferente masa reciben la misma fuerza durante un experimento',
          'un estudiante compara la acidez de varias soluciones mediante indicadores',
          'una planta crece de manera diferente bajo distintas condiciones ambientales'
        ];
        texto = `Durante un experimento relacionado con ${situaciones[tipo]}, los estudiantes deben identificar las variables relevantes y explicar el resultado utilizando un modelo científico. Para evitar conclusiones apresuradas, comparan las condiciones iniciales, registran los cambios y relacionan las observaciones con procesos microscópicos o ecológicos.`;
        const preguntas = [
          ['¿Qué ocurre con la energía cinética promedio de las partículas cuando aumenta la temperatura?', 'Aumenta.'],
          ['¿Qué característica permite afirmar que ocurrió una reacción química?', 'La formación de sustancias nuevas con propiedades diferentes.'],
          ['¿Qué proceso puede explicar el cambio en la población bacteriana?', 'La selección natural sobre la variación existente.'],
          ['¿Qué ocurre con la corriente si se modifica la resistencia manteniendo las demás condiciones?', 'Puede cambiar de acuerdo con la relación entre voltaje, resistencia y corriente.'],
          ['¿Qué tipo de cambio es un cambio de estado?', 'Un cambio físico, porque no necesariamente forma una sustancia nueva.'],
          ['¿Qué efecto puede producir una reducción prolongada del agua en un ecosistema?', 'Alterar las poblaciones y las relaciones entre los organismos.'],
          ['¿Qué función cumple la membrana celular?', 'Regular el intercambio de sustancias entre la célula y su entorno.'],
          ['¿Qué variable debe analizarse para comparar el efecto de una misma fuerza sobre objetos diferentes?', 'La masa de los objetos.'],
          ['¿Qué permite un indicador ácido-base?', 'Obtener información aproximada sobre la acidez o basicidad de una solución.'],
          ['¿Por qué es necesario controlar condiciones ambientales en un experimento con plantas?', 'Para relacionar los cambios observados con la variable que realmente se está investigando.']
        ];
        pregunta = preguntas[tipo][0];
        correcta = preguntas[tipo][1];
        malas = [
          'La evidencia experimental no es necesaria cuando el resultado parece evidente.',
          'Las condiciones iniciales no influyen en la interpretación de un experimento.',
          'Todos los cambios observados corresponden necesariamente a una reacción química.'
        ];
      } else if (gradoActual === '10') {
        const casos = [
          'una población microbiana cambia su composición después de varias generaciones bajo presión de un antibiótico',
          'una enzima deja de funcionar correctamente cuando la temperatura supera cierto intervalo',
          'una célula mantiene diferencias de concentración mediante transporte a través de su membrana',
          'una especie presenta variaciones heredables que afectan su supervivencia en un ambiente cambiante',
          'una reacción libera energía y modifica la temperatura del recipiente',
          'un ecosistema pierde una especie que ocupaba una posición importante en la red alimentaria',
          'una mutación modifica la secuencia de ADN de una célula',
          'una sustancia presenta una concentración que cambia después de agregar solvente',
          'una población presenta cambios en la frecuencia de determinados alelos',
          'un investigador compara dos grupos y necesita determinar si una variable realmente produjo el efecto observado'
        ];
        texto = `En una investigación de nivel medio se analiza ${casos[tipo]}. Los datos deben interpretarse relacionando mecanismos biológicos, químicos o físicos con las variables medidas. El investigador evita atribuir el resultado a una sola causa sin revisar primero la evidencia y las condiciones del experimento.`;
        const preguntas = [
          ['¿Qué proceso evolutivo puede modificar la frecuencia de individuos resistentes?', 'La selección natural puede favorecer a los individuos que poseen características ventajosas en ese ambiente.'],
          ['¿Por qué una temperatura excesiva puede afectar una enzima?', 'Puede alterar su estructura y disminuir la capacidad de interacción con su sustrato.'],
          ['¿Qué principio explica el movimiento de sustancias a través de una membrana?', 'El transporte depende de gradientes de concentración y de las propiedades de la membrana.'],
          ['¿Qué importancia tiene que una variación sea heredable?', 'Permite que pueda transmitirse a generaciones posteriores y participar en procesos evolutivos.'],
          ['¿Qué indica una reacción exotérmica?', 'Que durante el proceso se libera energía hacia el entorno.'],
          ['¿Qué puede ocurrir al desaparecer una especie clave?', 'Pueden modificarse varias relaciones dentro de la red trófica.'],
          ['¿Qué efecto puede producir una mutación?', 'Puede modificar la información genética y, dependiendo del caso, afectar una característica o función.'],
          ['¿Qué ocurre al agregar solvente sin cambiar la cantidad de soluto?', 'La concentración disminuye.'],
          ['¿Qué representa la frecuencia de un alelo?', 'La proporción con la que ese alelo aparece dentro de la población.'],
          ['¿Qué fortalece la conclusión de que una variable causó un efecto?', 'Controlar variables relevantes y comparar grupos o condiciones apropiadas.']
        ];
        pregunta = preguntas[tipo][0];
        correcta = preguntas[tipo][1];
        malas = [
          'Una sola observación demuestra siempre una relación causal definitiva.',
          'Los cambios en una población ocurren porque todos los individuos deciden adaptarse.',
          'La información genética no puede relacionarse con características observables.'
        ];
      } else {
        const casos = [
          'una alteración en un gen cambia la estructura de una proteína y afecta una función celular',
          'una población presenta cambios en sus frecuencias alélicas durante varias generaciones',
          'un ecosistema experimenta una perturbación que modifica las relaciones entre especies',
          'un experimento mide una respuesta fisiológica mientras se modifica una variable independiente',
          'una reacción química alcanza un equilibrio dinámico entre reactivos y productos',
          'una célula utiliza energía para transportar sustancias contra un gradiente de concentración',
          'un investigador compara modelos para explicar una tendencia observada en datos experimentales',
          'una mutación aparece en una población y debe evaluarse según su efecto y heredabilidad',
          'una sustancia radiactiva disminuye con el tiempo siguiendo un modelo de desintegración',
          'un fenómeno físico se describe mediante una relación matemática entre varias variables'
        ];
        texto = `Un grupo de investigación de grado 11 estudia ${casos[tipo]}. Para construir una explicación válida, debe conectar los datos observados con mecanismos conocidos, identificar las variables relevantes y distinguir entre una correlación y una relación causal. La conclusión solo se considera sólida cuando las evidencias son compatibles con el modelo propuesto.`;
        const preguntas = [
          ['¿Qué relación describe mejor el caso genético?', 'Un cambio en la información genética puede modificar la proteína producida y, dependiendo del efecto, alterar una función celular.'],
          ['¿Qué puede producir un cambio sostenido en las frecuencias alélicas?', 'Procesos evolutivos como selección, deriva, mutación o flujo génico pueden modificar la composición genética de una población.'],
          ['¿Por qué una perturbación puede afectar varias especies?', 'Porque las especies están conectadas mediante relaciones ecológicas y cambios en una población pueden propagarse por la red.'],
          ['¿Qué elemento fortalece un diseño experimental?', 'Definir una variable independiente, controlar condiciones relevantes y medir una respuesta comparable.'],
          ['¿Qué significa que un sistema químico esté en equilibrio dinámico?', 'Que las velocidades de las reacciones directa e inversa son iguales aunque ambas puedan continuar ocurriendo.'],
          ['¿Por qué el transporte activo requiere energía?', 'Porque permite mover sustancias en contra de un gradiente de concentración o electroquímico.'],
          ['¿Qué diferencia existe entre correlación y causalidad?', 'La correlación indica asociación, mientras la causalidad requiere evidencia adicional que sustente un mecanismo de causa y efecto.'],
          ['¿Por qué la heredabilidad es relevante para una mutación?', 'Porque una característica heredable puede transmitirse y modificar la composición de generaciones futuras.'],
          ['¿Qué representa la vida media de una sustancia radiactiva?', 'El tiempo necesario para que la cantidad de núcleos radiactivos se reduzca aproximadamente a la mitad.'],
          ['¿Qué debe hacer un investigador si los datos contradicen su modelo?', 'Revisar los supuestos del modelo y considerar explicaciones alternativas en lugar de ignorar los datos.']
        ];
        pregunta = preguntas[tipo][0];
        correcta = preguntas[tipo][1];
        malas = [
          'Una correlación siempre demuestra causalidad sin necesidad de más evidencia.',
          'Los modelos científicos nunca deben modificarse aunque los datos los contradigan.',
          'Una variación genética produce necesariamente una ventaja en cualquier ambiente.'
        ];
      }

      malas = obtenerDistractoresDiferentes(
        'naturales',
        gradoActual,
        i,
        correcta
      );

      banco.push(
crearPregunta(
        texto,
        pregunta,
        correcta,
        malas,
        i + 3000 + Number(gradoActual) * 100
      ));
    }

    return banco;
  };
  // =========================================================

  const generarSociales = (
    gradoActual,
    cantidad
  ) => {

    const banco = [];

    const contextos = [
      'una comunidad que debe decidir cómo distribuir un presupuesto limitado',
      'un consejo estudiantil que analiza una propuesta de convivencia',
      'una ciudad que debate la construcción de una obra pública',
      'un grupo ciudadano que solicita información sobre una decisión institucional',
      'una comunidad que busca equilibrar crecimiento económico y protección ambiental',
      'una población que analiza las consecuencias de una decisión de gobierno',
      'un grupo de jóvenes que contrasta información publicada por diferentes medios',
      'una organización comunitaria que propone mecanismos de participación',
      'un municipio que necesita priorizar recursos para atender varias necesidades',
      'una institución que debe garantizar derechos a personas con diferentes condiciones'
    ];

    for (
      let i = 0;
      i < cantidad;
      i++
    ) {

      const contexto =
        contextos[i % contextos.length];

      const n = i + 1;

      let texto;
      let pregunta;
      let correcta;
      let malas;

      if (gradoActual === '8') {

        texto =
          `En ${contexto}, varias personas presentan opiniones diferentes. Antes de tomar una decisión, se propone escuchar las razones de cada grupo, revisar la información disponible y buscar una alternativa que respete las reglas acordadas. El objetivo es encontrar una solución que permita la participación de los diferentes integrantes de la comunidad.`;

        pregunta =
          '¿Qué principio ciudadano se evidencia principalmente?';

        correcta =
          'La participación y el diálogo democrático.';

        malas = [
          'La imposición de una única opinión.',
          'La eliminación del debate.',
          'La concentración de todas las decisiones en una sola persona.'
        ];

      } else if (gradoActual === '9') {

        texto =
          `En el caso número ${n}, ${contexto}. Algunas personas apoyan una propuesta porque consideran que generará beneficios, mientras otras advierten posibles efectos negativos. La comunidad decide revisar evidencias y escuchar a los grupos afectados antes de votar. De esta manera intenta construir una decisión que tenga en cuenta diferentes intereses.`;

        pregunta =
          '¿Por qué esta decisión fortalece una práctica democrática?';

        correcta =
          'Porque combina participación, análisis de información y consideración de diferentes intereses.';

        malas = [
          'Porque evita que existan opiniones diferentes.',
          'Porque permite decidir sin consultar a la comunidad.',
          'Porque reemplaza las normas por decisiones personales.'
        ];

      } else if (gradoActual === '10') {

        texto =
          `Un análisis sobre ${contexto} muestra que una decisión pública puede beneficiar a ciertos sectores y afectar a otros. Por ello, los ciudadanos solicitan información, comparan argumentos y preguntan qué instituciones tienen la responsabilidad de actuar. El ejercicio busca comprender la relación entre poder, derechos, instituciones y participación ciudadana.`;

        pregunta =
          '¿Cuál análisis resulta más adecuado para comprender el conflicto?';

        correcta =
          'Es necesario considerar los intereses involucrados, las normas aplicables, las instituciones responsables y las posibles consecuencias.';

        malas = [
          'Solo debe considerarse la opinión del grupo con mayor poder económico.',
          'Las instituciones no tienen ninguna responsabilidad frente a los derechos.',
          'Una decisión pública no necesita justificarse si fue tomada rápidamente.'
        ];

      } else {

        texto =
          `En ${contexto}, se presenta un conflicto entre diferentes intereses colectivos. Los participantes deben determinar qué derechos están involucrados, qué información es confiable, qué instituciones poseen competencias para intervenir y qué consecuencias podría tener cada alternativa. La discusión exige distinguir entre una opinión personal y un argumento sustentado mediante evidencias.`;

        pregunta =
          '¿Qué criterio permite evaluar mejor las propuestas presentadas?';

        correcta =
          'Contrastar argumentos y evidencias con los derechos, las normas, las competencias institucionales y las consecuencias de cada alternativa.';

        malas = [
          'Elegir la propuesta que tenga más apoyo sin revisar sus consecuencias.',
          'Aceptar como verdadera cualquier afirmación publicada en redes sociales.',
          'Considerar únicamente el beneficio inmediato para un grupo particular.'
        ];
      }

      malas = obtenerDistractoresDiferentes(
        'sociales',
        gradoActual,
        i,
        correcta
      );

      banco.push(

        crearPregunta(
          texto,
          pregunta,
          correcta,
          malas,
          i + 600
        )
      );
    }

    return banco;
  };


  // =========================================================
  // INGLÉS - BANCO VARIADO POR GRADO
  // =========================================================
  const generarIngles = (gradoActual, cantidad) => {
    const banco = [];

    const nombres = ['Laura', 'Tom', 'Sofia', 'Daniel', 'Emma', 'Lucas', 'Maria', 'David', 'Ana', 'James'];
    const temas = [
      'a school recycling project',
      'a science examination',
      'a reading club',
      'a community park activity',
      'a digital literacy project',
      'a healthy daily routine',
      'a technology workshop',
      'a presentation about local culture',
      'a school fundraising activity',
      'a community service project'
    ];

    for (let i = 0; i < cantidad; i++) {
      const n = i + 1;
      const tipo = i % 10;
      const nombre = nombres[i % nombres.length];
      const tema = temas[tipo];
      let texto, pregunta, correcta, malas;

      if (gradoActual === '8') {
        const acciones = [
          ['writes a short list of the tasks completed', 'What does the student write before leaving school?'],
          ['checks the materials needed for the next day', 'What does the student check before going home?'],
          ['talks to a classmate about the next activity', 'Who does the student talk to before finishing the activity?'],
          ['puts the project materials in a safe place', 'Where does the student put the materials?'],
          ['reads the instructions one more time', 'What does the student read again?'],
          ['takes notes about the most important ideas', 'What does the student write in the notes?'],
          ['organizes the information in a notebook', 'Where does the student organize the information?'],
          ['asks the teacher one final question', 'Who does the student ask a question?'],
          ['reviews the work before submitting it', 'What does the student do before submitting the work?'],
          ['plans the first task for the following day', 'What does the student plan for the next day?']
        ];
        const a = acciones[tipo];
        texto = `${nombre} is working on ${tema}. During the afternoon, the student spends time reading instructions, completing small tasks and checking the progress of the project. The teacher has explained that good organization can make school work easier. Before finishing the day, ${nombre} ${a[0]}. This routine helps the student remember what has already been done and what still needs attention.`;
        pregunta = a[1];
        const respuestas = [
          'A short list of the tasks completed.',
          'The materials needed for the next day.',
          'A classmate about the next activity.',
          'The project materials in a safe place.',
          'The instructions one more time.',
          'Notes about the most important ideas.',
          'The information in a notebook.',
          'The teacher.',
          'The work before submitting it.',
          'The first task for the following day.'
        ];
        correcta = respuestas[tipo];
        malas = ['The student ignores the project completely.', 'The student throws the materials away.', 'The student leaves school without doing any preparation.'];
      } else if (gradoActual === '9') {
        const situations = [
          'the student first wanted to finish quickly, but then realized that checking the information reduced mistakes',
          'the group had different opinions, so they decided to listen to everyone before choosing a solution',
          'two websites gave different information, so the student compared their authors and evidence',
          'the project became difficult because the tasks were not organized, so the team created a schedule',
          'a classmate misunderstood the instructions, so the student explained the most important steps',
          'the group had limited materials, so they decided to distribute them according to the needs of the activity',
          'the student found a useful source but checked its date before using it in the presentation',
          'the team received feedback and changed one part of the project before presenting it',
          'the student noticed that a plan was taking too long and decided to prioritize the essential tasks',
          'the group wanted a better result and agreed to review the final work together'
        ];
        texto = `${nombre} is participating in ${tema}. At the beginning of the activity, ${situations[tipo]}. The experience teaches the students that solving a problem is not only about finishing quickly. It is also about communicating clearly, checking information and making decisions that fit the situation.`;
        const qs = [
          ['Why did the student change the way the work was done?', 'Because checking the information helped reduce mistakes.'],
          ['Why did the group listen to different opinions?', 'Because they wanted to choose a solution after considering different ideas.'],
          ['What did the student do when the websites disagreed?', 'The student compared the authors and the evidence.'],
          ['Why did the team create a schedule?', 'Because the tasks were not organized and the project became difficult.'],
          ['Why did the student explain the instructions?', 'Because a classmate had misunderstood the important steps.'],
          ['How did the group use the limited materials?', 'They distributed them according to the needs of the activity.'],
          ['Why did the student check the date of the source?', 'To make sure the information was appropriate for the presentation.'],
          ['What did the team do after receiving feedback?', 'They changed part of the project before presenting it.'],
          ['What did the student do when the plan took too long?', 'The student prioritized the essential tasks.'],
          ['Why did the group review the final work?', 'Because they wanted to improve the result before presenting it.']
        ];
        pregunta, correcta = qs[tipo];
        malas = [
          'Because the students decided that planning was unnecessary.',
          'Because they wanted to avoid checking any information.',
          'Because the project could only be completed without communication.'
        ];
      } else if (gradoActual === '10') {
        const situations = [
          'a popular online claim is repeated by many accounts but has no clear evidence',
          'two sources describe the same event but emphasize different aspects',
          'a school campaign uses statistics that need to be checked before being presented',
          'a student receives a message that sounds convincing but contains no original source',
          'a research group must decide which evidence is relevant to its conclusion',
          'a website provides information but does not clearly identify its authors',
          'a class discussion includes several claims that should be separated from opinions',
          'a project uses data collected under different conditions',
          'a student finds a graph that may create a misleading impression',
          'a team must explain why one source is stronger than another'
        ];
        texto = `${nombre} is working on ${tema}. During the project, ${situations[tipo]}. Instead of accepting the information immediately, the student examines the context, checks the source and compares the evidence with information from another reliable place. The goal is to make a conclusion that can be explained and defended, rather than simply repeated.`;
        const qs = [
          ['What is the main lesson of the situation?', 'Reliable information should be evaluated instead of accepted only because it is popular.'],
          ['Why might the two sources emphasize different aspects?', 'They may have different purposes, perspectives or selections of information.'],
          ['Why should the statistics be checked?', 'Because numbers need context and reliable sources before they can support a conclusion.'],
          ['Why is the original source important?', 'It can help determine where the claim came from and whether it is supported.'],
          ['What makes evidence relevant?', 'It should directly support the claim or conclusion being examined.'],
          ['What problem exists when authors are unclear?', 'It becomes harder to evaluate the reliability and purpose of the information.'],
          ['Why should claims be separated from opinions?', 'Because a claim may require evidence while an opinion expresses a personal judgment.'],
          ['Why do different conditions matter when comparing data?', 'Because they can affect the results and make a direct comparison misleading.'],
          ['How can a graph be misleading?', 'By presenting scales or selections that exaggerate or hide differences.'],
          ['What makes one source stronger than another?', 'The quality, relevance and verifiability of the evidence it provides.']
        ];
        pregunta, correcta = qs[tipo];
        malas = [
          'The first result on the internet is always the most reliable.',
          'Information becomes true when many people repeat it.',
          'Evidence is unnecessary when a statement sounds convincing.'
        ];
      } else {
        const situations = [
          'a widely shared claim is not supported by the original evidence',
          'two research reports reach different conclusions from similar data',
          'a policy proposal has clear benefits but also possible effects on vulnerable groups',
          'a source uses strong language but provides little evidence',
          'a scientific graph supports one interpretation but does not prove causation',
          'a public statement combines accurate facts with an unsupported conclusion',
          'a student must distinguish correlation from causation in a research project',
          'a team has to evaluate whether evidence is sufficient for a strong conclusion',
          'a source is reliable for one topic but outside its area of expertise for another',
          'a conclusion needs to be revised after new evidence appears'
        ];
        texto = `${nombre} is preparing an advanced project about ${tema}. During the research process, the student discovers that ${situations[tipo]}. Rather than choosing the interpretation that is easiest to defend, ${nombre} examines the source, the quality of the evidence, the assumptions behind the claim and the possible alternative explanations. The final conclusion is presented with the limits of the available information clearly stated.`;
        const qs = [
          ['Which statement best describes the student’s reasoning?', 'The student evaluates evidence and considers alternative explanations before reaching a conclusion.'],
          ['Why can two reports reach different conclusions?', 'They may use different methods, assumptions, samples or interpretations of the data.'],
          ['Why should vulnerable groups be considered?', 'Because a policy can distribute benefits and costs differently among groups.'],
          ['What is a weakness of strong language without evidence?', 'Confidence in wording does not provide support for the claim.'],
          ['Why does the graph not necessarily prove causation?', 'An observed relationship can exist without demonstrating a cause-and-effect mechanism.'],
          ['Why should facts be separated from the conclusion?', 'Because accurate facts do not automatically prove the interpretation built from them.'],
          ['What is the difference between correlation and causation?', 'Correlation indicates an association, while causation requires evidence of a cause-and-effect relationship.'],
          ['When is evidence sufficient for a strong conclusion?', 'When it is relevant, reliable, adequately supported and consistent with the conclusion.'],
          ['Why does expertise matter when evaluating a source?', 'A source may be reliable in one field but not necessarily authoritative outside its area.'],
          ['What should happen when new evidence conflicts with the conclusion?', 'The conclusion should be reconsidered and possibly revised.']
        ];
        pregunta, correcta = qs[tipo];
        malas = [
          'The most popular interpretation should always be accepted.',
          'A confident statement does not need evidence.',
          'New evidence should be ignored if the original conclusion was already published.'
        ];
      }

      banco.push(crearPregunta(
        texto,
        pregunta,
        correcta,
        malas,
        i + 5000 + Number(gradoActual) * 100
      ));
    }

    return banco;
  };
  // =========================================================

  const generarBanco = (
    materiaActual,
    gradoActual,
    cantidad
  ) => {

    if (materiaActual === 'matematicas') {
      return generarMatematicas(
        gradoActual,
        cantidad
      );
    }

    if (materiaActual === 'lectura') {
      return generarLectura(
        gradoActual,
        cantidad
      );
    }

    if (materiaActual === 'naturales') {
      return generarNaturales(
        gradoActual,
        cantidad
      );
    }

    if (materiaActual === 'sociales') {
      return generarSociales(
        gradoActual,
        cantidad
      );
    }

    if (materiaActual === 'ingles') {
      return generarIngles(
        gradoActual,
        cantidad
      );
    }

    return [];
  };

  // =========================================================
  // CARGAR CONFIGURACIÓN
  // =========================================================

  useEffect(() => {

    const gradoGuardado =
      localStorage.getItem(
        'grado_simulacro'
      );

    const materiaGuardada =
      localStorage.getItem(
        'materia_simulacro'
      );

    if (
      !gradoGuardado ||
      !materiaGuardada
    ) {

      alert(
        'No hay un simulacro seleccionado.'
      );

      if (onVolverInicio) {
        onVolverInicio();
      } else {
        window.location.href = '/';
      }

      return;
    }

    const cantidad =
      cantidades[
        gradoGuardado
      ]?.[materiaGuardada] || 0;

    setGrado(
      String(gradoGuardado)
    );

    setMateria(
      String(materiaGuardada)
    );

    setCantidadPreguntas(
      cantidad
    );

    localStorage.setItem(
      'cantidad_preguntas',
      String(cantidad)
    );

    localStorage.setItem(
      'cantidad_preguntas_simulacro',
      String(cantidad)
    );

    // IMPORTANTE:
    // comenzar siempre desde la primera pregunta
    setPreguntaActual(0);

    setRespuestas({});

    setCargando(false);

  }, [onVolverInicio]);

  // =========================================================
  // CREAR LISTA DE PREGUNTAS
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

  }, [
    grado,
    materia,
    cantidadPreguntas
  ]);

  // =========================================================
  // SELECCIONAR RESPUESTA
  // =========================================================

  const seleccionarRespuesta = (
    indice
  ) => {

    setRespuestas(
      (anteriores) => ({
        ...anteriores,
        [preguntaActual]: indice
      })
    );
  };

  // =========================================================
  // SIGUIENTE PREGUNTA
  // =========================================================

  const siguiente = () => {

    // No permitir avanzar sin responder
    if (
      respuestas[preguntaActual] ===
      undefined
    ) {

      alert(
        'Debes seleccionar una respuesta antes de continuar.'
      );

      return;
    }

    // Comprobar si todavía existen preguntas
    const siguientePregunta =
      preguntaActual + 1;

    if (
      siguientePregunta <
      listaPreguntas.length
    ) {

      // AVANZAR
      setPreguntaActual(
        siguientePregunta
      );

      // Llevar al comienzo de la pantalla
      setTimeout(() => {

        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

      }, 50);

    } else {

      // ÚLTIMA PREGUNTA
      finalizarPrueba();

    }
  };

  // =========================================================
  // TEMA PARA RETROALIMENTACIÓN
  // =========================================================

  const detectarTema = (preguntaActual) => {
    const texto = `${preguntaActual?.texto || ''} ${preguntaActual?.pregunta || ''}`.toLowerCase();

    const temasPorMateria = {
      matematicas: [
        ['porcentaje', 'Porcentajes'],
        ['fracción', 'Fracciones'], ['fraccion', 'Fracciones'],
        ['ecuación', 'Ecuaciones'], ['ecuacion', 'Ecuaciones'],
        ['función', 'Funciones'], ['funcion', 'Funciones'],
        ['perímetro', 'Geometría y perímetro'], ['perimetro', 'Geometría y perímetro'],
        ['área', 'Geometría y área'], ['area', 'Geometría y área'],
        ['probabilidad', 'Probabilidad'], ['promedio', 'Estadística y promedios'],
        ['secuencia', 'Patrones y secuencias'], ['multiplicar', 'Operaciones']
      ],
      lectura: [
        ['argumento', 'Argumentación'], ['idea principal', 'Idea principal'],
        ['evidencia', 'Análisis de evidencia'], ['conclusión', 'Conclusiones e inferencias'],
        ['inferencia', 'Inferencias']
      ],
      naturales: [
        ['ecosistema', 'Ecosistemas'], ['energía', 'Energía'], ['energia', 'Energía'],
        ['célula', 'Célula y sistemas vivos'], ['celula', 'Célula y sistemas vivos'],
        ['fuerza', 'Fuerza y movimiento'], ['movimiento', 'Fuerza y movimiento'],
        ['química', 'Química'], ['quimica', 'Química'], ['ambiente', 'Medio ambiente']
      ],
      sociales: [
        ['democracia', 'Democracia y ciudadanía'], ['constitución', 'Constitución y ciudadanía'],
        ['constitucion', 'Constitución y ciudadanía'], ['historia', 'Historia'],
        ['economía', 'Economía'], ['economia', 'Economía'], ['territorio', 'Territorio y geografía'],
        ['derecho', 'Derechos y ciudadanía']
      ],
      ingles: [
        ['grammar', 'Gramática'], ['verb', 'Gramática y verbos'], ['tense', 'Tiempos verbales'],
        ['vocabulary', 'Vocabulario'], ['word', 'Vocabulario'], ['reading', 'Comprensión de lectura en inglés'],
        ['meaning', 'Comprensión de significado'], ['conversation', 'Comprensión comunicativa']
      ]
    };

    const encontrado = (temasPorMateria[materia] || []).find(
      ([clave]) => texto.includes(clave)
    );

    return encontrado
      ? encontrado[1]
      : materia === 'lectura'
      ? 'Comprensión y análisis de textos'
      : materia === 'matematicas'
      ? 'Razonamiento matemático'
      : materia === 'naturales'
      ? 'Interpretación de fenómenos científicos'
      : materia === 'sociales'
      ? 'Interpretación de contextos sociales'
      : 'Comprensión y uso del inglés';
  };


  // =========================================================
  // FINALIZAR
  // =========================================================

  const finalizarPrueba = () => {

    const respondidas =
      Object.keys(
        respuestas
      ).length;

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
      (
        pregunta,
        indice
      ) => {

        if (
          respuestas[indice] ===
          pregunta.correcta
        ) {

          correctas++;
        }

      }
    );

    const porcentaje =
      listaPreguntas.length > 0
        ? Math.round(
            (
              correctas /
              listaPreguntas.length
            ) * 100
          )
        : 0;


    // =====================================================
    // GUARDAR RESULTADO DETALLADO
    // Reemplaza el resultado anterior de esta materia
    // dentro del mismo grado.
    // =====================================================

    let resultadosDetallados = {};

    try {
      resultadosDetallados = JSON.parse(
        localStorage.getItem('resultados_detallados') || '{}'
      );
    } catch (error) {
      console.error(
        'No se pudieron leer los resultados detallados:',
        error
      );
    }

    if (!resultadosDetallados[grado]) {
      resultadosDetallados[grado] = {};
    }

    resultadosDetallados[grado][materia] = {
      porcentaje,
      correctas,
      total: listaPreguntas.length,
      fecha: new Date().toISOString(),
      preguntas: listaPreguntas.map(
        (pregunta, indice) => ({
          numero: indice + 1,
          texto: pregunta.texto,
          pregunta: pregunta.pregunta,
          opciones: pregunta.opciones,
          respuestaSeleccionada: respuestas[indice],
          respuestaCorrecta: pregunta.correcta,
          respuestaSeleccionadaTexto:
            pregunta.opciones[respuestas[indice]],
          respuestaCorrectaTexto:
            pregunta.opciones[pregunta.correcta],
          correcta:
            respuestas[indice] === pregunta.correcta,
          tema: detectarTema(pregunta)
        })
      )
    };

    localStorage.setItem(
      'resultados_detallados',
      JSON.stringify(resultadosDetallados)
    );


    // =====================================================
    // GUARDAR RESULTADO
    // =====================================================

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
      String(
        listaPreguntas.length
      )
    );

    localStorage.setItem(
      'ultimo_grado',
      grado
    );

    localStorage.setItem(
      'ultimo_materia',
      materia
    );

    // Datos utilizados por Ranking
    const puntaje500 =
      Math.round(
        (porcentaje / 100) * 500
      );

    localStorage.setItem(
      'puntaje_usuario',
      String(puntaje500)
    );

    localStorage.setItem(
      'grado_simulacro',
      grado
    );

    
    localStorage.setItem(
      'materia_simulacro',
      materia
    );

localStorage.setItem(
      'simulacro_finalizado',
      'true'
    );

    // =====================================================
    // TOTAL SIMULACROS
    // =====================================================

    const anteriores =
      Number(
        localStorage.getItem(
          'total_simulacros'
        )
      ) || 0;

    localStorage.setItem(
      'total_simulacros',
      String(
        anteriores + 1
      )
    );

    // =====================================================
    // PROMEDIO
    // =====================================================

    localStorage.setItem(
      'mejora_promedio',
      String(porcentaje)
    );

    // =====================================================
    // PROGRESO POR MATERIA
    // =====================================================

    // =====================================================
    // PROGRESO SEPARADO POR GRADO
    // =====================================================

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
        'No se pudo leer el progreso por grado:',
        error
      );
    }

    if (!progresoPorGrado[grado]) {
      progresoPorGrado[grado] = {
        matematicas: 0,
        lectura: 0,
        naturales: 0,
        sociales: 0,
        ingles: 0
      };
    }

    // Solo actualiza la materia del grado que acaba de hacer.
    progresoPorGrado[grado][materia] = porcentaje;

    localStorage.setItem(
      'progreso_por_grado',
      JSON.stringify(progresoPorGrado)
    );

    // El promedio se calcula únicamente con las materias
    // que ya tienen resultado dentro de ESTE grado.
    const materiasDelGrado =
      Object.values(progresoPorGrado[grado]).filter(
        (valor) => Number(valor) > 0
      );

    const promedioDelGrado =
      materiasDelGrado.length > 0
        ? Math.round(
            materiasDelGrado.reduce(
              (total, valor) => total + Number(valor),
              0
            ) / materiasDelGrado.length
          )
        : 0;

    localStorage.setItem(
      'mejora_promedio',
      String(promedioDelGrado)
    );

    localStorage.setItem(
      'ultimo_grado',
      grado
    );

    localStorage.setItem(
      'ultimo_materia',
      materia
    );

    window.dispatchEvent(
      new Event('progresoActualizado')
    );

    alert(
      `¡Simulacro terminado! 🎉

Aciertos: ${correctas} de ${listaPreguntas.length}

Resultado: ${porcentaje}%

Puntaje: ${puntaje500} / 500`
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
    listaPreguntas[
      preguntaActual
    ];

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
      (
        (preguntaActual + 1) /
        listaPreguntas.length
      ) * 100
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
              margin: '6px 0 0',
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