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
