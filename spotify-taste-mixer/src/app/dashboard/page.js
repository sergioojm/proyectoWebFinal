'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import PlaylistTrackCard from '@/components/PlaylistTrackCard'; // Para mostrar las canciones
import Header from '@/components/Header'; // Importamos el componente Header
import GenreWidget from '@/components/GenreWidget'; // Importamos el widget de géneros
import DecadeWidget from '@/components/DecadeWidget'; // Importamos el widget de décadas
import PopularityWidget from '@/components/PopularityWidget'; // Importamos el widget de popularidad
import Favorites from '@/components/Favorites'; // Importamos la sección de favoritos
import Recommendations from '@/components/Recomendations'; // Importamos el componente de recomendaciones personalizadas
import CreatePlaylist from '@/components/CreatePlaylist'; // Importamos el componente para crear playlists
import Top50Global from '@/components/Top50Global'; // Importamos el componente de Top 50 global

import '../dashboard/page.css';

export default function Dashboard() {
  const router = useRouter();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

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

    const fetchData = async () => {
      try {
        const artistsResponse = await fetch(
          'https://api.spotify.com/v1/me/top/artists?limit=5',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const artistsData = await artistsResponse.json();
        setTopArtists(artistsData.items);

        const tracksResponse = await fetch(
          'https://api.spotify.com/v1/me/top/tracks?limit=5',
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const tracksData = await tracksResponse.json();
        setTopTracks(tracksData.items);
      } catch (error) {
        console.error('Error al obtener datos', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Función para generar la playlist basada en las preferencias
  const generatePlaylist = () => {
    // Aquí deberías agregar la lógica para generar la playlist en función de las selecciones
    // por ejemplo, usando la API de Spotify o filtrando los `topTracks` por las preferencias
  };

  return (
    <div className="dashboard-container">
      <Header />

      <Favorites /> {/* Mostramos la sección de favoritos */}
      
      <div className="widgets-container">
        <GenreWidget
          genres={['Rock', 'Pop', 'Jazz', 'Classical']}
          onSelect={(genre) => setSelectedGenres([...selectedGenres, genre])}
        />
        <DecadeWidget onSelect={(decade) => setSelectedDecade(decade)} />
        <PopularityWidget onSelect={(popularity) => setSelectedPopularity(popularity)} />
      </div>

      {/* Mostrar recomendaciones basadas en las preferencias */}
      <Recommendations
        selectedGenres={selectedGenres}
        selectedDecade={selectedDecade}
        selectedPopularity={selectedPopularity}
      />

     
      <CreatePlaylist recommendedTracks={topTracks} />

     
      <Top50Global />

      <div className="top-artists">
        <h2>Top Artists</h2>
        <div className="cards-container">
          {topArtists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <img
                src={artist.images[0]?.url}
                alt={artist.name}
                className="artist-image"
              />
              <p>{artist.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="top-tracks">
        <h2>Top Tracks</h2>
        <div className="cards-container">
          {topTracks.map((track) => (
            <PlaylistTrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </div>
  );
}
