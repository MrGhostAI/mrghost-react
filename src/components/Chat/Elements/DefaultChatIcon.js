import React from 'react';

function DefaultChatIcon({ color1, color2, color3, width = '100%' }) {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      // xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="725 510 190 165"
      // style={{ enableBackground: 'new 725 1296 100 100' }}
      // xml:space="preserve"
      width={width}
    >
      <g>
        <g>
          <g>
            <path
              fill={color1}
              d="M804.56,515.95L804.56,515.95c43.3,0,78.4,35.1,78.4,78.4v0c0,43.3-35.1,78.4-78.4,78.4h0
              c-43.3,0-78.4-35.1-78.4-78.4v0C726.16,551.05,761.26,515.95,804.56,515.95z"
            />
            <path
              fill={color2}
              d="M834.21,515.95L834.21,515.95c43.3,0,78.4,35.1,78.4,78.4v78.4h-78.4c-43.3,0-78.4-35.1-78.4-78.4v0
              C755.81,551.05,790.91,515.95,834.21,515.95z"
            />
            <path
              fill={color3}
              d="M834.27,562.44c-20.15,0-36.46,14.27-36.46,31.91c0,17.63,16.31,31.91,36.46,31.91
              c7.32,0,14.03-1.92,19.79-5.16c5.16,3.12,10.68,3,13.91,2.52c0.96-0.12,1.2-1.32,0.36-1.8c-3.12-2.04-4.8-4.92-5.76-7.44
              c5.04-5.52,8.04-12.47,8.04-20.03C870.61,576.72,854.3,562.44,834.27,562.44z M855.62,583.67c0,1.56-1.32,2.88-2.88,2.88h-19.07
              c-1.56,0-2.88-1.32-2.88-2.88c0-1.56,1.32-2.88,2.88-2.88h19.07C854.3,580.91,855.62,582.11,855.62,583.67z M812.8,605.02
              c0-1.56,1.32-2.88,2.88-2.88h37.06c1.56,0,2.88,1.32,2.88,2.88c0,1.56-1.32,2.88-2.88,2.88h-37.06
              C814.12,607.78,812.8,606.58,812.8,605.02z M812.8,594.35c0-1.56,1.32-2.88,2.88-2.88h37.06c1.56,0,2.88,1.32,2.88,2.88
              c0,1.56-1.32,2.88-2.88,2.88h-37.06C814.12,597.23,812.8,595.91,812.8,594.35z"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default DefaultChatIcon;