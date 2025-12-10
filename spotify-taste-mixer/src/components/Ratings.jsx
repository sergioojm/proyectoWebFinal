'use client';

import { useState } from 'react';

import './Ratings.css';

export default function Rating({ track }) {
  const [rating, setRating] = useState(localStorage.getItem(`rating-${track.id}`) || 0);

  const handleRating = (newRating) => {
    setRating(newRating);
    localStorage.setItem(`rating-${track.id}`, newRating); 
  };

  return (
    <div className="rating-container">
      <p>{track.name} - {track.artists?.[0]?.name}</p>
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleRating(star)}
            className={`star ${rating >= star ? 'filled' : ''}`}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}
