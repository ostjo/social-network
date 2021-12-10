import { useEffect } from "react";
import { useParams, useHistory } from "react-router";
import FriendButton from "./friend-button.js";
import { useDispatch, useSelector } from "react-redux";
import { receiveOtherProfile } from "./redux/other-profile/slice.js";

export default function OtherProfile() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.profile);
    const history = useHistory();

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then((resp) => resp.json())
            .then((result) => {
                if (result.ownProfile) {
                    return history.replace("/");
                } else if (result.error) {
                    return dispatch(receiveOtherProfile("error"));
                }
                dispatch(receiveOtherProfile(result));
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div id="profile-page">
            {user !== "error" && (
                <>
                    <div className="profile-picture">
                        <img
                            src={user?.profilePic || "/bean-favicon.png"}
                            alt={user?.firstname + " " + user?.lastname}
                        ></img>
                    </div>
                    <div className="profile">
                        <h3>
                            {user?.firstname} {user?.lastname}
                        </h3>
                        <p className="bio">{user?.bio}</p>
                        <FriendButton viewed={id} />
                    </div>
                </>
            )}
            {user === "error" && (
                <>
                    <h3>Uh oh. This user does not exist.</h3>
                </>
            )}
        </div>
    );
}
