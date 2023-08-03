import React, { useState } from 'react'
import './TrophyPage.css'
import CoverComponent from './CoverComponent'
import TrophyComponent from './TrophyComponent'

export default function TrophyPage({ game, option }) {
  const { data } = game

  console.log(data)

  return (
    <div className='trophy-border'>
      <CoverComponent data={data} option={option} />
      <TrophyComponent data={data} />
      <div>
        Media Images.
      </div>
    </div>
  )
}
