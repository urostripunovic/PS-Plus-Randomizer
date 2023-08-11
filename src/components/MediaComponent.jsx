import React, { useState } from 'react'
import './TrophyPage.css'

export default function MediaComponent({ data }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex(currentIndex === data.Media.length - 1 ? 0 : currentIndex + 1);
  }

  const handlePreviousSlide = () => {
    setCurrentIndex(currentIndex === 0 ? data.Media.length - 1 : currentIndex - 1);
  }

  return (
    <div className='media-border'>
      <div className='navigation-buttons'>
        <div className="previous nav-btn" onClick={handlePreviousSlide}>{'<'}</div>
        <div className="next nav-btn" onClick={handleNextSlide} >{'>'}</div>
      </div>
      {data?.Media[currentIndex]?.includes('.dl') || data?.Media[currentIndex]?.includes('.mp4') ?
        <video className='image' src={data.Media[currentIndex]} controls />
        : <img className='image' src={data.Media[currentIndex]} />}
    </div>
  )
}
