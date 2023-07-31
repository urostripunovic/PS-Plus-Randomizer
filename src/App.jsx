import React, { useState } from 'react';
import { fetchPsPlusGames, fetchRandomPsPlusTitle } from './service'
import { useQuery } from '@tanstack/react-query';

export default function App() {
  const psPlusGames = useQuery({
    queryKey: ['PsPlusGames'],
    queryFn: fetchPsPlusGames,
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000,
  })

  /*const randomPsPlusGame = useQuery({
    queryKey: ['RandomPsPlusGame'],
    queryFn: () => fetchRandomPsPlusTitle(psPlusGames.data.All),
    enabled: !!psPlusGames.data,
    staleTime: 5 * 60 * 1000,
  });*/

  return (
    <div className=''>
      App
      <button onClick={() => console.log(psPlusGames.data)}>log scraper</button>
      <button onClick={async () => console.log(await fetchRandomPsPlusTitle(psPlusGames.data.All))}>get platprices value</button>
    </div>
  )
}

