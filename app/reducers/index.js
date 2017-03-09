/* reducers */
// import reducers here

const defaultState = {
  // app state here
  goals: [
    {
      id: 0,
      name: 'Eat more pizza',
      created: 1488984810654,
      avatar: 'sprout',
      status: 0,
      currentRating: 7,
      ratings: [],
    },
    {
      id: 1,
      name: 'Drink more champagne',
      created: 1488984810658,
      avatar: 'pumpkin',
      status: 0,
      currentRating: 8,
      ratings: [],
    },
    {
      id: 2,
      name: 'Be cool',
      created: 1488984810658,
      avatar: 'pepper',
      status: 0,
      currentRating: 10,
      ratings: [],
    },
  ],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    // cases here
    default:
    return state;
  }
};
