export default function curUserReducer(curUser = null, action) {
    if (action.type == "curUser/receiveCurUser") {
        curUser = action.payload.curUser;
    }

    if (action.type == "curUser/updateProfilePic") {
        const curUserUpd = { ...curUser, profilePic: action.payload.newImg };
        curUser = curUserUpd;
    }

    if (action.type == "curUser/updateBio") {
        const curUserUpd = { ...curUser, bio: action.payload.newBio };
        curUser = curUserUpd;
    }

    return curUser;
}

export function receiveCurUser(curUser) {
    return {
        type: "curUser/receiveCurUser",
        payload: { curUser },
    };
}

export function updateProfilePic(newImg) {
    return {
        type: "curUser/updateProfilePic",
        payload: { newImg },
    };
}

export function updateBio(newBio) {
    return {
        type: "curUser/updateBio",
        payload: { newBio },
    };
}
