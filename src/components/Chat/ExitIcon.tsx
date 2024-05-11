import React from 'react';

const ExitIcon = ({ color = 'white' }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 5.26495L14.7351 4L10 8.73505L5.26495 4L4 5.26495L8.73505 10L4 14.7351L5.26495 16L10 11.2649L14.7351 16L16 14.7351L11.2649 10L16 5.26495Z"
        fill={color}
      />
    </svg>
  );
};

export default ExitIcon;
