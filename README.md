# arp-web

## Setup Build Environment

### Install global dependencies

`npm install -g grunt-cli bower yo`

### Install app dependencies

`npm install && bower install`

Install Ruby if not already installed. Follow instructions available [here](https://www.ruby-lang.org/en/documentation/installation/)

`gem install compass
`

## Configuration
`cp app/env.js.template app/env.js` 

## Development

Run `npm run serve` for starting up dev server.

## Deployment

### Build

Run `npm run build` for building the app
This would create a new directory called `arp-web`

### Configure

`cp app/env.js.template arp-web/env.js`

You can choose to create the env.js file in any way that you may like.

### Deploy

arp-web can be copied to your server's webapps directory to serve from it.

Make sure to setup your server to set headers on **env.js** to **never cache it**. Otherwise configuration changes might not reflect for some users in the future.
[https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) See Examples/Preventing caching

## Testing

Running `npm run test` will run the unit tests with karma.

## E2E Testing
Refer to [http://www.protractortest.org/#/server-setup](http://www.protractortest.org/#/server-setup) 

First-time setup

`npm install -g protractor && npm run pree2e`

Before running the tests, run the following and keep it running

`npm run webdriver`

In a different window, run the tests

`npm run e2e`
