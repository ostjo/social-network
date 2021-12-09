import { combineReducers } from "redux";
import curUserReducer from "./cur-user/slice.js";
import imageModalReducer from "./img-modal/slice.js";
import friendsReducer from "./friends/slice.js";
import chatReducer from "./messages/slice.js";
import peopleReducer from "./people/slice.js";
import otherProfileReducer from "./other-profile/slice.js";

const rootReducer = combineReducers({
    curUser: curUserReducer,
    imageModalVisible: imageModalReducer,
    friendsAndWannabes: friendsReducer,
    chatMessages: chatReducer,
    users: peopleReducer,
    profile: otherProfileReducer,
});

export default rootReducer;
