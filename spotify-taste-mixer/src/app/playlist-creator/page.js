'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import Header from '@/components/Header'; 
import ErrorManager from '@/components/ErrorManager';
import SongSelectionWidget from '@/components/SongSelectionWidget';
import ArtistWidget from '@/components/ArtistWidget';
import GenreWidget from '@/components/GenreWidget';
import PlaylistStatsWidget from '@/components/PlaylistStatsWidget';
import '../playlist-creator/page.css';

export default function playlistCreator() {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push('/');
      return;
    }
  }, [router]);

  const [errors, setErrors] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
 

  const addError = (message) => {
    setErrors((prevErrors) => [...prevErrors, message]);
  };


  return (
    <div className="dashboard-container">
      <Header />

      <div className="widgets-container">
         <PlaylistStatsWidget addError={addError}></PlaylistStatsWidget>
        <ArtistWidget
          onSelect={setSelectedArtists}
          selectedItems={selectedArtists}
        />
        <GenreWidget
          selectedItems={selectedGenres}
          onSelect={setSelectedGenres}
        />
        
      </div>

      <ErrorManager errors={errors}/>
      <SongSelectionWidget addError={addError} selectedArtists={selectedArtists} selectedGenres={selectedGenres}></SongSelectionWidget>
    
  
    </div>
  );
}
