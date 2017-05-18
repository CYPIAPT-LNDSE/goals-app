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
