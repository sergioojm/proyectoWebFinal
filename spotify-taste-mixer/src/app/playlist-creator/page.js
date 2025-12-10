'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import Header from '@/components/Header'; 
import UserPlaylists from '@/components/UserPlaylists'; 
import SongSelectionWidget from '@/components/SongSelectionWidget';

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



  return (
    <div className="dashboard-container">
      <Header />

 
      <SongSelectionWidget></SongSelectionWidget>
    

    </div>
  );
}
