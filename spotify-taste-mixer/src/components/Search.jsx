'use client';

import { useState } from 'react';
import { getAccessToken } from '@/lib/auth';  // Para obtener el token
import './Search.css'; // Importamos los estilos del componente

export default function Search({ onResults }) {
  const [query, setQuery] = useState('');  // Estado para la búsqueda
  const [searchResults, setSearchResults] = useState([]);  // Estado para los resultados de búsqueda
  const [loading, setLoading] = useState(false);  // Estado de carga

  // Función para manejar la búsqueda
  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);  // Si no hay búsqueda, limpiamos los resultados
      return;
    }

    setLoading(true);  // Activamos el estado de carga

    const token = getAccessToken();  // Obtenemos el token

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${query}&type=track,artist&limit=5`,  // Buscamos artistas y canciones
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setSearchResults(data.tracks.items);  // Establecemos los resultados de la búsqueda
      onResults(data.tracks.items);  // Llamamos a onResults para pasar los resultados al componente padre
    } catch (error) {
      console.error('Error al buscar', error);
    } finally {
      setLoading(false);  // Desactivamos el estado de carga
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);  // Actualizamos el valor del input
          handleSearch(e.target.value);  // Llamamos a la función de búsqueda
        }}
        placeholder="Search for tracks or artists"
        className="search-input"
      />
      {loading && <div className="loading">Loading...</div>}  {/* Indicador de carga */}
      
      {query && !loading && (
        <div className="search-results">
          {searchResults.map((item) => (
            <div key={item.id} className="search-result-item">
              <p>{item.name}</p>
              <p>{item.artists?.[0]?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
