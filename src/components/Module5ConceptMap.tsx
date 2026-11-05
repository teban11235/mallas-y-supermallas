import React, { useState } from 'react';
import { GitBranch, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';
import { GLOSSARY_ITEMS } from '../data/courseContent';
import { formatMathText } from '../utils/formatMath';

interface ConceptNode {
  id: string;
  title: string;
  category: string;
  summary: string;
  details: string[];
  connections: string[];
}

const CONCEPT_NODES: ConceptNode[] = [
  {
    id: 'lazo',
    title: 'Lazo (Trayectoria Cerrada)',
    category: 'Concepto Base',
    summary: 'Cualquier camino cerrado en un circuito eléctrico.',
    details: [
      'Comienza y termina en el mismo nodo.',
      'No pasa por ningún nodo intermedio más de una vez.',
      'El contorno externo completo de un circuito con varias mallas es un lazo, pero no una malla.'
    ],
    connections: ['Da origen al concepto de → Malla', 'Permite aplicar → Ley de Voltajes de Kirchhoff (LVK)']
  },
  {
    id: 'malla',
    title: 'Malla (Lazo Elemental)',
    category: 'Concepto Base',
    summary: 'Tipo especial de lazo que no contiene otros lazos en su interior.',
    details: [
      'Es la trayectoria cerrada más simple en una región de un circuito planar.',
      'A cada malla se le asigna una corriente de malla (i₁, i₂, ...).',
      'Reduce el número de ecuaciones cuando el circuito tiene pocas mallas.'
    ],
    connections: ['Se le asigna → Corriente de Malla', 'En ramas comunes produce → Diferencia Algebraica (i₁ − i₂)']
  },
  {
    id: 'corriente-malla',
    title: 'Corriente de Malla (i₁, i₂)',
    category: 'Variable Principal',
    summary: 'Corriente ficticia asignada a cada malla en sentido horario.',
    details: [
      'Circula únicamente por los elementos del perímetro de su malla.',
      'No siempre coincide con la corriente física real de cada rama (solo coincide en ramas exteriores no compartidas).',
      'En ramas compartidas, la corriente real es I_rama = i₁ − i₂ y la tensión en un resistor es v = R(i₁ − i₂).'
    ],
    connections: ['Genera caídas de tensión mediante → Ley de Ohm', 'Se resuelve planteando → Ecuaciones de LVK']
  },
  {
    id: 'caso1',
    title: 'Caso 1: Fuente de Corriente en una Sola Malla',
    category: 'Adaptación con Fuentes de Corriente',
    summary: 'Fuente de corriente ubicada en una rama exterior no compartida.',
    details: [
      'No constituye una rama común con otra malla.',
      'El valor de la corriente de esa malla queda fijado inmediatamente: i_k = +I_s o i_k = −I_s según su sentido.',
      'No se escribe ecuación de LVK para esa malla; solo se aplica LVK en las mallas restantes.'
    ],
    connections: ['Simplifica el sistema → Reduce en 1 las incógnitas', 'Requiere verificar → Sentido de la fuente respecto al giro horario']
  },
  {
    id: 'supermalla',
    title: 'Caso 2: Supermalla (Superlazo)',
    category: 'Adaptación con Fuentes de Corriente',
    summary: 'Fuente de corriente compartida entre dos mallas adyacentes.',
    details: [
      'En una fuente de corriente no se conoce a priori la tensión en sus terminales, impidiendo aplicar LVK directamente en cada malla por separado.',
      'Se traza rodeando la periferia de las dos mallas que comparten la fuente, excluyendo la rama de la fuente y cualquier elemento en serie con ella.',
      'Se resuelve combinando la LVK del superlazo con la ecuación de restricción (LCK) en la rama de la fuente (ej. i₂ − i₁ = I_s).'
    ],
    connections: ['Combina → LVK en periferia exterior + Restricción LCK', 'Permite hallar → Sistema completo de corrientes de malla']
  }
];

interface LinkExercise {
  id: number;
  chainStart: string;
  options: string[];
  correctOption: string;
  chainEnd: string;
}

const LINK_EXERCISES: LinkExercise[] = [
  {
    id: 1,
    chainStart: 'En una rama compartida por las mallas 1 y 2, la corriente real de rama se expresa como',
    options: [
      'la suma aritmética obligatoria (i₁ + i₂)',
      'la diferencia algebraica de sus corrientes de malla (i₁ − i₂)',
      'el promedio de ambas corrientes de malla'
    ],
    correctOption: 'la diferencia algebraica de sus corrientes de malla (i₁ − i₂)',
    chainEnd: 'y la caída de tensión en el resistor compartido es v = R(i₁ − i₂).'
  },
  {
    id: 2,
    chainStart: 'Cuando una fuente de corriente pertenece a una sola malla (Caso 1),',
    options: [
      'se plantea una supermalla excluyendo todo el circuito',
      'la corriente de esa malla queda fijada directamente (i_k = ±I_s)',
      'se asume que la tensión en la fuente de corriente es 0 V'
    ],
    correctOption: 'la corriente de esa malla queda fijada directamente (i_k = ±I_s)',
    chainEnd: 'y solo se escribe LVK para las mallas restantes.'
  },
  {
    id: 3,
    chainStart: 'Cuando una fuente de corriente está entre dos mallas adyacentes (Caso 2: Supermalla),',
    options: [
      'se aplica LVK en la periferia exterior excluyendo la rama de la fuente',
      'se reemplaza la fuente de corriente por un cortocircuito',
      'se aplica únicamente LCK en todos los resistores'
    ],
    correctOption: 'se aplica LVK en la periferia exterior excluyendo la rama de la fuente',
    chainEnd: 'y se añade la ecuación de restricción usando LCK en la rama compartida.'
  }
];

export const Module5ConceptMap: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('supermalla');
  const [decisionStep, setDecisionStep] = useState<'hasCurrentSource' | 'whereIsSource' | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [glossaryFilter, setGlossaryFilter] = useState<string>('Todos');

  const activeNode = CONCEPT_NODES.find((n) => n.id === selectedNodeId) || CONCEPT_NODES[0];

  const filteredGlossary =
    glossaryFilter === 'Todos'
      ? GLOSSARY_ITEMS
      : GLOSSARY_ITEMS.filter((item) => item.category === glossaryFilter);

  return (
    <div className="space-y-8">
      {/* Encabezado */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="text-xs font-medium text-slate-500 flex items-center gap-2 mb-1">
          <span>Módulo 05</span>
          <span aria-hidden="true">·</span>
          <span>Síntesis Metodológica, Mapa Conceptual y Glosario</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Mapa Conceptual Interactivo y Árbol de Decisión del Método de Mallas
        </h2>
        <p className="text-sm text-slate-600 max-w-4xl">
          Selecciona cada bloque del mapa conceptual para inspeccionar sus reglas y conexiones dentro del análisis de
          lazo en corriente continua (DC), o utiliza el constructor de relaciones para verificar la secuencia completa
          del método.
        </p>
      </div>

      {/* Mapa Conceptual Interactivo: Nodos + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Diagrama de Flujo / Nodos Seleccionables (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-sky-600" />
              Estructura Conceptual: Análisis de Mallas y Supermallas en DC
            </h3>

            {/* Red Jerárquica Interactiva */}
            <div className="space-y-4">
              {/* Nivel 1: Conceptos Topológicos */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 mb-2.5">
                  1. Fundamentos Topológicos y Variables (Haz clic en un nodo)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CONCEPT_NODES.slice(0, 3).map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        selectedNodeId === node.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-sky-400'
                      }`}
                    >
                      <div className={`text-[11px] font-medium mb-1 ${selectedNodeId === node.id ? 'text-sky-300' : 'text-sky-700'}`}>
                        {node.category}
                      </div>
                      <div className="text-sm font-bold leading-snug">{node.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Flecha de Bifurcación: ¿Contiene Fuentes de Corriente? */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                <div className="text-xs font-bold text-amber-900 mb-1">
                  2. Criterio Decisivo: ¿El circuito contiene fuentes de corriente?
                </div>
                <p className="text-xs text-amber-800 mb-3">
                  Reconocer la ubicación de la fuente de corriente es determinante para seleccionar el procedimiento
                  correcto porque el voltaje en sus terminales es desconocido a priori:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONCEPT_NODES.slice(3, 5).map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-3.5 rounded-lg border text-left transition-all ${
                        selectedNodeId === node.id
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-800 border-amber-300 hover:border-amber-500'
                      }`}
                    >
                      <div className={`text-[11px] font-medium mb-1 ${selectedNodeId === node.id ? 'text-amber-300' : 'text-amber-800'}`}>
                        {node.category}
                      </div>
                      <div className="text-sm font-bold leading-snug">{node.title}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cadena de Proceso Completa */}
              <div className="p-4 rounded-xl bg-slate-900 text-white">
                <div className="text-xs font-semibold text-sky-300 mb-2">
                  Flujo Completo de Resolución Sistemática:
                </div>
                <div className="text-xs sm:text-sm font-mono leading-relaxed text-slate-200">
                  Circuito planar → Definición de mallas (sentido horario) → Planteamiento de ecuaciones de lazo (LVK) /
                  superlazo + restricción (LCK) → Sistema de ecuaciones → Corrientes de malla (i₁, i₂) y de rama (I₁, I₂, I₃).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inspector de Nodo Seleccionado (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-sky-700 mb-1">{activeNode.category}</div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{activeNode.title}</h3>
            <p className="text-sm text-slate-600 mb-4 pb-4 border-b border-slate-100">{activeNode.summary}</p>

            <div className="space-y-3 mb-6">
              <div className="text-xs font-bold text-slate-900">Características y Reglas Clave:</div>
              <ul className="space-y-2.5">
                {activeNode.details.map((detail, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{formatMathText(detail)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
            <div className="text-xs font-bold text-slate-900 mb-2">Conexiones en el Mapa Conceptual:</div>
            <div className="space-y-1.5">
              {activeNode.connections.map((conn, i) => (
                <div key={i} className="text-xs font-mono text-slate-700 bg-white px-3 py-1.5 rounded border border-slate-200">
                  {conn}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Actividad Interactiva: Constructor de Relaciones Conceptuales */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Actividad Práctica: Conecta las Proposiciones del Mapa Conceptual
            </h3>
            <p className="text-xs text-slate-600">
              Selecciona el conector conceptual correcto para completar las tres relaciones fundamentales del método.
            </p>
          </div>
          <button
            onClick={() => setSelectedAnswers({})}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reiniciar Conectores
          </button>
        </div>

        <div className="space-y-4">
          {LINK_EXERCISES.map((ex) => {
            const chosen = selectedAnswers[ex.id];
            const isCorrect = chosen === ex.correctOption;
            return (
              <div key={ex.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="text-sm text-slate-800 leading-relaxed">
                  <span className="font-bold text-slate-900">{ex.id}. </span>
                  {formatMathText(ex.chainStart)}{' '}
                  <span className="font-mono font-bold text-sky-800 underline decoration-sky-400">
                    {chosen ? formatMathText(chosen) : '[ Selecciona el concepto enlace ]'}
                  </span>{' '}
                  {formatMathText(ex.chainEnd)}
                </div>
                <div className="flex flex-wrap gap-2">
                  {ex.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedAnswers((prev) => ({ ...prev, [ex.id]: opt }))}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors text-left ${
                        chosen === opt
                          ? opt === ex.correctOption
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-red-600 text-white border-red-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      {formatMathText(opt)}
                    </button>
                  ))}
                </div>
                {chosen && (
                  <div className={`text-xs font-semibold ${isCorrect ? 'text-emerald-700' : 'text-red-700'}`}>
                    {isCorrect
                      ? '✓ Relación conceptual correcta.'
                      : '✗ Revisa la función de la rama compartida o de la fuente de corriente e intenta nuevamente.'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Glosario Interactivo de Términos Clave */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-600" />
            <h3 className="text-lg font-bold text-slate-900">Glosario Esencial de Análisis de Mallas</h3>
          </div>
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {['Todos', 'Topología', 'Variables', 'Fuentes de Corriente'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGlossaryFilter(cat)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  glossaryFilter === cat ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGlossary.map((item) => (
            <div key={item.term} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-500 mb-1">{item.category}</div>
                <h4 className="text-sm font-bold text-slate-900 mb-1.5">{item.term}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{formatMathText(item.definition)}</p>
              </div>
              <div className="pt-2.5 border-t border-slate-200/80 font-mono text-xs font-semibold text-sky-900">
                {formatMathText(item.formulaOrRule)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
