import React from 'react';

interface PulsatingDotProps {
  color?: string;
}

const PulsatingDot: React.FC<PulsatingDotProps> = ({ color = '#eee' }) => (
  <div
    className="pulsatingDot"
    style={{
      // Set the CSS variable here, correctly formatted for inline styles in React
      '--pulsating-dot': color,
    } as React.CSSProperties} // Ensuring the CSS variable is treated as a valid style property
  />
);

export default PulsatingDot;