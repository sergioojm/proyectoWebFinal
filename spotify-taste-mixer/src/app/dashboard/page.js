'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAccessToken } from '@/lib/auth';
import Header from '@/components/Header';

import UserPlaylists from '@/components/UserPlaylists';
import UserStats from '@/components/UserStats'; 
import '../dashboard/page.css';

export default function Dashboard() {
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
    
      <UserPlaylists/>  
      <UserStats />
    </div>
  );
}
