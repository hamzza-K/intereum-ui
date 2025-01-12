import React from 'react';

interface AjeebSpinnerProps {
  text?: string | null;
  color?: string;
}

const AjeebSpinner: React.FC<AjeebSpinnerProps> = ({ text, color = 'white' }) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <svg
        className={`animate-spin h-5 w-5 ${color === 'black' ? 'text-black' : `text-${color}-500`}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0112 4v4c-3.314 0-6 2.686-6 6H6zm10-2a8 8 0 01-8 8v-4c3.314 0 6-2.686 6-6h-4zm-2-5.373A8 8 0 0116 20h4c0-6.627-5.373-12-12-12v4z"
        ></path>
      </svg>
      {text && <span className={`font-medium ${color === 'black' ? 'text-black' : `text-${color}-500`}`}>{text}</span>}
    </div>
  );
};

export default AjeebSpinner;
