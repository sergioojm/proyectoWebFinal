'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/lib/auth';
import PlaylistTrackCard from '@/components/PlaylistTrackCard';

import './Recomendations.css';
export default function Recommendations({ selectedGenres, selectedDecade, selectedPopularity }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    if (!selectedGenres.length && !selectedDecade && !selectedPopularity) return;

    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null); // Limpiamos cualquier error previo
      const token = getAccessToken(); // Obtenemos el token de acceso
      const genreQuery = selectedGenres.join(',');
      const popularityQuery = `${selectedPopularity[0]}-${selectedPopularity[1]}`;

      // Verificamos que el token sea válido
      if (!token) {
        setError('No access token found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.spotify.com/v1/recommendations?seed_genres=${genreQuery}&target_popularity=${popularityQuery}&limit=10`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) {
          throw new Error(`Error fetching recommendations: ${response.statusText}`);
        }

        const data = await response.json();

        // Verificamos si la respuesta tiene la propiedad esperada
        if (data && data.tracks) {
          setRecommendations(data.tracks); // Establecemos las recomendaciones
        } else {
          setError('No recommendations found in the response');
        }
      } catch (error) {
        console.error('Error fetching recommendations', error);
        setError('Failed to fetch recommendations');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [selectedGenres, selectedDecade, selectedPopularity]);

  if (loading) {
    return <div>Loading recommendations...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="recommendations-container">
      <div className="recommendations-list">
        {recommendations.map((track) => (
          <PlaylistTrackCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
}