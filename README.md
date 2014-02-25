## Running the app locally

Start with:

    $ grunt server

The app will be accessible on [http://localhost:3000](http://localhost:3000).

## Installing

1. Run `npm install`.
2. Start the app via `grunt server`. (If grunt is missing, install it via `npm install -g grunt-cli`.)

The web app should now be running on [http://localhost:3000](http://localhost:3000).

## Deploying

Heroku is used for hosting.

### Setting up a new Heroku app

Use [Heroku's node buildpack](https://github.com/heroku/heroku-buildpack-nodejs) to get nodejs support. 

    $ heroku config:add BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-nodejs
    
### Push a new version

Use Herokus git deploy.

    $ git push your-heroku-app master
