'use client';

import { useState } from 'react';  // Para manejar los resultados
import './Header.css';
import { logout } from '@/lib/auth';
import Search from '@/components/Search';  // Importamos el componente de búsqueda


export default function Header() {
  const [searchResults, setSearchResults] = useState([]);  // Guardar los resultados de búsqueda

  // Función para recibir los resultados de búsqueda
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <header className="header-container">
      <div className="logo-container">
        <h1 className="header-logo">Spotify Taste Mixer</h1>
      </div>

      <nav className="navigation">
        
        <Search onResults={handleSearchResults} /> 

        <button onClick={() => {
            logout();
            window.location.reload();
        }} className="logout-button">
          Logout
        </button>
      </nav>
    </header>
  );
}
