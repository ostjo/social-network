import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    receiveFriendsAndWannabes,
    acceptFriendRequest,
    unfriend,
} from "./redux/friends/slice.js";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    // get two different lists of users from the redux state
    const friends = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter((fw) => fw.accepted)
    );
    const wannabes = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter((fw) => !fw.accepted)
    );

    useEffect(() => {
        fetch("/api/friends-and-wannabes")
            .then((resp) => resp.json())
            .then((friendsAndWannabes) => {
                dispatch(receiveFriendsAndWannabes(friendsAndWannabes));
            })
            .catch((err) => console.log(err));
    }, []);

    function showFriendsOrWannabes(frOrWb) {
        return (
            <div className="search-results">
                {frOrWb?.map((person) => (
                    <div key={person.id} className="users">
                        <Link
                            to={`/users/${person.id}`}
                            title={`/users/${person.id}`}
                        >
                            <img
                                src={person.profilePic}
                                alt={person.firstname + " " + person.lastname}
                            />
                        </Link>
                        <h3>
                            {person.firstname} {person.lastname}
                        </h3>
                        {!person.accepted ? (
                            <button onClick={acceptFriendReq(person.id)}>
                                accept
                            </button>
                        ) : (
                            <button onClick={unfriendFriend(person.id)}>
                                unfriend
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    }

    function acceptFriendReq(id) {
        return function () {
            fetch(`/api/friends/accept/${id}`, {
                method: "POST",
            })
                .then((resp) => resp.json())
                .then(() => dispatch(acceptFriendRequest(id)));
        };
    }

    function unfriendFriend(id) {
        return function () {
            fetch(`/api/friends/unfriend/${id}`, {
                method: "POST",
            })
                .then((resp) => resp.json())
                .then(() => dispatch(unfriend(id)));
        };
    }

    return (
        <>
            <h3>These people want to be your friend:</h3>
            {showFriendsOrWannabes(wannabes)}
            <h3>These are your friends:</h3>
            {showFriendsOrWannabes(friends)}
        </>
    );
}
