'use client';

import { useState } from 'react';
import './GenreWidget.css';

export default function GenreWidget({ onSelect, selectedItems = [] }) {
  const genres = [
    'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime',
    'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat',
    'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical',
    'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house',
    'detroit-techno', 'disco', 'disney', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro',
    'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german',
    'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock',
    'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian',
    'indie', 'indie-pop', 'industrial', 'iranian', 'j-dance', 'j-idol', 'j-pop', 'j-rock', 'jazz',
    'k-pop', 'kids', 'latin', 'latino', 'malay', 'mandopop', 'metal', 'metal-misc', 'metalcore',
    'minimal-techno', 'movies', 'mpb', 'new-age', 'new-release', 'opera', 'pagode', 'party', 
    'philippines-opm', 'piano', 'pop', 'pop-film', 'post-dubstep', 'power-pop', 'progressive-house',
    'psych-rock', 'punk', 'punk-rock', 'r-n-b', 'rainy-day', 'reggae', 'reggaeton', 'road-trip', 
    'rock', 'rock-n-roll', 'rockabilly', 'romance', 'sad', 'salsa', 'samba', 'sertanejo', 'show-tunes',
    'singer-songwriter', 'ska', 'sleep', 'songwriter', 'soul', 'soundtracks', 'spanish', 'study',
    'summer', 'swedish', 'synth-pop', 'tango', 'techno', 'trance', 'trip-hop', 'turkish', 'work-out', 'world-music'
  ];

  const handleSelectGenre = (event) => {
    const selectedGenres = Array.from(event.target.selectedOptions, option => option.value);
    onSelect(selectedGenres);
  };

  return (
    <div className="widget-container">
      <h2 className="widget-title">Select Genres</h2>

      <select
        className="genre-dropdown"
        multiple
        value={selectedItems}
        onChange={handleSelectGenre}
      >
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {selectedItems.length > 0 && (
        <div className="selected-genres">
          <h3>Selected Genres</h3>
          <div className="selected-genres-list">
            {selectedItems.map((genre) => (
              <div key={genre} className="selected-genre-item">
                <p>{genre}</p>
                <button onClick={() => onSelect(selectedItems.filter(item => item !== genre))} className="remove-genre-button">
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
