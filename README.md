# Ps Plus Premium and Extra Game Randomizer App


The PS Plus Game Randomizer App is designed exclusively for the Premium and Extra subscription tiers. With this app, users can discover new games to try and achieve platinum trophies for. The app provides information about each game, including the number of trophies available, the difficulty level, and the estimated time required to earn a platinum trophy. Additionally, users can view gameplay videos and screenshots for a better understanding of the game's content. 

The app is powered by a combination of APIs, including the one provided by [PlatPrices](https://platprices.com/developers.php), and my own custom API built using [Express.js](https://expressjs.com/) and [Puppetteer](https://pptr.dev/). Leveraging Puppetteer, the app effectively scrapes the website to gather up-to-date information on the current selection of PS Plus games available for each subscription tier. By utilizing Express.js as the backend, the app ensures the security of the API key and processes the scraped data efficiently. Although a backend has been created uploading it to [Netlify](https://www.netlify.com/?attr=homepage-modal) or [Vercel](https://vercel.com/) will not work as they cannot run backend service so I opted to use [Render](https://render.com/) to run my backend together with [Docker](https://www.docker.com/) because uploading my `server.js` file with [Puppetteer](https://pptr.dev/guides/docker) as it is wouldn't work. 

## [Link to the randomizer app](https://randompsplus.netlify.app/)


### TODO

#### Backend
- [x] Finished it before starting the documentation

#### Frontend
- [x] Initial loading screen
- [x] Create the intial buttons
    - Select options that should be randomized and a random button.
    - Make the work with Tanstack Query so that when a click happens it does a new query.
- [x] PS Plus Game page
    - [x] Container one with the name of the game, img, tier if All is selected, cover img and platform.
    - [x] Container two with the trophy information
        - Amount of trophies of a game and a link to them.
        - Difficulty
        - Time estimate
    - [x] Container three with the images
        - A carousel with all the images the video if existent first. Also one should be able to go in both directions.

        