import React, { useState } from 'react'
import CoverComponent from './CoverComponent'
import './TrophyPage.css'
import TrophyComponent from './TrophyComponent'
import MediaComponent from './MediaComponent'

export default function TrophyPage({ game, option }) {
  const { data } = game
  const [load, setLoad] = useState(true);


  const loadFadeIn = {
    opacity: load ? 0 : 1,
    transition: 'opacity 1s ease-in-out',
  };

  return (
    <div className='trophy-border' style={loadFadeIn}>
      <CoverComponent data={data} option={option} setLoad={setLoad} />
      <TrophyComponent data={data} />
      <MediaComponent data={data} />
    </div>
  )
}
