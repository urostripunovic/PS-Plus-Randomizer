import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPsPlusGames, fetchRandomPsPlusTitle } from './service'
import LoadingScreen from './LoadingScreen';
import TrophyPage from './components/TrophyPage';
import ErrorScreen from './ErrorScreen';
import RandomLoadingScreen from './RandomLoadingScreen';
import './App.css';

export default function App() {
  const [option, setOption] = useState('All');

  const { isLoading, isError, data } = useQuery({
    queryKey: ['PsPlusGames'],
    queryFn: fetchPsPlusGames,
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 60 * 1000,
  })
  //console.log(data);
  const randomPsPlusGame = useQuery({
    queryKey: ['RandomPsPlusGame'],
    queryFn: () => fetchRandomPsPlusTitle(data[option], data.Premium),
    refetchOnWindowFocus: false,
    enabled: data != null,
  });

  if (isLoading) return <LoadingScreen />
  if (isError) return <ErrorScreen />

  return (
    <div className='parent-container'>

      <div className='title-text'>
        Ps Plus Game Randomizer
      </div>

      <div className='select-container'>
        <div>
          <select className='custom-select' name="options" id="tier-select" onChange={(e) => setOption(e.target.value)}>
            <option value="All">All</option>
            <option value="Extra">Extra</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div>
          <button className='custom-button' onClick={async () => randomPsPlusGame.refetch()}>Randomize</button>
        </div>
      </div>
      {randomPsPlusGame.isRefetching || randomPsPlusGame.isLoading ? <RandomLoadingScreen /> : 
      data !== null && <TrophyPage game={randomPsPlusGame} option={option} />}
    </div>

  )
}

