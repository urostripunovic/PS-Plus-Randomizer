# PSN Plus Essentials and Deluxe Games Randomizer App

A PS Plus game randomizer app for the subscription tiers Premium and Extra or combined. Using the API provided by [PlatPrices](https://platprices.com/developers.php) as well as my own API created with the help of [Express.js](https://expressjs.com/) and [Puppetteer](https://pptr.dev/). 

## [Link to the randomizer app]()


### TODO
- [ ] Initial loading screen with a spinning platinum trophy
    - Change the trophy to a white silhouette once the loading state is done and move it to the side of the buttons (if it's possible)
- [x] Create the intial buttons
    - Select options that should be randomized and a random button.
    - Make the work with Tanstack Query so that when a click happens it does a new query.
- [ ] PS Plus Game page
    - [ ] White silhouette to the side of the container (if it's possible and easier maybe)
    - [ ] Container one with the name of the game, img, tier if All is selected, cover img.
    - [ ] Container two with the trophy information
        - Amount of trophies of a game and a link to them.
        - Difficulty
        - Time estimate
    - [ ] Container three with the images
        - A carousel with all the images the video if existent first. Also one should be able to go in both directions.

        