const logger = ({ getState, dispatch }) => next => action => {
  const prevState = getState();
  const result = next(action);
  const nextState = getState();

  console.log(action.type, action.payload);
  console.log("PrevState ", prevState);
  console.log("Action ", result);
  console.log("Next state", nextState);

  if (action.type === "TOGGLE_FAVORITE_PRODUCT") {
    dispatch({ type: "RANDOM" });
  }
  return result;
};

export default logger;
