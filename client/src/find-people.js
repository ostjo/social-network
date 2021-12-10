import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers } from "./redux/people/slice.js";

export default function FindPeople() {
    const dispatch = useDispatch();
    const [search, updateSearch] = useState();
    const [latestUsers, updateLatestUsers] = useState(true);
    const users = useSelector((state) => state?.users);

    useEffect(() => {
        showThreeLatestUsers();
    }, []);

    useEffect(() => {
        let abort;

        if (search === "" || !search) {
            // if the search input got deleted, show the three newest members again
            updateLatestUsers(true);
            return showThreeLatestUsers();
        }

        fetch("/users.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ search }),
        })
            .then((resp) => resp.json())
            .then((matchingUsers) => {
                if (!abort) {
                    dispatch(receiveUsers(matchingUsers));
                    updateLatestUsers(false);
                }
            });

        return () => {
            abort = true;
        };
    }, [search]);

    function showThreeLatestUsers() {
        fetch("/latest-users.json")
            .then((resp) => resp.json())
            .then((latestUsers) => {
                dispatch(receiveUsers(latestUsers));
            });
    }

    return (
        <>
            <div className="search-section">
                <input
                    className="user-search"
                    name="userSearch"
                    type="text"
                    placeholder="search for a friend"
                    onChange={(e) => updateSearch(e.target.value)}
                />
                <div className="friend-cont">
                    {users?.length === 0 && (
                        <h5>Sorry, we can’t find this person.</h5>
                    )}
                    {latestUsers && <h4>Fresh crew members</h4>}
                    <div className="search-results ">
                        {users?.map((user) => (
                            <div key={user.id} className="users">
                                <Link
                                    to={`/users/${user.id}`}
                                    title={`/users/${user.id}`}
                                >
                                    <img
                                        src={user.profilePic}
                                        alt={
                                            user.firstname + " " + user.lastname
                                        }
                                    />
                                </Link>
                                <h6>
                                    {user.firstname} {user.lastname}
                                </h6>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
