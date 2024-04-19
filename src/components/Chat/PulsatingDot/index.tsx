import React from 'react';
import './PulsatingDot.css';

export default ({ color = '#eee' } : { color?: string }) => (
  <div
    className="pulsatingDot"
    style={{
      '--pulsating-dot': color, // Set the CSS variable here
    }}
  />
);
