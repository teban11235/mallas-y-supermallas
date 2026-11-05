import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/courseContent';
import { formatMathText } from '../utils/formatMath';

export const Module6Quiz: React.FC = () => {
  const [filterCat, setFilterCat] = useState<string>('Todas');
  // Estado de respuestas seleccionadas:
  // Para single/multiple: array de option ids seleccionados
  const [selectedOptions, setSelectedOptions] = useState<Record<number, string[]>>({});
  // Para pregunta de emparejamiento (pregunta 14): Record<leftId, rightId>
  const [matchingAnswers, setMatchingAnswers] = useState<Record<string, string>>({});
  // Estado de preguntas verificadas
  const [verifiedQuestions, setVerifiedQuestions] = useState<Record<number, boolean>>({});

  const filteredQuestions =
    filterCat === 'Todas'
      ? QUIZ_QUESTIONS
      : QUIZ_QUESTIONS.filter((q) => q.category === filterCat);

  const handleToggleOption = (q: QuizQuestion, optId: string) => {
    if (q.type === 'single') {
      setSelectedOptions((prev) => ({ ...prev, [q.id]: [optId] }));
      setVerifiedQuestions((prev) => ({ ...prev, [q.id]: true }));
    } else if (q.type === 'multiple') {
      const current = selectedOptions[q.id] || [];
      const next = current.includes(optId)
        ? current.filter((id) => id !== optId)
        : [...current, optId];
      setSelectedOptions((prev) => ({ ...prev, [q.id]: next }));
      setVerifiedQuestions((prev) => ({ ...prev, [q.id]: false }));
    }
  };

  const handleVerifyQuestion = (qId: number) => {
    setVerifiedQuestions((prev) => ({ ...prev, [qId]: true }));
  };

  const isQuestionCorrect = (q: QuizQuestion): boolean => {
    if (q.type === 'matching' && q.matchingPairs) {
      return q.matchingPairs.every((pair) => matchingAnswers[pair.leftId] === pair.rightId);
    }
    const chosen = selectedOptions[q.id] || [];
    const expected = q.correctAnswerIds || [];
    if (chosen.length !== expected.length) return false;
    return expected.every((id) => chosen.includes(id));
  };

  const totalAnswered = Object.keys(verifiedQuestions).filter((k) => verifiedQuestions[Number(k)]).length;
  const totalCorrect = QUIZ_QUESTIONS.filter(
    (q) => verifiedQuestions[q.id] && isQuestionCorrect(q)
  ).length;

  const resetAll = () => {
    setSelectedOptions({});
    setMatchingAnswers({});
    setVerifiedQuestions({});
  };

  const verifyAll = () => {
    const allVerified: Record<number, boolean> = {};
    QUIZ_QUESTIONS.forEach((q) => {
      allVerified[q.id] = true;
    });
    setVerifiedQuestions(allVerified);
  };

  return (
    <div className="space-y-6">
      {/* Encabezado y Tablero de Puntuación */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
          <div>
            <div className="text-xs font-medium text-slate-500 flex items-center gap-2 mb-1">
              <span>Módulo 06</span>
              <span aria-hidden="true">·</span>
              <span>Validación de Conocimientos (14 Reactivos)</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              Autoevaluación Interactiva: Análisis Nodal, Mallas, Supernodo y Supermalla
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-2 rounded-lg bg-slate-900 text-white font-mono text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="tabular-nums">
                Aciertos: <strong>{totalCorrect}</strong> / {QUIZ_QUESTIONS.length}
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-xs text-slate-300 tabular-nums">
                Verificadas: {totalAnswered}
              </span>
            </div>

            <button
              onClick={verifyAll}
              className="px-3 py-2 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-200 rounded-lg hover:bg-sky-100 transition-colors whitespace-nowrap shrink-0"
            >
              Mostrar Todas las Soluciones
            </button>

            <button
              onClick={resetAll}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reiniciar Autoevaluación
            </button>
          </div>
        </div>

        {/* Filtros por Tema */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-lg">
            {['Todas', 'Análisis de Mallas', 'Supermalla', 'Análisis Nodal', 'Supernodo'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  filterCat === cat ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            En preguntas de respuesta única la validación es inmediata; en preguntas de selección múltiple o emparejamiento haz clic en «Verificar Respuesta».
          </p>
        </div>
      </div>

      {/* Lista de los 14 Reactivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuestions.map((q) => {
          const isVerified = !!verifiedQuestions[q.id];
          const isCorrect = isQuestionCorrect(q);
          const chosen = selectedOptions[q.id] || [];

          return (
            <div
              key={q.id}
              className={`bg-white border rounded-xl p-6 shadow-xs flex flex-col justify-between transition-colors ${
                isVerified
                  ? isCorrect
                    ? 'border-emerald-300'
                    : 'border-red-300'
                  : 'border-slate-200'
              }`}
            >
              <div>
                {/* Cabecera del Reactivo */}
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                  <div className="flex items-center gap-1.5 font-medium">
                    <span className="font-mono font-bold text-slate-900">Pregunta {q.id}</span>
                    <span aria-hidden="true">·</span>
                    <span>{q.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {q.type === 'single'
                        ? 'Selección Única'
                        : q.type === 'multiple'
                        ? 'Selección Múltiple'
                        : 'Emparejamiento'}
                    </span>
                  </div>
                  {isVerified && (
                    <span
                      className={`font-semibold flex items-center gap-1 ${
                        isCorrect ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" /> Correcto
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" /> Revisar
                        </>
                      )}
                    </span>
                  )}
                </div>

                {/* Enunciado */}
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 leading-snug">
                  {formatMathText(q.question)}
                </h3>

                {q.hint && (
                  <p className="text-xs text-sky-800 font-medium mb-3">{q.hint}</p>
                )}

                {/* Opciones para Single / Multiple */}
                {(q.type === 'single' || q.type === 'multiple') && q.options && (
                  <div className="space-y-2 mt-3">
                    {q.options.map((opt) => {
                      const isSelected = chosen.includes(opt.id);
                      const isOptionCorrect = (q.correctAnswerIds || []).includes(opt.id);

                      let btnStyle = 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100';
                      if (isVerified) {
                        if (isOptionCorrect) {
                          btnStyle = 'bg-emerald-50 text-emerald-950 border-emerald-400 font-semibold';
                        } else if (isSelected && !isOptionCorrect) {
                          btnStyle = 'bg-red-50 text-red-950 border-red-400';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-sky-50 text-sky-950 border-sky-500 font-semibold';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleToggleOption(q, opt.id)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-start justify-between gap-3 ${btnStyle}`}
                        >
                          <span>
                            <strong className="font-mono mr-2">{opt.id}.</strong>
                            {formatMathText(opt.text)}
                          </span>
                          {isVerified && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Interfaz de Emparejamiento (Pregunta 14) */}
                {q.type === 'matching' && q.matchingPairs && (
                  <div className="space-y-3 mt-3">
                    {q.matchingPairs.map((pair) => {
                      const selectedRight = matchingAnswers[pair.leftId] || '';
                      return (
                        <div
                          key={pair.leftId}
                          className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                        >
                          <span className="text-xs sm:text-sm font-bold text-slate-900">
                            {pair.leftText}
                          </span>
                          <select
                            value={selectedRight}
                            onChange={(e) => {
                              setMatchingAnswers((prev) => ({
                                ...prev,
                                [pair.leftId]: e.target.value
                              }));
                              setVerifiedQuestions((prev) => ({ ...prev, [q.id]: false }));
                            }}
                            className="text-xs font-medium bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:border-sky-600"
                          >
                            <option value="">Selecciona la ley fundamental...</option>
                            <option value="1">1. LVK (Ley de Voltaje de Kirchhoff).</option>
                            <option value="2">2. LCK + ecuación de restricción (LVK).</option>
                            <option value="3">3. LCK (Ley de Corrientes de Kirchhoff).</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Botón de Verificación para Preguntas Múltiples o Emparejamiento y Retroalimentación */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                {(q.type === 'multiple' || q.type === 'matching') && !isVerified && (
                  <button
                    onClick={() => handleVerifyQuestion(q.id)}
                    className="px-4 py-2 text-xs font-semibold bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
                  >
                    Verificar Respuesta
                  </button>
                )}

                {isVerified && (
                  <div
                    className={`p-3.5 rounded-lg text-xs leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-200'
                        : 'bg-amber-50/90 text-amber-950 border border-amber-200'
                    }`}
                  >
                    <strong className="block mb-1 font-bold">
                      Justificación Académica:
                    </strong>
                    {formatMathText(q.explanation)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
