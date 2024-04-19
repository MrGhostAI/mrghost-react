import React from 'react';
import './PulsatingDot.css';

export default ({ color = '#eee' }) => (
  <div
    className="pulsatingDot"
    style={{
      '--pulsating-dot': color, // Set the CSS variable here
    }}
  />
);
