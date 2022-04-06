This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Redux Sagas config setup is on `master` branch
Redux Thunk config setup is on `redux-thunk` branch
Feel free to use whichever you like depending upon the project's requirement.

## Note: To access redux-thunk code, checkout to branch `redux-thunk`

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

### Folder structure writeup
### Public - 
This folder contains all the static assets including index.html, images & css that will be injected into the build folder created from the command npm run build.Here we also have manifest. json , where we specify basic metadata about extensions such as the name and version, and can also specify aspects of your extension's functionality, one can configure to make an app PWA. Along with that it also has a favicon & images folder that has common image assets in it.

### src - 
Under src folder we have various sub folders that are important in maintaining the good understandable code structure:
   ## actions -
      The actions folder consist of an actionType and index file the actionType has const to identify actions uniquely and the index files has actions definitions that needs to be dispatched
   ## assets - 
      assets folder further consist of images folder that is required to put images and other assets to be accessed within src
   ## common -
      the common folder consist of the components that common for all other components and are frequently used, like header, footer and a common layout
   ## components -
       components folder consist of various components that are used in different parts of the app and are part of component attributes in route definition. It is structured in a manner that has a component named folder that further consist of index file and a styling scss file for that component.
   ## constants -
       as the name suggests the constant folders has the file that consist logically grouped constants like static text and urls used in the app.
   ## container -
       the container consists of files that imports a stateless component and wraps it with actions and state to be able to access store and dispatch necessary actions.
   ## reducer - 
       this folder consists of different reducers based on the types of actions and these reducer functions are finally responsible for managing the data store, we have a root reducer where we combine all the reducers that are logically segregated and export them as one combine reducer.
   ## saga -
        Redux-saga is a redux middleware library that makes handling side effects in redux app nice and simple. In this folder we have a different saga file corresponding to each action and request js that has different functions defined that are a part of axios instance with different configs. Also it consists of a rootsaga.js file that combines all different component specific sagas into one rootsaga.
   ## service -
        the service folder consists of api js file that has the instance of axios defined with all the required configs to make a rest call.
   ## utils -
        The utils folder consist of all the utility part of app that we would need frequently in different parts of app like 
              a) the formUtils has different form components along with validator, 
              b) also it has history js utils that we might need to route logically between views,
              c) interceptor js that is used to intercept the request like adding tokens,
              d) notification js build to display various alert notifications on the top either corners in case of success, alert, info or warnings to be shown to user
              e) private routes js this is a logical route component to stop user from accessing the unauthorized routes.
   ## index css -
        this is the common css file where we can add the common styling that applies to all parts of the app.
   ## index js -
        This is the most important file where we mount our app onto a root element
   ## push-notifications js -
        this is useful in implementing the push notification from firebase, basically needed for PWA.
   ## serviceWorkers js -
        the serviceworker file is again important in terms of PWA it helps enable you to run JavaScript before a page even exists, makes your site faster, and allows you to display content even if there is no internet connection.
   ## store js -
        this file is important in terms of implementing redux in our app the store is created here using the middleware

### babelrc js - 
would be useful if you want to run certain transformations / plugins on a subset of files /directories.
### .env - 
This is the file where we write all our environment variables like the api base url and other keys.
### .gitignore - 
This is the file where we mention the files and folder to be ignored by our versioning tool like git
### babel.config js -
This establishes Babel's core concept of the base directory of your repository. You can place all of your repo configuration in the root babel.config
### jest-setup js - 
this is the file where we declare out adapter that are useful in terms of unit testing code
### jsconfig js - 
the js config js consist of declaration for absolute routing, the paths here must be predefined
### package json - 
this is the heart of a react app that has all information about the package dependency, dev dependency and app info
### test-env js - 
this is the file configuration for the env file.
