'use client';

import { useState } from 'react';
import { fetchSpotifyData } from '@/lib/spotify';

export default function ArtistWidget({ onSelect, selectedItems }) {
  const [query, setQuery] = useState('');
  const [artists, setArtists] = useState([]);

  const searchArtists = async () => {
    const data = await fetchSpotifyData(`search?type=artist&q=${query}`);
    setArtists(data.artists.items);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artists"
        className="p-2 border rounded"
      />
      <button onClick={searchArtists} className="bg-blue-500 text-white px-4 py-2 rounded">
        Search
      </button>
      <div className="artists-list">
        {artists.map((artist) => (
          <div key={artist.id} className="artist-item" onClick={() => onSelect(artist)}>
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
