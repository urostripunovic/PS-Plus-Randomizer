import React, { useState } from 'react'
import './TrophyPage.css';

export default function CoverComponent({ data, option, load, setLoad }) {
    //const [load, setLoad] = useState(true)
    const containerStyle = {
        backgroundImage: `url(${data?.CoverArt})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        borderTopRightRadius: '16px',
        borderTopLeftRadius: '16px',
        padding: "15px 15px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    };

    const specialCase = data.PSPExtra === '' + 0 && data.PSPPremium === '' + 0
    
    const condition = () => {
        
        if (data.PSPPremium === '' + 1 || specialCase) {
            if (option === 'All' || option === 'Extra')
                return ''
        } else if (data.PSPExtra === '' + 1) {
            if (option === 'All' || option === 'Premium')
                return ''
        }
        return 'remove-tier-img';
    }

    return (
        <div className='cover-border text-style' style={containerStyle} loading="lazy">
            <div className='img-container'>
                <img className='img-size' src={data?.Img} alt={data?.GameName} loading="lazy" onLoad={() => setLoad(false)} />
                <img className={`tier-img ${condition()}`} src={data?.Tier} />
            </div>
            <div className='name-platform'>
                <a href={data.PSStoreURL} target="_blank" rel="noopener noreferrer"> {data?.GameName?.toUpperCase()} </a>
                <img className='img-platform' src={`/images/${data?.Platforms}.svg`} />
            </div>
        </div>
    )
}
