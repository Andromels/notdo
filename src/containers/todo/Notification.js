// Notification.js
import React, { useEffect } from 'react';
import './notification.css';

export default function Notification({ message, onClose }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000); // Adjust the timeout as needed

    return () => clearTimeout(timeoutId);
  }, [onClose]);

  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
}
