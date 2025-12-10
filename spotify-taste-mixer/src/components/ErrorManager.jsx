'use client';

import ErrorNotification from './ErrorNotification';


export default function ErrorManager({ errors }) {
  return (
    <div className="error-container">
      {errors.map((error, index) => (
        <ErrorNotification key={index} message={error} />
      ))}
    </div>
  );
}
