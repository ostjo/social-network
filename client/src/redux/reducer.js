import { combineReducers } from "redux";
import friendsReducer from "./friends/slice.js";
import chatReducer from "./messages/slice.js";

const rootReducer = combineReducers({
    friendsAndWannabes: friendsReducer,
    chatMessages: chatReducer,
});

export default rootReducer;
