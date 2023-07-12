import { combineReducers, createStore } from "redux";
import auth from "./reducers/authReducer";
import cart from "./reducers/cartReducer";

const rootReducer = combineReducers({ auth, cart });
const store = createStore(rootReducer);

export default store;
