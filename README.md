# Hotel Search Backend APIs

## Implemented Using

1. Web Server - NodeJS + ExpressJs
2. Test Framework - Mocha + Chai
3. API Docs - Swagger JS Docs

## Scope

The web server exposes two APIs

1. For getting co-ordinates of a city - GET /locations
2. For getting list of hotels nearby - GET /hotels

From front-end, the first API should be invoked with search text for a location, it can be a address, city name, district name or country name. The api will return list of matching locations as`items` in which `Latitude` and `Longitude` are returned for each item.

These `Latitude` and `Longitude` are to be sent in second api call along with `radius` of search in Kilometers and optionally, page size. The api will return, list of matching hotels as `items` which will have details about the hotel such as name, address etc. along with `nextToken` for fetching next set of `items` and `previousToken` for previous set of `items`.

## Heroku Envrionment

URL : https://hotel-search-backend.herokuapp.com/

## Local Environment

### Steps for local setup

1. Clone the repo
2. Set values in `config/development.js` for `HERE_APP_ID` and `HERE_APP_CODE` OR rename `.env.sample` to `.env` and set values in the file. **Note: Make sure you dont commit these changes**
3. run `npm install`
4. run `npm run start-dev` for hot-reload enabled env
5. Browse `http://localhost:3000/' in browser

### Other commands

1. For running test cases - `npm run test`
2. For checking coverage - `npm run coverage`
3. For linting code - `npm run lint`
4. For fixing lint issues - `npm run lint:fix`
5. For formatting code - `npm run lint:format`

### Docker Support

1. Build docker image using - `docker build -t hotel-backend-api:local .`
2. Run app using docker - `docker run -it -p 8000:3000 -e HERE_APP_ID=<your_app_id> -e HERE_APP_CODE=<you_app_code> hotel-backend-api:local`
3. Browse `http://localhost:8000/' in browser
