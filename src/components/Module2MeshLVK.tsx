import React, { useState } from 'react';
import { Sliders, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const Module2MeshLVK: React.FC = () => {
  const [mode, setMode] = useState<'guided' | 'sandbox'>('guided');
  const [step, setStep] = useState<number>(1);
  const [hoveredTerm, setHoveredTerm] = useState<'V1' | 'R1' | 'R3' | 'R2' | 'V2' | null>(null);

  // Parámetros del circuito (Por defecto calibrados al caso de control: i1 = 1 A, i2 = 1 A, I3 = 0 A)
  const [v1, setV1] = useState<number>(10);
  const [v2, setV2] = useState<number>(10);
  const [r1, setR1] = useState<number>(10);
  const [r2, setR2] = useState<number>(10);
  const [r3, setR3] = useState<number>(5);

  // Resolución analítica del sistema 2x2:
  // (R1 + R3)*i1 - R3*i2 = V1
  // -R3*i1 + (R2 + R3)*i2 = V2
  const a11 = r1 + r3;
  const a12 = -r3;
  const a21 = -r3;
  const a22 = r2 + r3;
  const det = a11 * a22 - a12 * a21;

  const i1 = det !== 0 ? (v1 * a22 - v2 * a12) / det : 0;
  const i2 = det !== 0 ? (a11 * v2 - a21 * v1) / det : 0;
  const I1 = i1;
  const I2 = i2;
  const I3 = i1 - i2;
  const vR3 = r3 * I3;

  const loadControlCase = () => {
    setV1(10);
    setV2(10);
    setR1(10);
    setR2(10);
    setR3(5);
  };

  const loadAsymmetricCase = () => {
    setV1(24);
    setV2(6);
    setR1(4);
    setR2(2);
    setR3(6);
  };

  const guidedSteps = [
    {
      num: 1,
      title: 'Paso 1: Identificar mallas internas y asignar corrientes (i₁, i₂)',
      desc: 'Se identifican las dos mallas elementales del circuito planar y se asignan las corrientes de malla i₁ e i₂ en el sentido de las manecillas del reloj (horario). También se etiquetan las corrientes reales de rama I₁, I₂ e I₃.'
    },
    {
      num: 2,
      title: 'Paso 2: Aplicar LVK en la Malla 1 (Rama compartida: i₁ − i₂)',
      desc: 'Recorriendo la Malla 1 en sentido horario: pasamos por la fuente V₁ (de − a +, caída −V₁), luego por R₁ (caída +R₁·i₁) y finalmente descendemos por la rama compartida R₃ donde i₁ baja e i₂ sube, produciendo una caída +R₃(i₁ − i₂) = 0.'
    },
    {
      num: 3,
      title: 'Paso 3: Aplicar LVK en la Malla 2 (Rama compartida: i₂ − i₁)',
      desc: 'Recorriendo la Malla 2 en sentido horario: subimos por la resistencia compartida R₃ donde ahora i₂ es la corriente propia de la malla e i₁ se opone (+R₃(i₂ − i₁)), pasamos por R₂ (+R₂·i₂) y cerramos por la fuente V₂.'
    },
    {
      num: 4,
      title: 'Paso 4: Resolver el sistema y verificar corrientes de rama (Caso Control)',
      desc: 'Al resolver las dos ecuaciones simultáneas se obtienen i₁ e i₂. Con los valores de control, i₁ = 1.00 A e i₂ = 1.00 A, por lo que en la rama central I₃ = i₁ − i₂ = 0.00 A (las dos corrientes de malla se cancelan exactamente en R₃).'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Barra Superior de Control del Laboratorio */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="text-xs font-medium text-slate-500 flex items-center gap-2 mb-1">
              <span>Módulo 02</span>
              <span aria-hidden="true">·</span>
              <span>Circuitos Resistivos en DC sin Fuentes de Corriente</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Simulador de Análisis de Mallas mediante LVK y Rama Compartida
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
                Modo Clase Guiada (Paso a Paso)
              </button>
              <button
                onClick={() => setMode('sandbox')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  mode === 'sandbox' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Modo Laboratorio Libre
              </button>
            </div>

            <button
              onClick={loadControlCase}
              className="px-3 py-2 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors whitespace-nowrap shrink-0"
            >
              Cargar Caso de Control (i₁=1A, i₂=1A, I₃=0A)
            </button>
            <button
              onClick={loadAsymmetricCase}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0"
            >
              Caso Asimétrico (I₃ ≠ 0)
            </button>
          </div>
        </div>

        {/* Barra de Progreso Paso a Paso (Modo Guiado) */}
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

      {/* Layout de Dos Zonas: Izquierda (Esquemático SVG + Medidores) / Derecha (Controles + Ecuaciones) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ZONA IZQUIERDA (7 cols): Diagrama del Circuito Interactivo */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-sm font-bold text-slate-900">
                Esquemático Dinámico (Pasa el cursor sobre las ecuaciones para iluminar cada elemento)
              </span>
              <span className="text-xs font-mono text-slate-500">
                Convención: Sentido Horario
              </span>
            </div>

            <div className="schematic-grid border border-slate-200 rounded-xl p-4 relative">
              <svg viewBox="0 0 780 410" className="w-full h-auto select-none">
                <defs>
                  <marker id="m2-arrow-i1" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#0284c7" />
                  </marker>
                  <marker id="m2-arrow-i2" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#059669" />
                  </marker>
                  <marker id="m2-arrow-i3" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <path d="M0,1 L7,4 L0,7 Z" fill="#4f46e5" />
                  </marker>
                </defs>

                {/* Resaltado de Malla según el Paso Guiado */}
                {mode === 'guided' && step === 2 && (
                  <rect
                    x="156"
                    y="98"
                    width="224"
                    height="224"
                    rx="10"
                    fill="rgba(2, 132, 199, 0.09)"
                    stroke="#0284c7"
                    strokeWidth="3"
                    strokeDasharray="8 5"
                    className="animate-flow-cw"
                  />
                )}
                {mode === 'guided' && step === 3 && (
                  <rect
                    x="400"
                    y="98"
                    width="224"
                    height="224"
                    rx="10"
                    fill="rgba(5, 150, 105, 0.09)"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeDasharray="8 5"
                    className="animate-flow-cw"
                  />
                )}

                {/* Halos de resaltado al pasar el mouse sobre términos de la ecuación */}
                {hoveredTerm === 'R1' && (
                  <rect x="232" y="62" width="106" height="56" rx="8" fill="rgba(2, 132, 199, 0.14)" stroke="#0284c7" strokeWidth="2" />
                )}
                {hoveredTerm === 'R2' && (
                  <rect x="462" y="62" width="106" height="56" rx="8" fill="rgba(5, 150, 105, 0.14)" stroke="#059669" strokeWidth="2" />
                )}
                {hoveredTerm === 'R3' && (
                  <rect x="342" y="150" width="96" height="122" rx="8" fill="rgba(79, 70, 229, 0.14)" stroke="#4f46e5" strokeWidth="2" />
                )}
                {hoveredTerm === 'V1' && (
                  <circle cx="150" cy="210" r="36" fill="rgba(37, 99, 235, 0.14)" stroke="#2563eb" strokeWidth="2" />
                )}
                {hoveredTerm === 'V2' && (
                  <circle cx="630" cy="210" r="36" fill="rgba(37, 99, 235, 0.14)" stroke="#2563eb" strokeWidth="2" />
                )}

                {/* Conductores y Resistores (x: 150 a 630, y: 90 a 330) */}
                {/* Rama superior izquierda (R1) */}
                <line x1="150" y1="90" x2="242" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="242,90 250,76 264,104 278,76 292,104 306,76 320,104 328,90"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <line x1="328" y1="90" x2="390" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <text x="285" y="62" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-900">
                  R₁ = {r1} Ω
                </text>
                {/* Polaridad LVK en R1 */}
                <text x="236" y="114" className="font-mono text-xs font-bold fill-sky-700">+</text>
                <text x="332" y="114" className="font-mono text-xs font-bold fill-sky-700">−</text>

                {/* Rama superior derecha (R2) */}
                <line x1="390" y1="90" x2="472" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="472,90 480,76 494,104 508,76 522,104 536,76 550,104 558,90"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <line x1="558" y1="90" x2="630" y2="90" stroke="#0f172a" strokeWidth="2.5" />
                <text x="515" y="62" textAnchor="middle" className="font-mono text-sm font-bold fill-slate-900">
                  R₂ = {r2} Ω
                </text>
                {/* Polaridad LVK en R2 */}
                <text x="466" y="114" className="font-mono text-xs font-bold fill-emerald-700">+</text>
                <text x="562" y="114" className="font-mono text-xs font-bold fill-emerald-700">−</text>

                {/* Conductor inferior */}
                <line x1="150" y1="330" x2="630" y2="330" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama izquierda V1 — Etiqueta colocada AFUERA a la izquierda */}
                <line x1="150" y1="90" x2="150" y2="184" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="150" cy="210" r="26" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x="150" y="204" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">+</text>
                <text x="150" y="224" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">−</text>
                <rect x="14" y="195" width="102" height="30" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <text x="65" y="214" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-950">
                  V₁ = {v1} V
                </text>
                <line x1="150" y1="236" x2="150" y2="330" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama derecha V2 — Etiqueta colocada AFUERA a la derecha */}
                <line x1="630" y1="90" x2="630" y2="184" stroke="#0f172a" strokeWidth="2.5" />
                <circle cx="630" cy="210" r="26" fill="#ffffff" stroke="#2563eb" strokeWidth="2.5" />
                <text x="630" y="204" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">−</text>
                <text x="630" y="224" textAnchor="middle" className="font-mono text-base font-bold fill-blue-700">+</text>
                <rect x="664" y="195" width="102" height="30" rx="6" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
                <text x="715" y="214" textAnchor="middle" className="font-mono text-xs font-bold fill-blue-950">
                  V₂ = {v2} V
                </text>
                <line x1="630" y1="236" x2="630" y2="330" stroke="#0f172a" strokeWidth="2.5" />

                {/* Rama Central Compartida (R3) */}
                <line x1="390" y1="90" x2="390" y2="165" stroke="#0f172a" strokeWidth="2.5" />
                <polyline
                  points="390,165 376,173 404,187 376,201 404,215 376,229 404,243 390,251"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
                <line x1="390" y1="251" x2="390" y2="330" stroke="#0f172a" strokeWidth="2.5" />

                {/* Etiqueta de R3 con fondo blanco limpio sobre el tramo inferior de la rama central */}
                <rect x="342" y="274" width="96" height="24" rx="5" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.2" />
                <text x="390" y="290" textAnchor="middle" className="font-mono text-xs font-bold fill-indigo-950">
                  R₃ = {r3} Ω
                </text>

                {/* Signos de Polaridad en R3 para Malla 1 (izquierda) y Malla 2 (derecha) */}
                <text x="366" y="168" textAnchor="end" className="font-mono text-[11px] font-bold fill-sky-700">+(M1)</text>
                <text x="366" y="252" textAnchor="end" className="font-mono text-[11px] font-bold fill-sky-700">−(M1)</text>
                <text x="414" y="168" textAnchor="start" className="font-mono text-[11px] font-bold fill-emerald-700">−(M2)</text>
                <text x="414" y="252" textAnchor="start" className="font-mono text-[11px] font-bold fill-emerald-700">+(M2)</text>

                {/* Corrientes de Rama I1, I2, I3 */}
                <line x1="168" y1="70" x2="218" y2="70" stroke="#0284c7" strokeWidth="2.2" markerEnd="url(#m2-arrow-i1)" />
                <text x="193" y="58" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-700">
                  I₁={I1.toFixed(2)}A
                </text>

                <line x1="406" y1="70" x2="456" y2="70" stroke="#059669" strokeWidth="2.2" markerEnd="url(#m2-arrow-i2)" />
                <text x="431" y="58" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">
                  I₂={I2.toFixed(2)}A
                </text>

                <line x1="410" y1="104" x2="410" y2="146" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#m2-arrow-i3)" />
                <text x="422" y="130" textAnchor="start" className="font-mono text-xs font-bold fill-indigo-700">
                  I₃={I3.toFixed(2)}A
                </text>

                {/* Bucle de Corriente de Malla i1 (Centro x=255, y=195) + Etiqueta Debajo */}
                <path
                  d="M 227 195 A 28 28 0 1 1 255 223"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  markerEnd="url(#m2-arrow-i1)"
                />
                <text x="255" y="199" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-700">
                  i₁
                </text>
                <rect x="197" y="238" width="116" height="26" rx="6" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.2" />
                <text x="255" y="255" textAnchor="middle" className="font-mono text-xs font-bold fill-sky-900">
                  i₁ = {i1.toFixed(2)} A
                </text>

                {/* Bucle de Corriente de Malla i2 (Centro x=525, y=195) + Etiqueta Debajo */}
                <path
                  d="M 497 195 A 28 28 0 1 1 525 223"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  markerEnd="url(#m2-arrow-i2)"
                />
                <text x="525" y="199" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-700">
                  i₂
                </text>
                <rect x="467" y="238" width="116" height="26" rx="6" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
                <text x="525" y="255" textAnchor="middle" className="font-mono text-xs font-bold fill-emerald-900">
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

          {/* Tarjetas de Lectura de Instrumentos / Verificación de Control */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-sky-50 border border-sky-200">
              <div className="text-xs text-sky-800 font-medium">Malla 1 (I₁ = i₁)</div>
              <div className="text-lg font-mono font-bold text-sky-950 tabular-nums">{I1.toFixed(2)} A</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="text-xs text-emerald-800 font-medium">Malla 2 (I₂ = i₂)</div>
              <div className="text-lg font-mono font-bold text-emerald-950 tabular-nums">{I2.toFixed(2)} A</div>
            </div>
            <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-200">
              <div className="text-xs text-indigo-800 font-medium">Rama Central (I₃ = i₁−i₂)</div>
              <div className="text-lg font-mono font-bold text-indigo-950 tabular-nums">{I3.toFixed(2)} A</div>
            </div>
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-xs text-amber-800 font-medium">Tensión en R₃</div>
              <div className="text-lg font-mono font-bold text-amber-950 tabular-nums">{vR3.toFixed(2)} V</div>
            </div>
          </div>
        </div>

        {/* ZONA DERECHA (5 cols): Controles Deslizantes y Planteamiento Algebraico LVK */}
        <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
          {/* Panel de Parámetros del Circuito */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-sky-600" />
                Parámetros del Circuito (DC)
              </h3>
              {Math.abs(i1 - 1) < 0.01 && Math.abs(i2 - 1) < 0.01 && (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Control Activo (1A, 1A, 0A)
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="slider-v1" className="text-slate-700">Fuente V₁:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{v1} V</span>
                </div>
                <input
                  id="slider-v1"
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={v1}
                  onChange={(e) => setV1(Number(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="slider-v2" className="text-slate-700">Fuente V₂:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{v2} V</span>
                </div>
                <input
                  id="slider-v2"
                  type="range"
                  min="2"
                  max="30"
                  step="1"
                  value={v2}
                  onChange={(e) => setV2(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="slider-r1" className="text-slate-700">Resistor R₁:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{r1} Ω</span>
                </div>
                <input
                  id="slider-r1"
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={r1}
                  onChange={(e) => setR1(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="slider-r2" className="text-slate-700">Resistor R₂:</label>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">{r2} Ω</span>
                </div>
                <input
                  id="slider-r2"
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={r2}
                  onChange={(e) => setR2(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
              </div>

              <div className="sm:col-span-2">
                <div className="flex justify-between text-xs font-medium mb-1">
                  <label htmlFor="slider-r3" className="text-slate-700">Resistor Central Compartido R₃:</label>
                  <span className="font-mono font-bold text-indigo-700 tabular-nums">{r3} Ω</span>
                </div>
                <input
                  id="slider-r3"
                  type="range"
                  min="1"
                  max="20"
                  step="1"
                  value={r3}
                  onChange={(e) => setR3(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Panel de Planteamiento Sistemático de Ecuaciones LVK */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                Planteamiento de Ecuaciones de Malla (LVK)
              </h3>

              {/* Ecuación Malla 1 */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-xs font-bold text-sky-800">
                  1. LVK en Malla 1 (Recorrido horario a → b → e → f → a):
                </div>
                <div className="font-mono text-xs sm:text-sm text-slate-800 flex flex-wrap items-center gap-1">
                  <span
                    onMouseEnter={() => setHoveredTerm('V1')}
                    onMouseLeave={() => setHoveredTerm(null)}
                    className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 cursor-pointer hover:bg-blue-100"
                  >
                    −V₁
                  </span>
                  <span>+</span>
                  <span
                    onMouseEnter={() => setHoveredTerm('R1')}
                    onMouseLeave={() => setHoveredTerm(null)}
                    className="px-1.5 py-0.5 rounded bg-sky-50 text-sky-900 cursor-pointer hover:bg-sky-100"
                  >
                    R₁·i₁
                  </span>
                  <span>+</span>
                  <span
                    onMouseEnter={() => setHoveredTerm('R3')}
                    onMouseLeave={() => setHoveredTerm(null)}
                    className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-900 font-semibold cursor-pointer hover:bg-indigo-100"
                  >
                    R₃(i₁ − i₂)
                  </span>
                  <span>= 0</span>
                </div>
                <div className="font-mono text-xs text-slate-600 pt-1 border-t border-slate-200/80">
                  Sustituyendo: <strong className="text-slate-900">{a11}·i₁ − {r3}·i₂ = {v1}</strong>
                </div>
              </div>

              {/* Ecuación Malla 2 */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="text-xs font-bold text-emerald-800">
                  2. LVK en Malla 2 (Recorrido horario b → c → d → e → b):
                </div>
                <div className="font-mono text-xs sm:text-sm text-slate-800 flex flex-wrap items-center gap-1">
                  <span
                    onMouseEnter={() => setHoveredTerm('R3')}
                    onMouseLeave={() => setHoveredTerm(null)}
                    className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-900 font-semibold cursor-pointer hover:bg-indigo-100"
                  >
                    R₃(i₂ − i₁)
                  </span>
                  <span>+</span>
                  <span
                    onMouseEnter={() => setHoveredTerm('R2')}
                    onMouseLeave={() => setHoveredTerm(null)}
                    className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-900 cursor-pointer hover:bg-emerald-100"
                  >
                    R₂·i₂
                  </span>
                  <span>−</span>
                  <span
                    onMouseEnter={() => setHoveredTerm('V2')}
                    onMouseLeave={() => setHoveredTerm(null)}
                    className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-900 cursor-pointer hover:bg-blue-100"
                  >
                    V₂
                  </span>
                  <span>= 0</span>
                </div>
                <div className="font-mono text-xs text-slate-600 pt-1 border-t border-slate-200/80">
                  Sustituyendo: <strong className="text-slate-900">−{r3}·i₁ + {a22}·i₂ = {v2}</strong>
                </div>
              </div>

              {/* Verificación de Control */}
              <div className="p-3.5 rounded-lg bg-slate-900 text-white space-y-1">
                <div className="text-xs font-semibold text-sky-300">
                  Solución del Sistema y Relaciones de Rama:
                </div>
                <div className="font-mono text-xs sm:text-sm">
                  I₁ = i₁ = <strong>{I1.toFixed(2)} A</strong> · I₂ = i₂ = <strong>{I2.toFixed(2)} A</strong>
                </div>
                <div className="font-mono text-xs sm:text-sm text-amber-300">
                  I₃ = i₁ − i₂ = {i1.toFixed(2)} − ({i2.toFixed(2)}) = <strong>{I3.toFixed(2)} A</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
