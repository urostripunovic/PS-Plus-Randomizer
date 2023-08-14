import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

export const fetchPsPlusGames = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/psplusgames`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Something went wrong with scrapping on the servers end", error);
    }
}

export const fetchRandomPsPlusTitle = async (option, premiumGames) => {
    try {
        const randomNbr = getRandomNumber(option);
        const response = await axios.get(`${BASE_URL}/api/platprices`, {
            params: {
                name: option[randomNbr], 
                //name: 'ACE COMBAT 7: SKIES UNKNOWN'
            }
        });
        const data = response.data;
        
        if (response.data.error) return fetchRandomPsPlusTitle(option, premiumGames);
        
        const isPremTier = premiumGames.includes(option[randomNbr]);

        const parsed = parsePsPlusTitle(data, isPremTier);
        return parsed;
    } catch (error) {
        return "Something went wrong with fetching a Ps Plus title API", error;
    }
}

const parsePsPlusTitle = (data, isPremTier) => {
    const {
        CoverArt,
        GameName,
        Img,
        Desc,
        TrophyListURL,
        Platinum,
        Gold,
        Silver,
        Bronze,
        Difficulty,
        HoursHigh,
        HoursLow,
        IsPS4,
        IsPS5,
        PSStoreURL,
        UnobtainableTrophies,
        PreviewVideo,
        Screenshot1,
        Screenshot2,
        Screenshot3,
        Screenshot4,
        Screenshot5,
        Screenshot6,
        Screenshot7,
        Screenshot8,
        Screenshot9,
    } = data

    return {
        CoverArt: CoverArt,
        GameName: GameName,
        Img: Img,
        Desc,
        TrophyListURL: TrophyListURL,
        TrophyInfo: {
            Platinum: Platinum,
            Gold: Gold,
            Silver: Silver,
            Bronze: Bronze,
        },
        Difficulty: Difficulty,
        Time : {
            HoursHigh: HoursHigh,
            HoursLow: HoursLow,
        },
        PSStoreURL,
        UnobtainableTrophies,
        Platforms: parsePlatform(IsPS4, IsPS5),
        Tier: parseTier(isPremTier),
        Media: processMedia([
            PreviewVideo,
            Screenshot1,
            Screenshot2,
            Screenshot3,
            Screenshot4,
            Screenshot5,
            Screenshot6,
            Screenshot7,
            Screenshot8,
            Screenshot9,
        ]),
    }
}

export const getRandomNumber = (array) => {
    const max = Math.floor(array.length);
    return Math.floor(Math.random() * max);
}

const parsePlatform = (PS4, PS5) => {
    return (PS5 === "1" && PS4 === "1") ? 'PS5-PS4' : PS5 === "1" ? 'PS5' : 'PS4'
}

const parseTier = (isPremTier) => {
    const img_premium = 'https://platprices.com/images/psp_premium_big.png';
    const img_extra = 'https://platprices.com/images/psp_extra_big.png';
    return isPremTier ? img_premium : img_extra;
}

const processMedia = (arr) => {
    return arr.filter(p => p !== "");
}