import React from 'react';

interface SelectProps {
  options: string[];
  placeholder: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({ options, placeholder, icon, className }) => {
  return (
    <div className={`relative ${className}`}>
      {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</span>}
      <select 
        className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-600 pl-10"
        defaultValue=""
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};
