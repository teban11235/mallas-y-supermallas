import React, { useState } from 'react';
import {
  CircuitBoard,
  Layers,
  Sliders,
  Zap,
  GitBranch,
  CheckSquare,
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { Module1Concepts } from './components/Module1Concepts';
import { Module2MeshLVK } from './components/Module2MeshLVK';
import { Module3Case1CurrentSource } from './components/Module3Case1CurrentSource';
import { Module4Supermesh } from './components/Module4Supermesh';
import { Module5ConceptMap } from './components/Module5ConceptMap';
import { Module6Quiz } from './components/Module6Quiz';

type ModuleId = 'mod1' | 'mod2' | 'mod3' | 'mod4' | 'mod5' | 'mod6';

interface ModuleMeta {
  id: ModuleId;
  shortLabel: string;
  fullTitle: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MODULES: ModuleMeta[] = [
  {
    id: 'mod1',
    shortLabel: '01. Conceptos Base',
    fullTitle: 'Lazo, Malla y Corriente de Malla',
    subtitle: 'Topología, rama compartida y comparativa con Análisis Nodal',
    icon: Layers
  },
  {
    id: 'mod2',
    shortLabel: '02. Simulador LVK',
    fullTitle: 'Análisis de Mallas sin Fuentes de Corriente',
    subtitle: 'Ecuaciones de LVK y caso guiado de control (1A, 1A, 0A)',
    icon: Sliders
  },
  {
    id: 'mod3',
    shortLabel: '03. Caso 1: Fuente Única',
    fullTitle: 'Fuente de Corriente en una Sola Malla',
    subtitle: 'Fijación directa de corriente (iₖ = ±Iₛ) y signos',
    icon: Zap
  },
  {
    id: 'mod4',
    shortLabel: '04. Caso 2: Supermalla',
    fullTitle: 'Fuente de Corriente entre Dos Mallas',
    subtitle: 'Periferia de superlazo y restricción LCK (−3.2A, 2.8A)',
    icon: CircuitBoard
  },
  {
    id: 'mod5',
    shortLabel: '05. Mapa Conceptual',
    fullTitle: 'Mapa Conceptual y Glosario Interactivo',
    subtitle: 'Flujo de decisión y constructor de proposiciones',
    icon: GitBranch
  },
  {
    id: 'mod6',
    shortLabel: '06. Autoevaluación',
    fullTitle: 'Autoevaluación Calificada (14 Reactivos)',
    subtitle: 'Validación con retroalimentación inmediata y emparejamiento',
    icon: CheckSquare
  }
];

export default function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('mod1');

  const currentModuleIndex = MODULES.findIndex((m) => m.id === activeModule);
  const nextModule = MODULES[(currentModuleIndex + 1) % MODULES.length];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Bar Contract: 3 Zonas con gap-8 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zona 1: Brand Title (una sola línea, sin subtítulos anexos) */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('mod1');
            }}
            className="text-lg font-bold tracking-tight text-slate-900 font-display whitespace-nowrap shrink-0"
          >
            Circuitos Eléctricos
          </a>

          {/* Zona 2: 5 enlaces de navegación concisos en una sola línea */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveModule('mod1')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeModule === 'mod1' ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-sky-600 decoration-2' : ''
              }`}
            >
              Conceptos
            </button>
            <button
              onClick={() => setActiveModule('mod2')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeModule === 'mod2' ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-sky-600 decoration-2' : ''
              }`}
            >
              Mallas LVK
            </button>
            <button
              onClick={() => setActiveModule('mod3')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeModule === 'mod3' ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-sky-600 decoration-2' : ''
              }`}
            >
              Caso 1
            </button>
            <button
              onClick={() => setActiveModule('mod4')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeModule === 'mod4' ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-sky-600 decoration-2' : ''
              }`}
            >
              Supermalla
            </button>
            <button
              onClick={() => setActiveModule('mod5')}
              className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 ${
                activeModule === 'mod5' ? 'text-slate-900 font-semibold underline underline-offset-8 decoration-sky-600 decoration-2' : ''
              }`}
            >
              Mapa Conceptual
            </button>
          </nav>

          {/* Zona 3: 1 Acción Principal */}
          <div className="flex items-center shrink-0">
            <button
              onClick={() => setActiveModule('mod6')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeModule === 'mod6'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              Autoevaluación (14 Reactivos)
            </button>
          </div>
        </div>
      </header>

      {/* Banner Académico Institucional con Nombre del Docente */}
      <section id="top" className="bg-white border-b border-slate-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-1.5">
              {/* Metadatos limpios con separadores tipográficos (Zero-Pill Discipline) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <span>Facultad de Ingenierías y Arquitectura</span>
                <span aria-hidden="true">·</span>
                <span>Carrera de Redes y Analítica de Datos</span>
                <span aria-hidden="true">·</span>
                <span>Guía Didáctica Interactiva</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Análisis de Lazo (Mallas) y Supermallas en Corriente Continua
              </h1>
            </div>

            {/* Tarjeta de Autoría Docente */}
            <div className="flex items-center gap-3.5 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">Docente / Autor</div>
                <div className="text-sm font-bold text-slate-900">Esteban Briceño Sánchez</div>
              </div>
            </div>
          </div>

          {/* Barra de Selección de los 6 Módulos Interactivos */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {MODULES.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50/70 text-slate-700 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-bold whitespace-nowrap truncate ${isActive ? 'text-sky-300' : 'text-slate-900'}`}>
                      {mod.shortLabel}
                    </span>
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
                  </div>
                  <div className={`text-[11px] leading-tight line-clamp-2 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                    {mod.fullTitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contenido Principal del Módulo Activo */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
        {activeModule === 'mod1' && <Module1Concepts />}
        {activeModule === 'mod2' && <Module2MeshLVK />}
        {activeModule === 'mod3' && <Module3Case1CurrentSource />}
        {activeModule === 'mod4' && <Module4Supermesh />}
        {activeModule === 'mod5' && <Module5ConceptMap />}
        {activeModule === 'mod6' && <Module6Quiz />}

        {/* Navegación Inferior entre Módulos */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            <span>Módulo actual: </span>
            <strong className="text-slate-800">
              {MODULES[currentModuleIndex].fullTitle}
            </strong>
          </div>
          <button
            onClick={() => setActiveModule(nextModule.id)}
            className="px-4 py-2.5 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span>Continuar a {nextModule.shortLabel}: {nextModule.fullTitle}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Pie de Página Académico */}
      <footer className="bg-white border-t border-slate-200 px-6 py-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold text-slate-900">Circuitos Eléctricos</span>
            <span aria-hidden="true">·</span>
            <span>Docente: Esteban Briceño Sánchez</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span>Facultad de Ingenierías y Arquitectura</span>
            <span aria-hidden="true">·</span>
            <span>Carrera de Redes y Analítica de Datos</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
