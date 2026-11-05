import React, { useState } from 'react';
import { Eye, EyeOff, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const Module4Supermesh: React.FC = () => {
  const [mode, setMode] = useState<'guided' | 'sandbox'>('guided');
  const [step, setStep] = useState<number>(1);
  const [isolateCentralBranch, setIsolateCentralBranch] = useState<boolean>(true);
  const [showRealDirections, setShowRealDirections] = useState<boolean>(false);

  // Valores por defecto calibrados exactamente al Ejemplo Guiado de Control:
  // Supermalla: 6*i1 + 14*i2 = 20
  // Restricción: i2 - i1 = 6
  // Resultado Control: I1 = i1 = -3.2 A, I2 = i2 = 2.8 A
  const [v1, setV1] = useState<number>(20);
  const [r1, setR1] = useState<number>(6);
  const [r2, setR2] = useState<number>(14);
  const [isCentral, setIsCentral] = useState<number>(6);
  const [rSeriesCentral, setRSeriesCentral] = useState<number>(2);

  // Resolución del sistema 2x2:
  const i1 = (v1 - r2 * isCentral) / (r1 + r2);
  const i2 = i1 + isCentral;
  const I1 = i1;
  const I2 = i2;

  const isControlCase =
    v1 === 20 && r1 === 6 && r2 === 14 && isCentral === 6;

  const loadControlExample = () => {
    setV1(20);
    setR1(6);
    setR2(14);
    setIsCentral(6);
    setRSeriesCentral(2);
  };

  const guidedSteps = [
    {
      num: 1,
      title: 'Paso 1: Identificar mallas con fuente de corriente compartida',
      desc: 'Las mallas 1 y 2 comparten la rama central que contiene la fuente de corriente de 6 A. Como no conocemos la tensión en los terminales de la fuente de corriente, no podemos aplicar LVK por separado a cada malla.'
    },
    {
      num: 2,
      title: 'Paso 2: Trazar la Supermalla rodeando la periferia exterior',
      desc: 'Rodeamos la periferia de las dos mallas adyacentes EXCLUYENDO la rama central que contiene la fuente de corriente y cualquier elemento en serie con ella (como el resistor de 2 Ω). Activa el botón "Aislar Rama Central" para visualizarlo.'
    },
    {
      num: 3,
      title: 'Paso 3: Aplicar LVK al superlazo + Ecuación de restricción (LCK)',
      desc: '1) LVK en el contorno exterior de la supermalla: −20 + 6·i₁ + 14·i₂ = 0 ⇒ 6i₁ + 14i₂ = 20.  2) Ecuación de restricción (LCK en el nodo de la rama central): como i₂ sube (coincide con la fuente de 6 A) e i₁ baja, se cumple i₂ − i₁ = 6.'
    },
    {
      num: 4,
      title: 'Paso 4: Resolver el sistema e interpretar el signo negativo de I₁',
      desc: 'Al resolver 6i₁ + 14i₂ = 20 con i₂ − i₁ = 6, se obtiene el resultado de control: I₁ = i₁ = −3.20 A e I₂ = i₂ = 2.80 A. El signo negativo en I₁ indica que la corriente real en la rama 1 circula en sentido antihorario (opuesto al supuesto).'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Encabezado del Módulo 4 */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="text-xs font-medium text-slate-500 flex items-center gap-2 mb-1">
              <span>Módulo 04</span>
              <span aria-hidden="true">·</span>
              <span>Circuitos con Fuentes de Corriente — Caso 2 (Superlazo / Supermalla)</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Caso 2: Fuente de Corriente entre Dos Mallas (Supermalla)
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
              onClick={loadControlExample}
              className="px-3 py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap shrink-0"
            >
              Cargar Caso de Control (I₁ = −3.2A, I₂ = 2.8A)
            </button>
          </div>
        </div>

        {mode === 'guided' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-mono font-bold bg-amber-600 text-white rounded">
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

      {/* Layout de 2 Zonas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ZONA IZQUIERDA (7 cols): Lienzo SVG de Supermalla */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsolateCentralBranch((prev) => !prev)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    isolateCentralBranch
                      ? 'bg-amber-600 text-white border-amber-600'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {isolateCentralBranch ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {isolateCentralBranch ? 'Rama Central Excluida (Vista Supermalla)' : 'Aislar Rama Central (Ver Supermalla)'}
                </button>

                <button
                  onClick={() => setShowRealDirections((prev) => !prev)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 ${
                    showRealDirections
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {showRealDirections ? 'Mostrando Sentido Físico Real' : 'Ver Sentido Físico Real de I₁'}
                </button>
              </div>
            </div>

            {/* Diagrama SVG de la Supermalla — Sin solapamientos */}
            <div className="schematic-grid border border-slate-200 rounded-xl p-4 relative">
              <svg viewBox="0 0 780 435" className="w-full h-auto select-none">
                <defs>
                  <marker id="m4-arrow-i1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#0284c7" />
                  </marker>
                  <marker id="m4-arrow-i2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#059669" />
                  </marker>
                  <marker id="m4-arrow-real" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#dc2626" />
                  </marker>
                </defs>

                {/* Contorno Periférico de la Supermalla (holgado para no pisar flechas ni etiquetas) */}
                {isolateCentralBranch && (
                  <g>
                    <rect
                      x="130"
                      y="52"
                      width="535"
                      height="332"
                      rx="18"
                      fill="rgba(217, 119, 6, 0.04)"
                      stroke="#d97706"
                      strokeWidth="3.2"
                      strokeDasharray="12 6"
                      className="animate-flow-cw"
                    />
                    <rect x="190" y="16" width="415" height="24" rx="6" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.2" />
                    <text x="397" y="32" textAnchor="middle" className="font-mono text-xs font-bold fill-amber-900">
                      TRAYECTORIA DE LA SUPERMALLA (PERIFERIA EXTERIOR PARA LVK)
                    </text>
                  </g>
                )}

                {/* Conductores Exteriores (x: 160 a 635, y: 110 a 340) */}
                {/* Rama superior izquierda R1 */}
                <line x1="160" y1="110" x2="242" y2="110" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="242,110 250,96 264,124 278,96 292,124 306,96 320,124 328,110"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="3"
                />
                <line x1="328" y1="110" x2="398" y2="110" stroke="#0f172a" strokeWidth="2.5" />
                <text x="285" y="84" textAnchor="middle" className="font-mono text-sm font-bold fill-sky-950">
                  R₁ = {r1} Ω
                </text>
                <text x="236" y="134" className="font-mono text-xs font-bold fill-sky-700">+</text>
                <text x="332" y="134" className="font-mono text-xs font-bold fill-sky-700">−</text>

                {/* Rama superior derecha R2 */}
                <line x1="398" y1="110" x2="472" y2="110" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="472,110 480,96 494,124 508,96 522,124 536,96 550,124 558,110"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="3"
                />
                <line x1="558" y1="110" x2="635" y2="110" stroke="#0f172a" strokeWidth="2.5" />
                <text x="515" y="84" textAnchor="middle" className="font-mono text-sm font-bold fill-emerald-950">
                  R₂ = {r2} Ω
                </text>
                <text x="466" y="134" className="font-mono text-xs font-bold fill-emerald-700">+</text>
                <text x="562" y="134" className="font-mono text-xs font-bold fill-emerald-700">−</text>

                {/* Rama derecha cierre */}
                <line x1="635" y1="110" x2="635" y2="340" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama inferior cierre */}
                <line x1="160" y1="340" x2="635" y2="340" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama izquierda Fuente V1 — Etiqueta AFUERA a la izquierda */}
                <line x1="160" y1="110" x2="160" y2="198" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="160" cy="225" r="26" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x="160" y="219" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">+</text>
                <text x="160" y="239" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">−</text>
                <rect x="14" y="210" width="104" height="30" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <text x="66" y="229" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-950">
                  V₁ = {v1} V
                </text>
                <line x1="160" y1="251" x2="160" y2="340" stroke="#0f172a" strokeWidth="2.5" />

                {/* RAMA CENTRAL COMPARTIDA: Fuente de Corriente Is + Resistor en serie */}
                <g opacity={isolateCentralBranch ? 0.30 : 1} className="transition-opacity duration-200">
                  <rect
                    x="346"
                    y="122"
                    width="104"
                    height="206"
                    rx="10"
                    fill={isolateCentralBranch ? '#fef2f2' : 'rgba(79, 70, 229, 0.06)'}
                    stroke={isolateCentralBranch ? '#dc2626' : '#4f46e5'}
                    strokeWidth="2"
                    strokeDasharray="5 4"
                  />
                  <line x1="398" y1="110" x2="398" y2="138" stroke="#0f172a" strokeWidth="2.5" />
                  {/* Resistor en serie en la rama central */}
                  <polyline
                    points="398,138 386,144 410,154 386,164 410,174 386,184 398,190"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="2.5"
                  />
                  <text x="442" y="168" textAnchor="end" className="font-mono text-[11px] font-bold fill-slate-600">
                    {rSeriesCentral}Ω
                  </text>

                  <line x1="398" y1="190" x2="398" y2="222" stroke="#0f172a" strokeWidth="2.5" />
                  {/* Fuente de Corriente Central (Hacia arriba: coincide con i2, se opone a i1) */}
                  <circle cx="398" cy="248" r="25" fill="#ffffff" stroke="#dc2626" strokeWidth="2.8" />
                  <line x1="398" y1="264" x2="398" y2="232" stroke="#dc2626" strokeWidth="2.8" markerEnd="url(#m4-arrow-real)" />
                  <line x1="398" y1="273" x2="398" y2="340" stroke="#0f172a" strokeWidth="2.5" />
                </g>

                {/* Etiqueta de la Fuente de Corriente Compartida (Siempre legible) */}
                <rect x="348" y="286" width="100" height="24" rx="5" fill="#ffffff" stroke="#dc2626" strokeWidth="1.5" />
                <text x="398" y="302" textAnchor="middle" className="font-mono text-xs font-bold fill-red-700">
                  I<tspan dy="3" fontSize="9">s</tspan><tspan dy="-3"> = {isCentral} A (↑)</tspan>
                </text>

                {/* Bucle de Corriente de Malla i1 (Centro x=262, y=210) + Etiqueta Debajo */}
                <path
                  d="M 234 210 A 28 28 0 1 1 262 238"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  markerEnd="url(#m4-arrow-i1)"
                />
                <text x="262" y="214" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-700">
                  i₁
                </text>
                <rect x="200" y="254" width="124" height="26" rx="6" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.2" />
                <text x="262" y="271" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-900">
                  i₁ = {i1.toFixed(2)} A
                </text>

                {/* Bucle de Corriente de Malla i2 (Centro x=532, y=210) + Etiqueta Debajo */}
                <path
                  d="M 504 210 A 28 28 0 1 1 532 238"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  markerEnd="url(#m4-arrow-i2)"
                />
                <text x="532" y="214" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">
                  i₂
                </text>
                <rect x="470" y="254" width="124" height="26" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
                <text x="532" y="271" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-900">
                  i₂ = {i2.toFixed(2)} A
                </text>

                {/* Flechas de Corrientes de Rama I1 e I2 separadas de R1 y R2 */}
                {!showRealDirections ? (
                  <g>
                    <line x1="172" y1="92" x2="218" y2="92" stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#m4-arrow-i1)" />
                    <text x="195" y="78" textAnchor="middle" className="font-mono text-[11px] font-bold fill-sky-700">
                      I₁ (sup.)
                    </text>
                  </g>
                ) : (
                  <g>
                    {I1 < 0 ? (
                      <>
                        <line x1="218" y1="92" x2="172" y2="92" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#m4-arrow-real)" />
                        <text x="195" y="78" textAnchor="middle" className="font-mono text-[11px] font-bold fill-red-600">
                          I₁ real ({Math.abs(I1).toFixed(1)}A ←)
                        </text>
                      </>
                    ) : (
                      <>
                        <line x1="172" y1="92" x2="218" y2="92" stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#m4-arrow-i1)" />
                        <text x="195" y="78" textAnchor="middle" className="font-mono text-[11px] font-bold fill-sky-700">
                          I₁ real ({I1.toFixed(1)}A →)
                        </text>
                      </>
                    )}
                  </g>
                )}

                <line x1="575" y1="92" x2="621" y2="92" stroke="#059669" strokeWidth="2.2" markerEnd="url(#m4-arrow-i2)" />
                <text x="598" y="78" textAnchor="middle" className="font-mono text-[11px] font-bold fill-emerald-700">
                  I₂ ({I2.toFixed(1)}A)
                </text>

                {/* Nodos b y e con pastillas de fondo para no chocar con líneas */}
                <circle cx="398" cy="110" r="4.5" fill="#0f172a" />
                <rect x="352" y="74" width="92" height="22" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="398" y="89" textAnchor="middle" className="font-mono text-[11px] font-bold fill-slate-800">
                  Nodo b (LCK)
                </text>

                <circle cx="398" cy="340" r="4.5" fill="#0f172a" />
                <rect x="366" y="350" width="64" height="20" rx="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="398" y="364" textAnchor="middle" className="font-mono text-[11px] font-bold fill-slate-800">
                  Nodo e
                </text>
              </svg>
            </div>
          </div>

          {/* Tarjetas Resumen de Resultados */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-lg bg-sky-50 border border-sky-200">
              <div className="text-xs font-semibold text-sky-900">Corriente I₁ = i₁</div>
              <div className="text-xl font-mono font-bold text-sky-950 tabular-nums">{I1.toFixed(2)} A</div>
              <div className="text-[11px] text-sky-800 mt-0.5">
                {I1 < 0 ? 'Signo (−): Sentido real opuesto al horario' : 'Sentido real coincide con el horario'}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-xs font-semibold text-emerald-900">Corriente I₂ = i₂</div>
              <div className="text-xl font-mono font-bold text-emerald-950 tabular-nums">{I2.toFixed(2)} A</div>
              <div className="text-[11px] text-emerald-800 mt-0.5">
                {I2 >= 0 ? 'Signo (+): Sentido real horario' : 'Signo (−): Sentido real antihorario'}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-xs font-semibold text-amber-900">Verificación LCK Central</div>
              <div className="text-xl font-mono font-bold text-amber-950 tabular-nums">
                i₂ − i₁ = {(i2 - i1).toFixed(2)} A
              </div>
              <div className="text-[11px] text-amber-800 mt-0.5">
                Cumple restricción: {i2.toFixed(1)} − ({i1.toFixed(1)}) = {isCentral} A
              </div>
            </div>
          </div>
        </div>

        {/* ZONA DERECHA (5 cols): Controles y Sistema de Ecuaciones de la Supermalla */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Controles */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                Parámetros de la Supermalla
              </h3>
              {isControlCase && (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Caso Control Activo
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m4-v1" className="text-slate-700">Fuente V₁:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{v1} V</span>
                </div>
                <input
                  id="m4-v1"
                  type="range"
                  min="4"
                  max="40"
                  step="2"
                  value={v1}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m4-is" className="text-red-700 font-semibold">
                    Fuente Central I<sub className="text-[10px]">s</sub> (↑):
                  </label>
                  <span className="font-mono font-bold text-red-700 tabular-nums">{isCentral} A</span>
                </div>
                <input
                  id="m4-is"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={isCentral}
                  onChange={(e) => setIsCentral(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m4-r1" className="text-slate-700">Resistencia Malla 1 (R₁):</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{r1} Ω</span>
                </div>
                <input
                  id="m4-r1"
                  type="range"
                  min="2"
                  max="16"
                  step="1"
                  value={r1}
                  onChange={(e) => setR1(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="m4-r2" className="text-slate-700">Resistencia Malla 2 (R₂):</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{r2} Ω</span>
                </div>
                <input
                  id="m4-r2"
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={r2}
                  onChange={(e) => setR2(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Planteamiento del Sistema de Ecuaciones de Supermalla */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex-1 flex flex-col justify-between">
            <div className="space-y-3.5">
              <h3 className="text-base font-bold text-slate-900">
                Formulación Matemática de la Supermalla
              </h3>

              {/* Ecuación 1: LVK en la Supermalla */}
              <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 space-y-1">
                <div className="text-xs font-bold text-amber-900">
                  1. Ecuación de LVK en la Supermalla (Contorno Exterior):
                </div>
                <div className="font-mono text-xs sm:text-sm text-amber-950">
                  −V₁ + R₁·i₁ + R₂·i₂ = 0
                </div>
                <div className="font-mono text-sm font-bold text-slate-900 pt-1 border-t border-amber-200/80">
                  {r1}·i₁ + {r2}·i₂ = {v1}
                </div>
              </div>

              {/* Ecuación 2: Restricción LCK en la rama compartida */}
              <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 space-y-1">
                <div className="text-xs font-bold text-red-900">
                  2. Ecuación de Restricción en la Rama Central (LCK):
                </div>
                <div className="text-xs text-red-800">
                  En la rama central, <code className="font-mono font-bold">i₂</code> sube (mismo sentido que{' '}
                  <code className="font-mono font-bold">
                    I<sub className="text-[10px]">s</sub>
                  </code>
                  ) e <code className="font-mono font-bold">i₁</code> baja:
                </div>
                <div className="font-mono text-sm font-bold text-red-950 pt-1">
                  i₂ − i₁ = {isCentral}  ⇒  i₂ = i₁ + {isCentral}
                </div>
              </div>

              {/* Paso 3: Sustitución y Solución */}
              <div className="p-3.5 rounded-lg bg-slate-900 text-white space-y-1.5">
                <div className="text-xs font-semibold text-amber-300">
                  3. Resolución del Sistema (LVK Supermalla + Restricción LCK):
                </div>
                <div className="font-mono text-xs text-slate-300">
                  {r1}·i₁ + {r2}(i₁ + {isCentral}) = {v1} ⇒ {r1 + r2}·i₁ = {v1 - r2 * isCentral}
                </div>
                <div className="font-mono text-sm font-bold text-white pt-1 border-t border-slate-800">
                  I₁ = i₁ = {I1.toFixed(2)} A  ·  I₂ = i₂ = {I2.toFixed(2)} A
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
