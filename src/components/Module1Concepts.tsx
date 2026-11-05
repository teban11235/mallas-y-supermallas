import React, { useState } from 'react';
import { RotateCcw, ArrowRightLeft, Layers } from 'lucide-react';

export const Module1Concepts: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'malla1' | 'malla2' | 'lazoExterno' | 'ramaCompartida'>('all');
  const [clockwiseConvention, setClockwiseConvention] = useState<boolean>(true);
  const [comparisonTab, setComparisonTab] = useState<'mallas' | 'nodal'>('mallas');

  return (
    <div className="space-y-8">
      {/* Encabezado del Módulo */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-5">
          <div>
            <div className="text-xs font-medium text-slate-500 flex items-center gap-2 mb-1">
              <span>Módulo 01</span>
              <span aria-hidden="true">·</span>
              <span>Fundamentos Topológicos y Variables Principales</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Lazo, Malla y Corriente de Malla en Circuitos Resistivos
            </h2>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setClockwiseConvention(true)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                clockwiseConvention
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Convención Horaria (Estándar)
            </button>
            <button
              onClick={() => setClockwiseConvention(false)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                !clockwiseConvention
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Malla 2 Antihoraria (Comparar)
            </button>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          El <strong>análisis de lazo (o de mallas)</strong> es un método sistemático basado en la{' '}
          <strong>Ley de Voltajes de Kirchhoff (LVK)</strong> que utiliza las corrientes de malla como variables principales.
          Reduce significativamente el número de ecuaciones cuando el circuito tiene pocas mallas y resulta especialmente conveniente
          en circuitos con fuentes de tensión conectadas en serie con resistencias.
        </p>
      </div>

      {/* Zona Interactiva de 2 Columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Columna Izquierda (7 cols): Lienzo Esquemático Interactivo */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-sky-600" />
                Explorador Topológico: Mallas Internas vs. Lazo Externo
              </h3>
              <button
                onClick={() => {
                  setActiveLayer('all');
                  setClockwiseConvention(true);
                }}
                className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Restablecer Vista
              </button>
            </div>

            {/* Selector de Capas Topológicas */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-lg mb-5">
              {[
                { id: 'all', label: 'Vista Completa' },
                { id: 'malla1', label: 'Malla 1 (abefa)' },
                { id: 'malla2', label: 'Malla 2 (bcdeb)' },
                { id: 'lazoExterno', label: 'Lazo Externo (abcdefa)' },
                { id: 'ramaCompartida', label: 'Rama Compartida (b-e)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLayer(tab.id as typeof activeLayer)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    activeLayer === tab.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Diagrama SVG del Circuito con Nodos a, b, c, d, e, f — Sin solapamientos */}
            <div className="schematic-grid border border-slate-200 rounded-xl p-4 relative overflow-hidden">
              <svg viewBox="0 0 760 400" className="w-full h-auto select-none">
                <defs>
                  <marker id="arrow-i1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#0284c7" />
                  </marker>
                  <marker id="arrow-i2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#059669" />
                  </marker>
                  <marker id="arrow-branch" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#dc2626" />
                  </marker>
                </defs>

                {/* Resaltado de Lazo Externo */}
                {activeLayer === 'lazoExterno' && (
                  <rect
                    x="126"
                    y="76"
                    width="508"
                    height="258"
                    rx="14"
                    fill="rgba(217, 119, 6, 0.06)"
                    stroke="#d97706"
                    strokeWidth="3.5"
                    strokeDasharray="10 6"
                    className="animate-flow-cw"
                  />
                )}

                {/* Resaltado de Malla 1 */}
                {(activeLayer === 'malla1' || activeLayer === 'all') && (
                  <rect
                    x="152"
                    y="98"
                    width="216"
                    height="214"
                    rx="10"
                    fill={activeLayer === 'malla1' ? 'rgba(2, 132, 199, 0.08)' : 'rgba(2, 132, 199, 0.03)'}
                    stroke="#0284c7"
                    strokeWidth={activeLayer === 'malla1' ? '2.5' : '1.5'}
                    strokeDasharray="6 4"
                  />
                )}

                {/* Resaltado de Malla 2 */}
                {(activeLayer === 'malla2' || activeLayer === 'all') && (
                  <rect
                    x="392"
                    y="98"
                    width="216"
                    height="214"
                    rx="10"
                    fill={activeLayer === 'malla2' ? 'rgba(5, 150, 105, 0.08)' : 'rgba(5, 150, 105, 0.03)'}
                    stroke="#059669"
                    strokeWidth={activeLayer === 'malla2' ? '2.5' : '1.5'}
                    strokeDasharray="6 4"
                  />
                )}

                {/* Resaltado de Rama Compartida */}
                {activeLayer === 'ramaCompartida' && (
                  <rect
                    x="348"
                    y="78"
                    width="64"
                    height="254"
                    rx="8"
                    fill="rgba(79, 70, 229, 0.10)"
                    stroke="#4f46e5"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                  />
                )}

                {/* Conductores Principales del Circuito (x: 140 a 620, y: 90 a 320) */}
                {/* Rama superior izquierda (a -> R1 -> b) */}
                <line x1="140" y1="90" x2="230" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="230,90 238,76 252,104 266,76 280,104 294,76 308,104 316,90"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <line x1="316" y1="90" x2="380" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <text x="273" y="62" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-900">
                  R₁
                </text>

                {/* Rama superior derecha (b -> R2 -> c) */}
                <line x1="380" y1="90" x2="465" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="465,90 473,76 487,104 501,76 515,104 529,76 543,104 551,90"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <line x1="551" y1="90" x2="620" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <text x="508" y="62" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-900">
                  R₂
                </text>

                {/* Rama inferior completa (f - e - d) */}
                <line x1="140" y1="320" x2="620" y2="320" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama izquierda con Fuente V1 (Etiqueta FUERA a la izquierda) */}
                <line x1="140" y1="90" x2="140" y2="178" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="140" cy="205" r="26" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x="140" y="199" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">+</text>
                <text x="140" y="219" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">−</text>
                <rect x="52" y="191" width="52" height="26" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.2" />
                <text x="78" y="209" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-900">V₁</text>
                <line x1="140" y1="231" x2="140" y2="320" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama derecha con Fuente V2 (Etiqueta FUERA a la derecha) */}
                <line x1="620" y1="90" x2="620" y2="178" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="620" cy="205" r="26" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x="620" y="199" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">+</text>
                <text x="620" y="219" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">−</text>
                <rect x="656" y="191" width="52" height="26" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.2" />
                <text x="682" y="209" textAnchor="middle" className="font-mono text-sm font-bold fill-blue-900">V₂</text>
                <line x1="620" y1="231" x2="620" y2="320" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama Central Compartida (b -> R3 -> e) */}
                <line x1="380" y1="90" x2="380" y2="165" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="380,165 366,173 394,187 366,201 394,215 366,229 394,243 380,251"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                <line x1="380" y1="251" x2="380" y2="320" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="330" y="195" width="32" height="22" rx="4" fill="#ffffff" />
                <text x="348" y="211" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-900">
                  R₃
                </text>

                {/* Flechas de Corrientes de Rama (I1, I2, I3) */}
                <line x1="158" y1="70" x2="208" y2="70" stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#arrow-i1)" />
                <text x="183" y="58" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-700">I₁</text>

                <line x1="398" y1="70" x2="448" y2="70" stroke="#059669" strokeWidth="2.2" markerEnd="url(#arrow-i2)" />
                <text x="423" y="58" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">I₂</text>

                <line x1="402" y1="108" x2="402" y2="152" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#arrow-branch)" />
                <text x="418" y="135" textAnchor="start" className="font-mono text-xs font-bold fill-red-600">I₃</text>

                {/* Indicador Circular de Corriente de Malla i1 (Centro en x=255, y=195) */}
                {(activeLayer === 'all' || activeLayer === 'malla1' || activeLayer === 'ramaCompartida') && (
                  <g>
                    <path
                      d="M 223 195 A 32 32 0 1 1 255 227"
                      fill="none"
                      stroke="#0284c7"
                      strokeWidth="2.5"
                      markerEnd="url(#arrow-i1)"
                    />
                    <rect x="217" y="242" width="76" height="24" rx="6" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.2" />
                    <text x="255" y="258" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-800">
                      Malla 1 (i₁)
                    </text>
                  </g>
                )}

                {/* Indicador Circular de Corriente de Malla i2 (Centro en x=505, y=195) */}
                {(activeLayer === 'all' || activeLayer === 'malla2' || activeLayer === 'ramaCompartida') && (
                  <g>
                    {clockwiseConvention ? (
                      <path
                        d="M 473 195 A 32 32 0 1 1 505 227"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                        markerEnd="url(#arrow-i2)"
                      />
                    ) : (
                      <path
                        d="M 537 195 A 32 32 0 1 0 505 227"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="2.5"
                        markerEnd="url(#arrow-i2)"
                      />
                    )}
                    <rect x="467" y="242" width="76" height="24" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
                    <text x="505" y="258" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-800">
                      Malla 2 (i₂)
                    </text>
                  </g>
                )}

                {/* Etiquetas de Nodos (a, b, c, d, e, f) */}
                {[
                  { x: 140, y: 90, label: 'a', dx: -16, dy: -10 },
                  { x: 380, y: 90, label: 'b', dx: 0, dy: -14 },
                  { x: 620, y: 90, label: 'c', dx: 16, dy: -10 },
                  { x: 620, y: 320, label: 'd', dx: 16, dy: 20 },
                  { x: 380, y: 320, label: 'e', dx: 0, dy: 22 },
                  { x: 140, y: 320, label: 'f', dx: -16, dy: 20 },
                ].map((node) => (
                  <g key={node.label}>
                    <circle cx={node.x} cy={node.y} r="4.5" fill="#0f172a" />
                    <text
                      x={node.x + node.dx}
                      y={node.y + node.dy}
                      textAnchor="middle"
                      className="font-mono text-sm font-bold italic fill-slate-700"
                    >
                      {node.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Nota Explicativa Dinámica según la Capa Seleccionada */}
          <div className="mt-4 bg-slate-50 border border-slate-200 rounded-lg p-4">
            {activeLayer === 'all' && (
              <div className="text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-slate-900">
                  Vista General: Dos mallas internas que comparten una rama común (b–e)
                </p>
                <p>
                  Las corrientes de rama externas coinciden directamente con las corrientes de malla:{' '}
                  <code className="font-mono font-semibold text-sky-700">I₁ = i₁</code> y{' '}
                  <code className="font-mono font-semibold text-emerald-700">
                    I₂ = {clockwiseConvention ? 'i₂' : '-i₂'}
                  </code>
                  . En cambio, en la rama central compartida actúa la superposición de ambas mallas.
                </p>
              </div>
            )}
            {activeLayer === 'malla1' && (
              <div className="text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-sky-800">
                  Malla 1 (Trayectoria cerrada a → b → e → f → a)
                </p>
                <p>
                  Es una <strong>malla</strong> porque es la trayectoria cerrada más simple de la región izquierda y no
                  contiene ningún otro lazo en su interior. Su corriente ficticia asignada es{' '}
                  <code className="font-mono font-bold text-sky-700">i₁</code> en sentido horario.
                </p>
              </div>
            )}
            {activeLayer === 'malla2' && (
              <div className="text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-emerald-800">
                  Malla 2 (Trayectoria cerrada b → c → d → e → b)
                </p>
                <p>
                  Segunda malla elemental del circuito. Aunque no es obligatorio elegir el sentido horario, asumir todas
                  las corrientes de malla en el <strong>sentido de las manecillas del reloj</strong> facilita organizar los
                  signos al aplicar la LVK.
                </p>
              </div>
            )}
            {activeLayer === 'lazoExterno' && (
              <div className="text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-amber-800">
                  Contorno Externo (a → b → c → d → e → f → a): Es un LAZO, pero NO una malla
                </p>
                <p>
                  ¿Por qué no es una malla? Porque encierra en su interior a las dos mallas internas (contiene la rama
                  central <code className="font-mono">b–e</code>). Aun así, como todo lazo cerrado, cumple la LVK.
                </p>
              </div>
            )}
            {activeLayer === 'ramaCompartida' && (
              <div className="text-sm text-slate-700 space-y-1">
                <p className="font-semibold text-indigo-900">
                  Rama Compartida Central (Nodo b al Nodo e con resistor R₃)
                </p>
                <p>
                  {clockwiseConvention ? (
                    <>
                      Con <code className="font-mono font-semibold text-sky-700">i₁</code> e{' '}
                      <code className="font-mono font-semibold text-emerald-700">i₂</code> en sentido horario,{' '}
                      <code className="font-mono">i₁</code> desciende de <em>b</em> a <em>e</em> mientras que{' '}
                      <code className="font-mono">i₂</code> asciende de <em>e</em> a <em>b</em>. Por tanto:{' '}
                      <code className="font-mono font-bold text-slate-900">I₃ = i₁ - i₂</code> y la tensión en{' '}
                      <code className="font-mono">R₃</code> vista desde la malla 1 es{' '}
                      <code className="font-mono font-bold text-slate-900">v = R₃(i₁ - i₂)</code>.
                    </>
                  ) : (
                    <>
                      Si defines <code className="font-mono font-semibold text-emerald-700">i₂</code> en sentido
                      antihorario, ambas corrientes descienden por la rama central en el mismo sentido, cambiando la
                      relación a <code className="font-mono font-bold text-slate-900">I₃ = i₁ + i₂</code>. ¡Por eso la
                      convención horaria uniforme evita confusiones!
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Columna Derecha (5 cols): Ecuaciones de Rama Compartida y Comparador Mallas vs Nodal */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Tarjeta 1: Fórmulas de Rama Compartida */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-3">
              Relación Matemática entre Corrientes de Rama y de Malla
            </h3>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              En una rama compartida por dos mallas cuyas corrientes circulan en sentidos contrarios, la{' '}
              <strong>corriente real de la rama</strong> es la diferencia algebraica de sus corrientes de malla:
            </p>

            <div className="space-y-3 font-mono text-sm">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                <span className="text-slate-600 text-xs font-sans font-medium">Ramas Exteriores:</span>
                <span className="font-bold text-slate-900">
                  I₁ = i₁ , I₂ = {clockwiseConvention ? 'i₂' : '−i₂'}
                </span>
              </div>

              <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-lg">
                <div className="text-xs font-sans font-semibold text-sky-900 mb-1">
                  Corriente que baja por la rama central (de b hacia e):
                </div>
                <div className="text-base font-bold text-sky-950">
                  I<sub className="text-xs">rama</sub> = I₃ = {clockwiseConvention ? 'i₁ − i₂' : 'i₁ + i₂'}
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                <div className="text-xs font-sans font-semibold text-emerald-900 mb-1">
                  Corriente vista desde la Malla 2 (subiendo de e hacia b):
                </div>
                <div className="text-base font-bold text-emerald-950">
                  I<sub className="text-xs">rama(2)</sub> = {clockwiseConvention ? 'i₂ − i₁' : '−(i₁ + i₂)'}
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg">
                <div className="text-xs font-sans font-semibold text-amber-900 mb-1">
                  Tensión en el resistor compartido R₃ (Ley de Ohm):
                </div>
                <div className="text-base font-bold text-amber-950">
                  v = R₃ · I<sub className="text-xs">rama</sub> = {clockwiseConvention ? 'R₃(i₁ − i₂)' : 'R₃(i₁ + i₂)'}
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Comparativa Práctica: Análisis de Mallas vs Análisis Nodal */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-sky-600" />
                  ¿Cuándo elegir Mallas vs. Nodos?
                </h3>
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setComparisonTab('mallas')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                      comparisonTab === 'mallas' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Análisis de Mallas
                  </button>
                  <button
                    onClick={() => setComparisonTab('nodal')}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 ${
                      comparisonTab === 'nodal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    Análisis Nodal
                  </button>
                </div>
              </div>

              {comparisonTab === 'mallas' ? (
                <div className="space-y-2.5 text-sm text-slate-700">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block">Ley Fundamental:</span>
                    Ley de Voltajes de Kirchhoff (<strong>LVK</strong>) alrededor de cada malla cerrada.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block">Variables Principales Desconocidas:</span>
                    Corrientes de malla (
                    <code className="font-mono font-semibold text-sky-700">
                      i₁, i₂, …, i<sub className="text-xs">m</sub>
                    </code>
                    ).
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block">¿Cuándo es más conveniente?</span>
                    Circuitos planares con <strong>pocas mallas</strong> y muchas <strong>fuentes de tensión en serie</strong> con resistores.
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5 text-sm text-slate-700">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block">Ley Fundamental:</span>
                    Ley de Corrientes de Kirchhoff (<strong>LCK</strong>) en cada nodo de no referencia.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block">Variables Principales Desconocidas:</span>
                    Tensiones de nodo (
                    <code className="font-mono font-semibold text-emerald-700">
                      v₁, v₂, …, v<sub className="text-xs">N−1</sub>
                    </code>
                    ) respecto al nodo de referencia (0 V).
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-slate-900 block">¿Cuándo es más conveniente?</span>
                    Circuitos con <strong>pocos nodos</strong> y múltiples ramas en paralelo o fuentes de corriente conectadas a tierra.
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Principio dual: LVK ↔ LCK</span>
              <span>Variables: Corrientes ↔ Tensiones</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
