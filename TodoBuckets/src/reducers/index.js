import { combineReducers } from "redux";

import bucketReducer from "./bucketReducer";

export default combineReducers({
  buckets: bucketReducer
});
