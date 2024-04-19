import 'react';

declare module 'react' {
  interface CSSProperties {
    '--pulsating-dot'?: string; // Specify your CSS variable here
  }
}