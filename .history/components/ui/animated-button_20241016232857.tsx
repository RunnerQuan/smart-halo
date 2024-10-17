import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        px-6 py-3 rounded-full text-white font-semibold
        bg-gradient-to-r from-purple-500 to-indigo-600
        hover:from-purple-600 hover:to-indigo-700
        transform hover:scale-105 transition duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
        shadow-lg hover:shadow-xl
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default AnimatedButton;
