import { io } from "socket.io-client";
import { receiveMessages, receiveNewMessage } from "./redux/messages/slice.js";
import { receiveOnlineUsers } from "./redux/online/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) =>
            store.dispatch(receiveMessages(msgs))
        );

        socket.on("newChatMessage", (msg) => {
            store.dispatch(receiveNewMessage(msg));
        });

        socket.on("currentlyOnline", (onlineUsers) => {
            store.dispatch(receiveOnlineUsers(onlineUsers));
        });
    }
};
