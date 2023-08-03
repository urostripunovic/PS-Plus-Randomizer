import React from 'react'
import './App.css';
import { getRandomNumber } from './service';

export default function RandomLoadingScreen() {
    const arr = ['/loading/astrobot-game-hq.gif','/loading/astrobot-game.gif', '/loading/astrobot-game-wat.gif']
    const randomNbr = getRandomNumber(arr);
    return (
        <div className='random-screen'>
            <img src={arr[randomNbr]} alt="Loading..." />
        </div>
    )
}
