import React, { useState } from 'react'
import './TrophyPage.css'
import CoverComponent from './CoverComponent'
import TrophyComponent from './TrophyComponent'

export default function TrophyPage({ game, option }) {
  const { data } = game
  const [load, setLoad] = useState(true);

  const loadFadeIn = {
    opacity: load ? 0 : 1,
    transition: 'opacity 1s ease-in-out',
  };

  console.log(data)

  return (
    <div className='trophy-border' style={loadFadeIn}>
      <CoverComponent data={data} option={option} load={load} setLoad={setLoad} />
      <TrophyComponent data={data} />
      <div>
        Media Images.
      </div>
    </div>
  )
}
