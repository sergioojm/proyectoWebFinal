'use client';

import './GenreWidget.css';

export default function GenreWidget({ genres, onSelect }) {
  return (
    <div className="widget-container">
      <h3 className="widget-title">Genres</h3>
      <ul className="genre-list">
        {genres.map((genre) => (
          <li
            key={genre}
            onClick={() => onSelect(genre)}
            className="genre-item"
          >
            {genre}
          </li>
        ))}
      </ul>
    </div>
  );
}
