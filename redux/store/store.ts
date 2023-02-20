import { combineReducers, createStore, Reducer } from "redux";
import { firstReducer } from "../first";

const rootReducer = combineReducers({
    first: firstReducer,
})

const store = createStore(rootReducer);
export default store;