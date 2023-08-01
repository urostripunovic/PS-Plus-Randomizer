import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export const fetchPsPlusGames = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/psplusgames`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error("Something went wrong with scrapping on the servers end", error);
    }
}

export const fetchRandomPsPlusTitle = async (option) => {
    try {
        const randomNbr = getRandomNumber(option);
        const response = await axios.get(`${BASE_URL}/api/platprices`, {
            params: {
                name: option[randomNbr],
            }
        });
        const data = response.data;
        console.log(data)

        if (response.data.error) return fetchRandomPsPlusTitle(option);

        const parsed = parsePsPlusTitle(data);
        return parsed;
    } catch (error) {
        return "Something went wrong with fetching a Ps Plus title API", error;
    }
}

const parsePsPlusTitle = (data) => {
    const {
        CoverArt,
        GameName,
        Img,
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
        PSPPremium,
        PSPExtra,
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
        TrophyListURL: TrophyListURL,
        //If any trophy has -1 as a value the field will say unkown.
        TrophyInfo: {
            Platinum: Platinum,
            Gold: Gold,
            Silver: Silver,
            Bronze: Bronze,
            Difficulty: Difficulty,
            HoursHigh: HoursHigh,
            HoursLow: HoursLow,
        },
        Platforms: parsePlatform(IsPS4, IsPS5),
        Tier: parseTier(PSPPremium, PSPExtra),
        Media: [
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
        ],
    }
}

const getRandomNumber = (array) => {
    const max = Math.floor(array.length);
    return Math.floor(Math.random() * max);
}

const parsePlatform = (PS4, PS5) => {
    return (PS5 === "" + 1 && PS4 === "" + 1) ? 'PS5-PS4' : PS5 === "" + 1 ? 'PS5' : 'PS4'
}

const parseTier = (premium, extra) => {
    const img_premium = 'https://platprices.com/images/psp_premium_big.png';
    const img_extra = 'https://platprices.com/images/psp_extra_big.png'
    return premium !== "" + 1 && extra !== "" + 1 ? img_premium : premium === "" + 1 ? img_premium : img_extra
}