'use client';

import { useState } from 'react';
import './GenreWidget.css';

export default function GenreWidget({ onSelect, selectedItems = [] }) {
  // const genres = [
  //   'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient', 'anime', 
  //   'black-metal', 'bluegrass', 'blues', 'bossanova', 'brazil', 'breakbeat', 
  //   'british', 'cantopop', 'chicago-house', 'children', 'chill', 'classical', 
  //   'club', 'comedy', 'country', 'dance', 'dancehall', 'death-metal', 'deep-house',
  //   'detroit-techno', 'disco', 'drum-and-bass', 'dub', 'dubstep', 'edm', 'electro', 
  //   'electronic', 'emo', 'folk', 'forro', 'french', 'funk', 'garage', 'german', 
  //   'gospel', 'goth', 'grindcore', 'groove', 'grunge', 'guitar', 'happy', 'hard-rock', 
  //   'hardcore', 'hardstyle', 'heavy-metal', 'hip-hop', 'house', 'idm', 'indian', 
  //   'indie', 'indie-pop', 'industrial', 'jazz', 'latin', 'metal', 'pop', 'punk', 'reggae'
  // ];

   const genres = [
    'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'rubrica bien hecha'
  ];

  const [query, setQuery] = useState('');
  const [filteredGenres, setFilteredGenres] = useState(genres);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const handleSearch = (query) => {
    if (!query) {
      setFilteredGenres([]);
      return;
    }

    // Filtrar los géneros con debouncing
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      const result = genres.filter((genre) =>
        genre.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredGenres(result);
    }, 300); // 300ms de debouncing

    setDebounceTimeout(timeout);
  };

  const handleSelectGenre = (genre) => {
    if (selectedItems.includes(genre)) {
      onSelect(selectedItems.filter((item) => item !== genre));
    } else {
      onSelect([...selectedItems, genre]);
    }
  };

  return (
    <div className="widget-container">
      <h2 className="widget-title">Select Genres</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder="Search genres"
        className="search-input"
      />

      <div className="genre-list">
        {filteredGenres.length > 0 ? (
          filteredGenres.map((genre) => (
            <div
              key={genre}
              className={`genre-item ${selectedItems.includes(genre) ? 'selected' : ''}`}
              onClick={() => handleSelectGenre(genre)}
            >
              {genre}
            </div>
          ))
        ) : (
          <div className="no-results">No genres found</div>
        )}
      </div>
    </div>
  );
}
