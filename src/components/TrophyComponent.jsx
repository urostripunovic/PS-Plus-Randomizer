import React from 'react'
import './TrophyPage.css'

export default function TrophyComponent({ data }) {

    const trophyStatus = () => {
        if (allZero())
            return (<span className='trophy-info-text'>
                There are no trophies for {data.GameName}
            </span>)
        else if (data.TrophyInfo.Bronze === '-1')
            return (
                <span className='trophy-info-text'>
                    <span className='trophy-img-size bg-unkown'></span>
                    <span > unknown</span>
                </span>
            )
    }

    const allZero = () => {
        const arr = Object.keys(data.TrophyInfo).map(key => data.TrophyInfo[key])
        const isAllZero = arr.every(item => item === '0');
        return isAllZero
        /*
        //This works but the above solutions looks cleaner
        let flag = false
        arr.forEach(value => {
            flag = value === '0';
        })
        console.log(flag, arr)
        return flag;*/
    }


    const difficultyStatus = () => {
        const {
            UnobtainableTrophies,
            Difficulty
        } = data;

        if (UnobtainableTrophies !== '')
            return (<span className='trophy-info-text'>
                impossible
            </span>)

        if (Difficulty === '0' || Difficulty === '-1')
            return (<span className='trophy-info-text'>
                ??
            </span>)
    }

    const timeStatus = () => {
        const {
            HoursLow,
            HoursHigh
        } = data.Time

        if (HoursLow === '-1')
            return (<span className='trophy-info-text'>
                ??
            </span>)
        else if (HoursHigh === '-1')
            return (<span className='trophy-info-text'>
                {HoursLow + " hours"}
            </span>)

        return (<span className='trophy-info-text'>
            {HoursLow + ' - ' + HoursHigh + " hours"}
        </span>)
    }

    const noTrophyStyle = allZero() || data.TrophyInfo.Bronze === '-1' ? 'remove-tier-img' : 'trophy-colum';

    return (
        <div className='trophies-border'>
            <div className='trophy-colum'>
                <a href={data.TrophyListURL} target="_blank" rel="noopener noreferrer" className='trophy-title-style'> Trophies </a>
                {trophyStatus() ||
                    (
                        <div className='map-flex'>
                            {Object.keys(data.TrophyInfo).map((key, index) => {
                                return (
                                    <>
                                        <div key={key+index} className={`trophy-img-size bg-${key}`}></div>
                                        <div key={key} className='trophy-info-text'>{data.TrophyInfo[key]}</div>
                                    </>
                                )
                            })}
                        </div>
                    )
                }
            </div>
            <div className={noTrophyStyle}>
                <a className='trophy-title-style'> Difficulty </a>
                <div className='trophy-info-text'>
                    {difficultyStatus() || data.Difficulty + '/10'}
                </div>
            </div>
            <div className={noTrophyStyle}>
                <a className='trophy-title-style'> Time </a>
                <div className='trophy-info-text'>
                    {timeStatus()}
                </div>
            </div>
        </div>
    )
}
