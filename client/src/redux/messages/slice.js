export default function chatReducer(chatMessages = null, action) {
    if (action.type == "chat/receivedMessages") {
        chatMessages = action.payload.chatMessages;
    }

    if (action.type == "chat/receiveNewMessage") {
        const chatMessagesArr = [...chatMessages];
        chatMessagesArr.unshift(action.payload.chatMessage);
        chatMessages = chatMessagesArr;
    }

    return chatMessages;
}

export function receiveMessages(chatMessages) {
    return {
        type: "chat/receivedMessages",
        payload: { chatMessages },
    };
}

export function receiveNewMessage(chatMessage) {
    return {
        type: "chat/receiveNewMessage",
        payload: { chatMessage },
    };
}
