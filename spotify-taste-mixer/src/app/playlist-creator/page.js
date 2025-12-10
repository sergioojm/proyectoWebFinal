'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import Header from '@/components/Header'; 
import ErrorManager from '@/components/ErrorManager';
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

  const [errors, setErrors] = useState([]);


  const addError = (message) => {
    setErrors((prevErrors) => [...prevErrors, message]);
  };


  return (
    <div className="dashboard-container">
      <Header />

        <ErrorManager errors={errors}/>
      <SongSelectionWidget addError={addError}></SongSelectionWidget>
    
  
    </div>
  );
}
