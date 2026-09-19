import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  filled?: boolean;
}

export function Icon({ name, className = '', style, title, filled = false }: IconProps) {
  const mergedStyle = filled ? { ...style, fontVariationSettings: "'FILL' 1" } : style;

  return (
    <span className={`material-symbols-outlined ${className}`} style={mergedStyle} data-icon={name} title={title}>
      {name}
    </span>
  );
}
