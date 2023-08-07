import React, { useState } from 'react'
import './TrophyPage.css'
import CoverComponent from './CoverComponent'
import TrophyComponent from './TrophyComponent'

export default function TrophyPage({ game, option }) {
  const { data } = game
  const [load, setLoad] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadFadeIn = {
    opacity: load ? 0 : 1,
    transition: 'opacity 1s ease-in-out',
  };

  const handleNextSlide = () => {
    setCurrentIndex(currentIndex === data.Media.length - 1 ? 0 : currentIndex + 1);
  }

  const handlePreviousSlide = () => {
    setCurrentIndex(currentIndex === 0 ? data.Media.length - 1 : currentIndex - 1);
  }

  return (
    <div className='trophy-border' style={loadFadeIn}>
      <CoverComponent data={data} option={option} setLoad={setLoad} />
      <TrophyComponent data={data} />
      <div className='media-border'>
        <div className='navigation-buttons'>
          <div className="previous nav-btn" onClick={handlePreviousSlide}>{'<'}</div>
          <div className="next nav-btn" onClick={handleNextSlide} >{'>'}</div>
        </div>
        {data.Media[currentIndex].includes('.dl') ?
          <video className='image' src={data.Media[currentIndex]} controls/>
          : <img className='image' src={data.Media[currentIndex]} />}
      </div>
    </div>
  )
}
