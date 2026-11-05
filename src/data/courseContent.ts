export interface GlossaryItem {
  term: string;
  category: 'Topología' | 'Variables' | 'Leyes y Métodos' | 'Fuentes de Corriente';
  definition: string;
  formulaOrRule: string;
}

export interface QuizQuestion {
  id: number;
  type: 'single' | 'multiple' | 'matching';
  category: 'Análisis Nodal' | 'Análisis de Mallas' | 'Supernodo' | 'Supermalla';
  question: string;
  hint?: string;
  options?: { id: string; text: string }[];
  correctAnswerIds?: string[];
  matchingPairs?: {
    leftId: string;
    leftText: string;
    rightId: string;
    rightText: string;
  }[];
  explanation: string;
}

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: 'Lazo (Loop)',
    category: 'Topología',
    definition: 'Cualquier trayectoria cerrada en un circuito eléctrico que comienza y termina en el mismo nodo sin pasar por ningún nodo intermedio más de una vez.',
    formulaOrRule: 'Todo contorno cerrado (incluyendo la periferia externa completa) es un lazo.'
  },
  {
    term: 'Malla (Mesh)',
    category: 'Topología',
    definition: 'Tipo especial de lazo que no contiene ningún otro lazo en su interior. Es la trayectoria cerrada más simple en una región de un circuito planar.',
    formulaOrRule: 'Toda malla es un lazo, pero no todo lazo es una malla.'
  },
  {
    term: 'Corriente de Malla (i₁, i₂)',
    category: 'Variables',
    definition: 'Corriente ficticia o conceptual asignada a cada malla que circula únicamente por los elementos del perímetro de dicha malla (por convención en sentido horario).',
    formulaOrRule: 'Facilita la formulación sistemática de ecuaciones mediante LVK.'
  },
  {
    term: 'Corriente de Rama (I₁, I₂, I₃)',
    category: 'Variables',
    definition: 'Corriente física real que circula por una rama específica del circuito y que puede medirse directamente con un amperímetro.',
    formulaOrRule: 'Rama externa: I = i_malla · Rama compartida: I_rama = i₁ - i₂'
  },
  {
    term: 'Caso 1: Fuente de Corriente en una Sola Malla',
    category: 'Fuentes de Corriente',
    definition: 'Ocurre cuando una fuente de corriente pertenece exclusivamente a una malla exterior y no es compartida con otra malla adyacente.',
    formulaOrRule: 'i_k = +I_s (si coincide con el sentido horario) o i_k = -I_s (si se opone).'
  },
  {
    term: 'Supermalla (Superlazo)',
    category: 'Fuentes de Corriente',
    definition: 'Trayectoria cerrada que resulta de rodear la periferia de dos (o más) mallas adyacentes que comparten una fuente de corriente, excluyendo la rama de la fuente y cualquier elemento en serie con ella.',
    formulaOrRule: 'Requiere 1 ecuación de LVK en el superlazo + 1 ecuación de restricción (LCK) en la rama compartida.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    type: 'single',
    category: 'Análisis Nodal',
    question: 'En el método de análisis nodal, las variables principales a calcular son las corrientes de malla.',
    options: [
      { id: 'a', text: 'Verdadero.' },
      { id: 'b', text: 'Falso.' }
    ],
    correctAnswerIds: ['b'],
    explanation: 'Es Falso. En el método de análisis nodal se aplica la LCK para determinar las tensiones de nodo desconocidas como variables principales, mientras que en el análisis de mallas se aplica la LVK para hallar las corrientes de malla.'
  },
  {
    id: 2,
    type: 'single',
    category: 'Análisis Nodal',
    question: 'Para un circuito con (N) nodos, si elegimos uno como referencia, necesitamos plantear (N - 1) ecuaciones para resolver el circuito.',
    options: [
      { id: 'a', text: 'Verdadero.' },
      { id: 'b', text: 'Falso.' }
    ],
    correctAnswerIds: ['a'],
    explanation: 'Es Verdadero. Al definir un nodo de referencia (potencial de 0 V), quedan (N - 1) nodos de no referencia, por lo que se plantean (N - 1) ecuaciones independientes.'
  },
  {
    id: 3,
    type: 'single',
    category: 'Supernodo',
    question: 'Un supernodo se forma cuando existe una fuente de corriente conectada entre dos nodos de no referencia.',
    options: [
      { id: 'a', text: 'Verdadero.' },
      { id: 'b', text: 'Falso.' }
    ],
    correctAnswerIds: ['b'],
    explanation: 'Es Falso. Un supernodo se forma cuando existe una fuente de tensión (voltaje) conectada entre dos nodos de no referencia. Cuando hay una fuente de corriente entre dos mallas, lo que se forma en el análisis de lazos es una supermalla.'
  },
  {
    id: 4,
    type: 'single',
    category: 'Análisis de Mallas',
    question: 'En el análisis de mallas, si una fuente de corriente pertenece a una sola malla, el valor de la corriente de dicha malla queda fijado inmediatamente.',
    options: [
      { id: 'a', text: 'Verdadero.' },
      { id: 'b', text: 'Falso.' }
    ],
    correctAnswerIds: ['a'],
    explanation: 'Es Verdadero (Caso 1). Cuando una fuente de corriente está únicamente en una malla y no es rama común, impone directamente la corriente de esa malla (i_k = ±I_s según su sentido), sin necesidad de escribir ecuación de LVK para esa malla.'
  },
  {
    id: 5,
    type: 'single',
    category: 'Análisis Nodal',
    question: '¿Cuál es la convención estándar para expresar la corriente que fluye a través de un resistor (R) conectado entre un nodo con voltaje (v₁) y otro con voltaje (v₂) (asumiendo flujo de 1 a 2)?',
    options: [
      { id: 'a', text: 'i = (v₁ + v₂) / R' },
      { id: 'b', text: 'i = (v₂ - v₁) / R' },
      { id: 'c', text: 'i = (v₁ - v₂) / R' },
      { id: 'd', text: 'i = R / (v₁ - v₂)' }
    ],
    correctAnswerIds: ['c'],
    explanation: 'Por la ley de Ohm y la convención pasiva de signos, la corriente fluye del potencial mayor al menor en el sentido asumido (de 1 hacia 2), por lo que i = (v₁ - v₂) / R.'
  },
  {
    id: 6,
    type: 'single',
    category: 'Análisis Nodal',
    question: '¿Qué ley fundamental se aplica para generar las ecuaciones en el método de análisis nodal?',
    options: [
      { id: 'a', text: 'Ley de Corriente de Kirchhoff (LCK).' },
      { id: 'b', text: 'Ley de Voltaje de Kirchhoff (LVK).' },
      { id: 'c', text: 'Ley de Ohm exclusivamente.' },
      { id: 'd', text: 'Principio de conservación de la energía mecánica.' }
    ],
    correctAnswerIds: ['a'],
    explanation: 'El análisis nodal se fundamenta en la Ley de Corrientes de Kirchhoff (LCK) aplicada en cada nodo de no referencia, expresando las corrientes en función de las tensiones nodales mediante la ley de Ohm.'
  },
  {
    id: 7,
    type: 'single',
    category: 'Supernodo',
    question: 'En el contexto de un supernodo formado por una fuente de (10 V) entre el nodo A (positivo) y el nodo B (negativo), ¿cuál es la ecuación de restricción correcta?',
    options: [
      { id: 'a', text: 'v_a = v_b' },
      { id: 'b', text: 'v_b - v_a = 10' },
      { id: 'c', text: 'v_a + v_b = 10' },
      { id: 'd', text: 'v_a - v_b = 10' }
    ],
    correctAnswerIds: ['d'],
    explanation: 'Dado que el terminal positivo de la fuente de 10 V está conectado al nodo A y el terminal negativo al nodo B, la diferencia de potencial impuesta es v_a - v_b = 10.'
  },
  {
    id: 8,
    type: 'single',
    category: 'Supermalla',
    question: '¿Cuál es la definición correcta de una "supermalla"?',
    options: [
      { id: 'a', text: 'Una malla que contiene únicamente resistencias en serie.' },
      { id: 'b', text: 'La trayectoria que resulta de rodear dos mallas que comparten una fuente de corriente.' },
      { id: 'c', text: 'El conjunto de todas las mallas del circuito.' },
      { id: 'd', text: 'Una malla equivalente obtenida al simplificar resistencias en paralelo.' }
    ],
    correctAnswerIds: ['b'],
    explanation: 'Una supermalla (o superlazo) es la trayectoria cerrada que resulta de rodear la periferia de dos o más mallas adyacentes que comparten una fuente de corriente, excluyendo la rama que contiene dicha fuente y cualquier elemento en serie con ella.'
  },
  {
    id: 9,
    type: 'single',
    category: 'Análisis de Mallas',
    question: 'Si dos corrientes de malla, (i₁) e (i₂), circulan en sentido horario y comparten una resistencia central, ¿cuál es la corriente real que baja por dicha resistencia?',
    options: [
      { id: 'a', text: 'i₁ - i₂' },
      { id: 'b', text: 'i₁ + i₂' },
      { id: 'c', text: 'i₂ - i₁ (siempre positiva).' },
      { id: 'd', text: '(i₁ + i₂) / 2' }
    ],
    correctAnswerIds: ['a'],
    explanation: 'Al definir i₁ (malla izquierda) e i₂ (malla derecha) en sentido horario, por la rama central compartida i₁ desciende mientras que i₂ asciende. Por tanto, la corriente neta que baja por la resistencia central es la diferencia algebraica (i₁ - i₂).'
  },
  {
    id: 10,
    type: 'multiple',
    category: 'Análisis Nodal',
    question: '¿Cuáles de los siguientes pasos pertenecen al procedimiento general del Análisis de Nodos?',
    hint: 'Selecciona todas las alternativas verdaderas (3 opciones correctas).',
    options: [
      { id: 'a', text: 'Simplificar todas las resistencias en serie y paralelo antes del análisis.' },
      { id: 'b', text: 'Elegir un nodo de referencia (tierra).' },
      { id: 'c', text: 'Aplicar la LCK en cada nodo de no referencia.' },
      { id: 'd', text: 'Resolver el sistema de ecuaciones para hallar tensiones.' }
    ],
    correctAnswerIds: ['b', 'c', 'd'],
    explanation: 'El procedimiento sistemático del análisis nodal consiste en: (b) elegir un nodo de referencia (tierra), (c) aplicar la LCK en cada nodo de no referencia expresando corrientes en función de voltajes, y (d) resolver el sistema para hallar las tensiones nodales.'
  },
  {
    id: 11,
    type: 'multiple',
    category: 'Supernodo',
    question: 'Seleccione las características verdaderas sobre el análisis de un "Supernodo".',
    hint: 'Selecciona todas las alternativas verdaderas (3 opciones correctas).',
    options: [
      { id: 'a', text: 'Se aplica la LCK al supernodo como si fuera un solo nodo generalizado.' },
      { id: 'b', text: 'Se requiere una ecuación de restricción (LVK) dada por la fuente de voltaje.' },
      { id: 'c', text: 'Se usa cuando hay una fuente de voltaje entre dos nodos de no referencia.' },
      { id: 'd', text: 'Se forma cuando dos mallas comparten únicamente resistencias.' }
    ],
    correctAnswerIds: ['a', 'b', 'c'],
    explanation: 'Un supernodo se emplea cuando (c) hay una fuente de voltaje entre dos nodos de no referencia; en él (a) se aplica LCK a la superficie que engloba ambos nodos y la fuente, y (b) se añade la ecuación de restricción de tensión (LVK) entre los dos nodos.'
  },
  {
    id: 12,
    type: 'multiple',
    category: 'Supermalla',
    question: '¿Qué afirmaciones son correctas respecto al análisis de mallas con fuentes de corriente (caso 2: Supermalla)?',
    hint: 'Selecciona todas las alternativas verdaderas (3 opciones correctas).',
    options: [
      { id: 'a', text: 'Garantiza que todas las tensiones sean positivas.' },
      { id: 'b', text: 'Ocurre cuando una fuente de corriente es compartida por dos mallas.' },
      { id: 'c', text: 'Se debe aplicar la LVK en la trayectoria que excluye la fuente de corriente.' },
      { id: 'd', text: 'Se necesita una ecuación de restricción que relacione las corrientes de malla con la fuente de corriente.' }
    ],
    correctAnswerIds: ['b', 'c', 'd'],
    explanation: 'En el Caso 2 (Supermalla): (b) se presenta cuando una fuente de corriente está en una rama común a dos mallas, (c) se aplica LVK rodeando el contorno exterior que excluye la rama de la fuente de corriente, y (d) se plantea la ecuación de restricción mediante LCK relacionando i₁, i₂ e I_s.'
  },
  {
    id: 13,
    type: 'multiple',
    category: 'Análisis Nodal',
    question: '¿Por qué es útil el nodo de referencia en el análisis nodal?',
    hint: 'Selecciona las alternativas correctas sobre el rol del nodo de referencia (2 opciones principales).',
    options: [
      { id: 'a', text: 'Define un punto con potencial de 0 V.' },
      { id: 'b', text: 'Garantiza que todas las tensiones sean positivas.' },
      { id: 'c', text: 'Reduce el número de incógnitas en una unidad.' },
      { id: 'd', text: 'Permite aplicar la ley de Ohm directamente desde los otros nodos hacia él.' }
    ],
    correctAnswerIds: ['a', 'c'],
    explanation: 'El nodo de referencia (tierra) (a) establece el nivel base de potencial de 0 V respecto al cual se miden las demás tensiones nodales y (c) reduce el número de incógnitas de N a (N - 1).'
  },
  {
    id: 14,
    type: 'matching',
    category: 'Análisis de Mallas',
    question: 'Empareje el método de análisis con la ley fundamental en la que se basa.',
    matchingPairs: [
      {
        leftId: 'a',
        leftText: 'a. Análisis nodal',
        rightId: '3',
        rightText: '3. LCK (Ley de Corrientes de Kirchhoff).'
      },
      {
        leftId: 'b',
        leftText: 'b. Análisis de malla',
        rightId: '1',
        rightText: '1. LVK (Ley de Voltaje de Kirchhoff).'
      },
      {
        leftId: 'c',
        leftText: 'c. Supernodo',
        rightId: '2',
        rightText: '2. LCK + ecuación de restricción (LVK).'
      }
    ],
    explanation: 'El Análisis Nodal se basa en la LCK (3); el Análisis de Malla se basa en la LVK (1); y el Supernodo combina la aplicación de LCK en el contorno del supernodo con una ecuación de restricción de tensión mediante LVK (2).'
  }
];
