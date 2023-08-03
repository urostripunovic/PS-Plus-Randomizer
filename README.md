# PSN Plus Essentials and Deluxe Games Randomizer App

A PS Plus game randomizer app for the subscription tiers Premium and Extra or combined. Using the API provided by [PlatPrices](https://platprices.com/developers.php) as well as my own API created with the help of [Express.js](https://expressjs.com/) and [Puppetteer](https://pptr.dev/).  Puppetteer was used in-order to scrape a website of the current available ps plus games for each subscription tier and express was used as a backend for that as well as to hide the API key for when this site is deployed.

## [Link to the randomizer app]()


### TODO
- [x] Initial loading screen
- [x] Create the intial buttons
    - Select options that should be randomized and a random button.
    - Make the work with Tanstack Query so that when a click happens it does a new query.
- [ ] PS Plus Game page
    - [x] Container one with the name of the game, img, tier if All is selected, cover img and platform.
    - [x] Container two with the trophy information
        - Amount of trophies of a game and a link to them.
        - Difficulty
        - Time estimate
    - [ ] Container three with the images
        - A carousel with all the images the video if existent first. Also one should be able to go in both directions.ybe

        