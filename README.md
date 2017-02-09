# GoalGrow

You can view the app [here](https://cypiapt-lndse.github.io/goals-app/).

GoalGrow is an app primarily aimed at 12-18 year-olds in the CAMHs system. Our young users can set themselves goals, either on their own at home, or in a session with a clinician.

We have chosen the theme of growth, focussing on plants and vegetables like you might have in a garden. Each goal is represented by a choice of plant. The plant grows with progress. The user can review their overall progress based on an ecosystem of the plants they have grown.

For our MVP we have focussed on the following user journeys:

## As a young user I can see a list of goals I'm working towards, so that I can keep my goals in mind at all times

On our landing page, the user immediately sees a list of all goals they have set so far. The layout is optimised for viewing 3 goals at one time. A user can add a new goal if they want to.

## As a young user I want to be able to set my own goals easily

We have a clear "Add a goal" call to action on the app's landing page. By adding a new goal, they have a short and simple input field. Users are not required to add too much text. Instead they can choose an image. In the future they might be able to add a custom image or take a photo from their camera. When they add a goal, they are redirected back to the landing page / list of existing goals.

## As a young user I want to rate my progress towards a goal so that I have a record to review with my clinician.

We have made the process of reviewing a goal as fun and simple as possible. The user sees a basic animation of a flower growing as they rate their progress on a sliding scale. The user can submit their progress and then compare it to recent ratings.

## As a user I can review my progress over time

This step is primarily aimed at users who will be rating their progress in a session with a clinician. We use a diagram, which is made up of a collection of animated sliding scales.



## Building

If running for the first time:

```sass public/styles/style.scss public/styles/style.css```

Every time:

```sass --watch public/styles/style.scss:public/styles/style.css```

## Tech stack

- Hapi server
- Postgres database
- User authentication (either with a username and password, or a passwordless option via email token)
- Simple mail server
- A dynamic frontend with animations, we would like to use React and Redux. If, for whatever reason, we were to ease off on the animations (depends on brower compatibility concerns), we could do it without the React.
