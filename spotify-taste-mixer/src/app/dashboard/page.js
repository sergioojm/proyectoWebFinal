'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import PlaylistTrackCard from '@/components/PlaylistTrackCard';  // Importamos el componente para las canciones
import Header from '@/components/Header';  // Importamos el componente Header

import '../dashboard/page.css';

export default function Dashboard() {
  const router = useRouter();
  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="dashboard-container">
      <Header />
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
