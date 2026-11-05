import React from 'react';

/**
 * Convierte cadenas con notación de subíndices (ej. I_{rama}, i_{malla}, v_{a}, v_{b}, i_{k}, I_{s}, i_{m}, v_{N-1})
 * en elementos React con etiquetas <sub> reales para que nunca se muestre código LaTeX ni guiones bajos.
 */
export function formatMathText(text: string): React.ReactNode {
  const parts = text.split(/(\b[A-Za-z]+_\{[^}]+\}|\b[A-Za-z]+_[A-Za-z0-9()-]+)/g);
  return parts.map((part, idx) => {
    const matchBrace = part.match(/^([A-Za-z]+)_\{([^}]+)\}$/);
    if (matchBrace) {
      return (
        <span key={idx} className="font-mono">
          {matchBrace[1]}
          <sub className="text-[0.76em] leading-none">{matchBrace[2]}</sub>
        </span>
      );
    }
    const matchSimple = part.match(/^([A-Za-z]+)_([A-Za-z0-9()-]+)$/);
    if (matchSimple) {
      return (
        <span key={idx} className="font-mono">
          {matchSimple[1]}
          <sub className="text-[0.76em] leading-none">{matchSimple[2]}</sub>
        </span>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}
