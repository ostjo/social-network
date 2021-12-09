export default function otherProfileReducer(profile = null, action) {
    if (action.type == "profile/receiveOtherProfile") {
        profile = action.payload.profile;
    }

    return profile;
}

export function receiveOtherProfile(profile) {
    return {
        type: "profile/receiveOtherProfile",
        payload: { profile },
    };
}
