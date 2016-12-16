# WTA-TrailMap
A tool to discover the elevation change of your route, built at BC Hacks

Check out current running server at: https://washingtontrailfinder.herokuapp.com/

# Prerequisites

This is a Node.js application, so you need to have that installed, along with NPM. If you want logging, the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) is needed.

# Setup
1. Clone the Repo
2. Install dependencies with `npm i`
3. Start a server, using `npm start`
4. Access the project by going to `https://localhost:8000`

# Logging

Logging requires the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)

After setting up the Heroku CLI, logs can be started with the command `npm start log`. If you desire live logs, you can run `npm run live-log`. These logs output the trail looked up, as well as the IP the site was accessed from.

That should be it, feel free to contact us with any questions or comments!
