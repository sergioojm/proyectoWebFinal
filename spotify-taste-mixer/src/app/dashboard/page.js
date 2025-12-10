'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import Header from '@/components/Header';
import ArtistWidget from '@/components/ArtistWidget';
import GenreWidget from '@/components/GenreWidget';
import UserPlaylists from '@/components/UserPlaylists';
import UserStats from '@/components/UserStats'; 
import PlaylistStatsWidget from '@/components/PlaylistStatsWidget';
import ErrorManager from '@/components/ErrorManager';

import '../dashboard/page.css';

export default function Dashboard() {
  const router = useRouter();


  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
 

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push('/');
      return;
    }
  }, [router]);

   const [errors, setErrors] = useState([]);

    const addError = (message) => {
      setErrors((prevErrors) => [...prevErrors, message]);
    };

  return (
    <div className="dashboard-container">
      <Header />
      <ErrorManager errors={errors}/>
      
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

    
    
      <UserPlaylists/>  
      <UserStats />
    </div>
  );
}
