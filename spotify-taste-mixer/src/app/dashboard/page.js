'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import Header from '@/components/Header'; // Importamos el componente Header
import GenreWidget from '@/components/GenreWidget'; // Importamos el widget de géneros
import DecadeWidget from '@/components/DecadeWidget'; // Importamos el widget de décadas
import PopularityWidget from '@/components/PopularityWidget'; // Importamos el widget de popularidad
import Favorites from '@/components/Favorites'; // Importamos la sección de favoritos
import UserPlaylists from '@/components/UserPlaylists'; // Importamos el componente de recomendaciones personalizadas
import CreatePlaylist from '@/components/CreatePlaylist'; // Importamos el componente para crear playlists
import UserStats from '@/components/UserStats'; // Importamos el componente de Top 50 global

import '../dashboard/page.css';

export default function Dashboard() {
  const router = useRouter();


  // Estados para las preferencias de los widgets
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDecade, setSelectedDecade] = useState(null);
  const [selectedPopularity, setSelectedPopularity] = useState([0, 100]);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push('/');
      return;
    }
  }, [router]);



  return (
    <div className="dashboard-container">
      <Header />

      <Favorites /> 
      
      <div className="widgets-container">
        <GenreWidget
          genres={['Rock', 'Pop', 'Jazz', 'Classical']}
          onSelect={(genre) => setSelectedGenres([...selectedGenres, genre])}
        />
        <DecadeWidget onSelect={(decade) => setSelectedDecade(decade)} />
        <PopularityWidget onSelect={(popularity) => setSelectedPopularity(popularity)} />
      </div>

    
      <UserPlaylists
        selectedGenres={selectedGenres}
        selectedDecade={selectedDecade}
        selectedPopularity={selectedPopularity}
      />

{/*      
      <CreatePlaylist recommendedTracks={} /> */}

     
      <UserStats />
    </div>
  );
}
