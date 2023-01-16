## Blackjack Demo Project
This is a basic blackjack demo project using a combination of React, Javascript and Typescript.
When the page loads, clicking start will initiate a game and randomly select an available player that is not the dealer for the viewer to take actions on behalf of.

### Added notes
* Other players will have their hands controlled by a `PlayerActor` that will determine when to hit or stand.
    * [_] Allow the players to adjust their hit threshold based on visible cards in play.

* The dealer hand will be controlled by a `Dealer`, which is a `PlayerActor` with an unchanging set of action thresholds.

* While relatively new to `TypeScript` I attempted to make as much use as I could of interfaces and typing to ensure the type safety to facilitate confidence in program flow. 
* I didn't want to take a run of the mill black jack game tutorial, so rather than following a tutorial I coded up the logic and added a small twist.Rather than having a single player versus a dealer, I added a hardcoded array of players, and all that aren't the player are controlled by an actor.
   * In hindsight I could have had a more completed project doing so, and made small tweaks, but I decided this approach was a better learning opportunity to work on improving with typescript and building understanding through application.
  
* There are multiple debugging buttons in the interface which can be toggled to show by setting the debug value to true in `GameContainer`.
  
* Console logs are still in place as I am working on a re-render bug.

### Testing
* Testing is functioning, but minimal




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
