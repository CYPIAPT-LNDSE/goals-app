# Grow

Grow is an app for managing your personal goals, aimed primarily at users aged 12-18 in the CAMHs system.

Young users can set themselves goals, either on their own at home or in a session with a clinician.

### About Grow

Our [initial prototype](https://cypiapt-lndse.github.io/goals-app/) was built as part of a hackathon event hosted by Anna Freud Centre and Founders and Coders.

We chose the theme of growth, focussing on plants and vegetables like you might have in a garden. Each goal is represented by a choice of plant. The plant grows with progress. The user can review their overall progress based on an ecosystem of the plants they have grown.

Our app was chosen to be turned into a working MVP, which was then built over a period of 6 weeks.

### User journeys

We focussed on the following requirements:

* As a young user I can see a list of goals I'm working towards, so that I can keep my goals in mind at all times
* As a young user I want to be able to set my own goals easily
* As a young user I want to rate my progress towards a goal so that I have a record to review with my clinician.
* As a user I can review my progress over time


### How to build locally

Requirements:
* Node
* PostgreSQL
* A registered Facebook app

Follow these steps:
* Clone this repo
* `npm install`
* Create a `config.env` file in the root directory with the following values:

```
BASE_URL=https://localhost:4000
FB_APP_ID={ ID_OF_FACEBOOK_APP }
FB_CLIENT_SECRET={ FACEBOOK_CLIENT_SECRET }
COOKIE_PASSWORD={ NICE_SECURE_PASSWORD }
GROW_DB_URL={ LINK_TO_POSTGRES_DB }
```

For our AWS production DB we now have a separate set of env variables, which can be used if you want to test locally but with the production DB instance.
```
RDS_HOSTNAME={ HOSTNAME }
RDS_PORT=5432
RDS_DB_NAME=growdb
RDS_USERNAME={ USERNAME }
RDS_PASSWORD={ PASSWORD }
```

The variable names differ from those set on Heroku in order to be consistent with RDS's own conventions.

* `node server/database/db_build.js`
* Run `npm start` and `npm run watch` simultaneously
* To test: `npm test`

### Our tech stack

- hapi.js
- PostgreSQL
- oAuth with Facebook
- Socket.io
- React
- Redux
- GSAP
- Chart.js
- SASS
- Tape
- CI with Travis

### AWS

In order to deploy to the production version of the app on AWS Elastic Beanstalk you will need at least one of the following:

- Access to the AWS console (requires login details)
- Credentials for the AWS / Elastic beanstalk CLI tool

Once you have access to the CLI, you need to initialise Elastic Beanstalk for your local repository: `eb init --profile { AWS_USER_PROFILE }`

This prompts you to select a region (must be 15 - eu-west-2), an application (goals-app), and whether you want to use code commit (no).

you can deploy with the command: `eb deploy grow-env`

In order to deploy faster, you can build the app locally, force add / commit the webpack bundle  to source control (locally) and amend the `npm start command` to only start the server (i.e. remove the build step) before deploying
