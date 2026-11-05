import React, { useState } from 'react';
import { ArrowUpDown, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react';

export const Module3Case1CurrentSource: React.FC = () => {
  const [mode, setMode] = useState<'guided' | 'sandbox'>('guided');
  const [step, setStep] = useState<number>(1);

  // Parámetros del Caso 1: Fuente de corriente Is únicamente en la Malla 1
  const [isVal, setIsVal] = useState<number>(4);
  const [isUpward, setIsUpward] = useState<boolean>(true);
  const [r1, setR1] = useState<number>(3);
  const [r2, setR2] = useState<number>(4);
  const [r3, setR3] = useState<number>(6);
  const [v2, setV2] = useState<number>(12);

  // Solución del Caso 1:
  const i1 = isUpward ? isVal : -isVal;
  const i2 = (r3 * i1 - v2) / (r2 + r3);
  const I1 = i1;
  const I2 = i2;
  const I3 = i1 - i2;

  const guidedSteps = [
    {
      num: 1,
      title: 'Paso 1: ¿Cuál es la dificultad con una fuente de corriente en LVK?',
      desc: 'En una fuente de corriente ideal NO se conoce a priori la tensión en sus terminales. Por tanto, no debemos plantear una ecuación de LVK en una malla que atraviese dicha fuente.'
    },
    {
      num: 2,
      title: 'Paso 2: Identificar que la fuente pertenece a UNA SOLA malla (Caso 1)',
      desc: 'Como la fuente de corriente Iₛ se ubica en la rama izquierda exterior y NO es compartida con otra malla, la corriente de la Malla 1 queda fijada inmediatamente por la fuente: i₁ = +Iₛ (si va en sentido horario) o i₁ = −Iₛ (si va en sentido opuesto).'
    },
    {
      num: 3,
      title: 'Paso 3: Plantear LVK únicamente en las mallas restantes (Malla 2)',
      desc: 'No escribimos ecuación de LVK para la Malla 1. Aplicamos LVK solo en la Malla 2: R₃(i₂ − i₁) + R₂·i₂ + V₂ = 0, y sustituimos el valor ya conocido de i₁.'
    },
    {
      num: 4,
      title: 'Paso 4: Despejar i₂ e interpretar el signo del resultado',
      desc: 'Se obtiene directamente i₂ de una sola ecuación lineal. Recuerda: si i₂ o alguna corriente resulta con signo negativo, físicamente significa que la corriente real circula en sentido opuesto al horario supuesto.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo 3 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="text-xs font-medium text-slate-500 flex items-center gap-2 mb-1">
              <span>Módulo 03</span>
              <span aria-hidden="true">·</span>
              <span>Circuitos con Fuentes de Corriente — Caso 1</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Caso 1: Fuente de Corriente en una Sola Malla (Rama No Compartida)
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
              <button
                onClick={() => setMode('guided')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  mode === 'guided' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Explicación Guiada
              </button>
              <button
                onClick={() => setMode('sandbox')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  mode === 'sandbox' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Simulador Libre
              </button>
            </div>

            <button
              onClick={() => setIsUpward((prev) => !prev)}
              className="px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>
                Invertir Sentido de Fuente I<sub className="text-[10px]">s</sub> ({isUpward ? '↑ Horario (+)' : '↓ Opuesto (−)'})
              </span>
            </button>
          </div>
        </div>

        {mode === 'guided' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-mono font-bold bg-sky-600 text-white rounded">
                  PASO {step} DE 4
                </span>
                <h3 className="text-sm font-bold text-slate-900">{guidedSteps[step - 1].title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Anterior
                </button>
                <button
                  onClick={() => setStep((s) => Math.min(4, s + 1))}
                  disabled={step === 4}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
                >
                  Siguiente Paso
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{guidedSteps[step - 1].desc}</p>
          </div>
        )}
      </div>

      {/* Dos Zonas: Esquemático (Izquierda) y Procedimiento / Ecuaciones (Derecha) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ZONA IZQUIERDA (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-sm font-bold text-slate-900">
                Circuito con Fuente de Corriente Exclusiva en la Malla 1
              </span>
              <span className="text-xs font-mono font-semibold text-sky-700">
                Malla 1 Fijada: i₁ = {i1 > 0 ? `+${i1}` : i1} A
              </span>
            </div>

            <div className="schematic-grid border border-slate-200 rounded-xl p-4">
              <svg viewBox="0 0 780 410" className="w-full h-auto select-none">
                <defs>
                  <marker id="m3-arrow-i1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#0284c7" />
                  </marker>
                  <marker id="m3-arrow-i2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#059669" />
                  </marker>
                  <marker id="m3-arrow-is" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#7c3aed" />
                  </marker>
                </defs>

                {/* Resaltado Malla 1 (Corriente Fijada, Sin Ecuación de LVK) */}
                <rect
                  x="158"
                  y="98"
                  width="222"
                  height="224"
                  rx="10"
                  fill="rgba(124, 58, 237, 0.05)"
                  stroke="#7c3aed"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />

                {/* Resaltado Malla 2 (Donde sí se aplica LVK) */}
                <rect
                  x="400"
                  y="98"
                  width="222"
                  height="224"
                  rx="10"
                  fill="rgba(5, 150, 105, 0.07)"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeDasharray="8 5"
                  className="animate-flow-cw"
                />

                {/* Conductores Superiores e Inferiores (x: 150 a 630, y: 90 a 330) */}
                <line x1="150" y1="90" x2="232" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="232,90 240,76 254,104 268,76 282,104 296,76 310,104 318,90"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.8"
                />
                <line x1="318" y1="90" x2="390" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <text x="275" y="62" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-900">
                  R₁ = {r1} Ω
                </text>

                <line x1="390" y1="90" x2="472" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="472,90 480,76 494,104 508,76 522,104 536,76 550,104 558,90"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.8"
                />
                <line x1="558" y1="90" x2="630" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <text x="515" y="62" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-900">
                  R₂ = {r2} Ω
                </text>

                <line x1="150" y1="330" x2="630" y2="330" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama Izquierda: Fuente de Corriente Is — Etiqueta AFUERA a la izquierda */}
                <line x1="150" y1="90" x2="150" y2="182" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="150" cy="210" r="28" fill="#f5f3ff" stroke="#7c3aed" strokeWidth="3" />
                {isUpward ? (
                  <line x1="150" y1="226" x2="150" y2="194" stroke="#7c3aed" strokeWidth="3" markerEnd="url(#m3-arrow-is)" />
                ) : (
                  <line x1="150" y1="194" x2="150" y2="226" stroke="#7c3aed" strokeWidth="3" markerEnd="url(#m3-arrow-is)" />
                )}
                <rect x="8" y="186" width="108" height="48" rx="6" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
                <text x="62" y="206" textAnchor="middle" className="font-mono text-xs font-bold fill-violet-950">
                  I<tspan dy="3" fontSize="9">s</tspan><tspan dy="-3"> = {isVal} A</tspan>
                </text>
                <text x="62" y="224" textAnchor="middle" className="font-sans text-[11px] font-semibold fill-violet-700">
                  ({isUpward ? '↑ Horario' : '↓ Opuesto'})
                </text>
                <line x1="150" y1="238" x2="150" y2="330" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama Central Compartida R3 */}
                <line x1="390" y1="90" x2="390" y2="165" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="390,165 376,173 404,187 376,201 404,215 376,229 404,243 390,251"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2.8"
                />
                <line x1="390" y1="251" x2="390" y2="330" stroke="#0f172a" strokeWidth="2.5" />
                <rect x="342" y="274" width="96" height="24" rx="5" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.2" />
                <text x="390" y="290" textAnchor="middle" className="font-mono text-xs font-bold fill-indigo-950">
                  R₃ = {r3} Ω
                </text>

                {/* Rama Derecha: Fuente de Tensión V2 — Etiqueta AFUERA a la derecha */}
                <line x1="630" y1="90" x2="630" y2="184" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="630" cy="210" r="26" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x="630" y="204" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">+</text>
                <text x="630" y="224" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">−</text>
                <rect x="664" y="195" width="102" height="30" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <text x="715" y="214" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-950">
                  V₂ = {v2} V
                </text>
                <line x1="630" y1="236" x2="630" y2="330" stroke="#0f172a" strokeWidth="2.5" />

                {/* Malla 1 Indicador Circular (Centro x=265, y=185) + Etiqueta Debajo */}
                <path
                  d="M 237 185 A 28 28 0 1 1 265 213"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  markerEnd="url(#m3-arrow-i1)"
                />
                <text x="265" y="189" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-700">
                  i₁
                </text>
                <rect x="187" y="230" width="156" height="28" rx="6" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.2" />
                <text x="265" y="248" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-900">
                  i₁ = {i1} A (FIJADA)
                </text>

                {/* Malla 2 Indicador Circular (Centro x=515, y=185) + Etiqueta Debajo */}
                <path
                  d="M 487 185 A 28 28 0 1 1 515 213"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  markerEnd="url(#m3-arrow-i2)"
                />
                <text x="515" y="189" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">
                  i₂
                </text>
                <rect x="451" y="230" width="128" height="28" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
                <text x="515" y="248" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-900">
                  i₂ = {i2.toFixed(2)} A
                </text>

                {/* Nodos */}
                {[
                  { x: 150, y: 90, l: 'a', dy: -12 },
                  { x: 390, y: 90, l: 'b', dy: -12 },
                  { x: 630, y: 90, l: 'c', dy: -12 },
                  { x: 630, y: 330, l: 'd', dy: 20 },
                  { x: 390, y: 330, l: 'e', dy: 20 },
                  { x: 150, y: 330, l: 'f', dy: 20 }
                ].map((n) => (
                  <g key={n.l}>
                    <circle cx={n.x} cy={n.y} r="4.5" fill="#0f172a" />
                    <text x={n.x} y={n.y + n.dy} textAnchor="middle" className="font-mono text-xs font-bold fill-slate-700">
                      {n.l}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Nota de Control de Signos */}
          <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900 block mb-0.5">
                Control de Signo en Resultados (Interpretación Física):
              </strong>
              Actualmente <code className="font-mono font-bold text-emerald-700">I₂ = i₂ = {i2.toFixed(2)} A</code>.
              {i2 < 0 ? (
                <span>
                  {' '}El <strong>signo negativo</strong> indica simplemente que la corriente real en la Malla 2 circula en{' '}
                  <strong>sentido opuesto (antihorario)</strong> al sentido horario supuesto inicialmente.
                </span>
              ) : (
                <span>
                  {' '}El <strong>signo positivo</strong> confirma que la corriente real en la Malla 2 circula efectivamente en el{' '}
                  <strong>sentido horario</strong> asumido.
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ZONA DERECHA (5 cols): Controles y Flujo del Caso 1 */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Controles del Caso 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">
              Ajustar Valores del Circuito (Caso 1)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m3-is" className="text-violet-900 font-semibold">
                    Fuente de Corriente I<sub className="text-[10px]">s</sub> (Malla 1):
                  </label>
                  <span className="font-mono font-bold text-violet-900 tabular-nums">
                    {isVal} A ({isUpward ? '↑ Horaria' : '↓ Antihoraria'})
                  </span>
                </div>
                <input
                  id="m3-is"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={isVal}
                  onChange={(e) => setIsVal(Number(e.target.value))}
                  className="w-full accent-violet-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m3-v2" className="text-slate-700">Fuente V₂ (Malla 2):</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{v2} V</span>
                </div>
                <input
                  id="m3-v2"
                  type="range"
                  min="2"
                  max="24"
                  step="2"
                  value={v2}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m3-r3" className="text-slate-700">Resistor Central R₃:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{r3} Ω</span>
                </div>
                <input
                  id="m3-r3"
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={r3}
                  onChange={(e) => setR3(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m3-r1" className="text-slate-700">Resistor R₁:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{r1} Ω</span>
                </div>
                <input
                  id="m3-r1"
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={r1}
                  onChange={(e) => setR1(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m3-r2" className="text-slate-700">Resistor R₂:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{r2} Ω</span>
                </div>
                <input
                  id="m3-r2"
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={r2}
                  onChange={(e) => setR2(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Procedimiento Algebraico Paso a Paso del Caso 1 */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex-1 flex flex-col justify-between">
            <div className="space-y-3.5">
              <h3 className="text-base font-bold text-slate-900">
                Resolución Sistemática (Caso 1)
              </h3>

              <div className="p-3.5 rounded-lg bg-violet-50 border border-violet-200 space-y-1">
                <div className="text-xs font-bold text-violet-900">
                  1. Fijar corriente en la malla de la fuente (Sin ecuación de LVK):
                </div>
                <div className="font-mono text-sm font-bold text-violet-950">
                  i₁ = {isUpward ? <>+I<sub className="text-xs">s</sub></> : <>−I<sub className="text-xs">s</sub></>} = {i1} A
                </div>
                <div className="text-xs text-violet-800">
                  Nota: El resistor R₁ ({r1} Ω) está en serie con I<sub className="text-[10px]">s</sub>, por lo que no altera el valor de i₁.
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="text-xs font-bold text-emerald-900">
                  2. Plantear LVK únicamente en la Malla 2:
                </div>
                <div className="font-mono text-xs sm:text-sm text-emerald-950">
                  R₃(i₂ − i₁) + R₂·i₂ + V₂ = 0
                </div>
                <div className="font-mono text-xs text-emerald-800 pt-1 border-t border-emerald-200/80">
                  {r3}(i₂ − ({i1})) + {r2}·i₂ + {v2} = 0 ⇒ ({r2 + r3})·i₂ = {r3 * i1 - v2}
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-900 text-white space-y-1">
                <div className="text-xs font-semibold text-sky-300">
                  3. Resultados Finales de Rama:
                </div>
                <div className="font-mono text-xs sm:text-sm">
                  I₁ = i₁ = <strong>{I1.toFixed(2)} A</strong> · I₂ = i₂ = <strong>{I2.toFixed(2)} A</strong>
                </div>
                <div className="font-mono text-xs sm:text-sm text-amber-300">
                  I₃ (rama central) = i₁ − i₂ = <strong>{I3.toFixed(2)} A</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
