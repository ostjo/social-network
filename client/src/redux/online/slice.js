export default function onlineUsersReducer(onlineUsers = null, action) {
    if (action.type == "online/receivedOnlineUsers") {
        onlineUsers = action.payload.onlineUsers;
    }

    return onlineUsers;
}

export function receiveOnlineUsers(onlineUsers) {
    return {
        type: "online/receivedOnlineUsers",
        payload: { onlineUsers },
    };
}
