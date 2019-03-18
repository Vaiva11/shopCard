import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import middlewares from "./middleware";

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
