import React, { useEffect } from 'react';

export const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const bgColor = type === 'error' ? 'bg-red-500' : type === 'warn' ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in`}>
      {message}
    </div>
  );
};