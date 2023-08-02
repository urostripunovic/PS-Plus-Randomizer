import React from 'react'

export default function ErrorScreen() {
    return (
        <div className='loading-screen'>
            <h1 className='title-text'>
                Error: Please refresh the page
            </h1>
            <img src="/loading/astrobot-error.gif" alt="Loading..." />
        </div>
    )
}
