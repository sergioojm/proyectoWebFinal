'use client';

import { useState, useEffect } from 'react';
import './ErrorNotification.css'; 

export default function ErrorNotification({ message, duration = 3000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false); 
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!show) return null; 

  return (
    <div className="error-notification">
      <p>{message}</p>
    </div>
  );
}
