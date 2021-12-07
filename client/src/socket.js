import { io } from "socket.io-client";
import { receiveMessages, receiveNewMessage } from "./redux/messages/slice.js";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) =>
            store.dispatch(receiveMessages(msgs))
        );

        socket.on("newChatMessage", (msg) => {
            console.log("about to dispatch yay, ", msg);
            store.dispatch(receiveNewMessage(msg));
        });
    }
};
