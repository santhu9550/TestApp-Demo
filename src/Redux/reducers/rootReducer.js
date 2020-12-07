import orderReducer from "./orderReducer";
const { combineReducers } = require("redux");

const rootReducer = combineReducers({ orderReducer });
export default rootReducer;
