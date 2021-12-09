export default function peopleReducer(users = null, action) {
    if (action.type == "people/receiveUsers") {
        users = action.payload.users;
    }

    return users;
}

export function receiveUsers(users) {
    return {
        type: "people/receiveUsers",
        payload: { users },
    };
}
