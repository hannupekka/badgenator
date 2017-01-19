# Badgenator

Generate for example meetup name badges from your data.

## Development server

Install dependencies and start development server with:

```
npm install
npm run dev
```

Server with HMR should now be running on `http://localhost:8080`

Redux DevTools are hidden by default. You can change this behavior and other settings from `src/containers/utils/DevTools.js`.

***To toggle the DevTool panel during development:***
<kbd>CTRL</kbd> + <kbd>H</kbd>

***Change the DevTool panel's position during development:***
<kbd>CTRL</kbd> + <kbd>Q</kbd>

## Production build

```
npm run build
```

## Structure
* `server`
 * Simple NodeJS servers for development and serving production build.
* `src/assets`
 * All static assets like images.
* `src/components`
 * React components that simply display data they are given.
* `src/containers`
 * React containers that have access to Redux state and modify it somehow.
* `src/html`
 * HTML templates for development and production. In production build CSS and bundled JS are auto-injected.
* `src/redux/modules`
 * Redux [Ducks](https://github.com/erikras/ducks-modular-redux)
* `src/store`
 *  Redux store configuration like middlewares.
* `src/styles`
 * Container and component styles using [react-css-modules](https://github.com/gajus/react-css-modules). Each file should `@import '~styles/main';` at the beginning to get access to all the needed utilities.
* `src/utils`
 * Helpers for example wrapping [Redux API middleware](https://github.com/agraboso/redux-api-middleware) requests for Flowtype compatibility.
* `tools`
 * Flowtype type definitions and annotation check, Jest pre-processors.

## Acknowledgements

This project is a grateful recipient of the [Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities).

Also thanks to [@anttti](https://github.com/anttti/) for his [yet-another-redux-example](https://github.com/anttti/yet-another-redux-example) and [badge-generator](https://github.com/hhkaos/badge-generator) for inspiration.

## License

MIT
