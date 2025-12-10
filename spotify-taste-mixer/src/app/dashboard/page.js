'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import Header from '@/components/Header';
import GenreWidget from '@/components/GenreWidget'; 
import DecadeWidget from '@/components/DecadeWidget'; 
import PopularityWidget from '@/components/PopularityWidget'; 
import UserPlaylists from '@/components/UserPlaylists';
import UserStats from '@/components/UserStats'; 
import SongSelectionWidget from '@/components/SongSelectionWidget';

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

      
      <div className="widgets-container">
        <GenreWidget
          genres={['Rock', 'Pop', 'Jazz', 'Classical']}
          onSelect={(genre) => setSelectedGenres([...selectedGenres, genre])}
        />
        <DecadeWidget onSelect={(decade) => setSelectedDecade(decade)} />
        <PopularityWidget onSelect={(popularity) => setSelectedPopularity(popularity)} />
      </div>

      {/* <SongSelectionWidget></SongSelectionWidget> */}
    
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
