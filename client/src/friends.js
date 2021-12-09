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
                        {!person.accepted ? (
                            <h5>
                                {person.firstname} {person.lastname}
                            </h5>
                        ) : (
                            <h6>
                                {person.firstname} {person.lastname}
                            </h6>
                        )}

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
            <div className="wannabe-cont">
                <h4>Friend requests</h4>
                {showFriendsOrWannabes(wannabes)}
            </div>
            <div className="friend-cont">
                <h4>Your friends</h4>
                {showFriendsOrWannabes(friends)}
            </div>
        </>
    );
}
