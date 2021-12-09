import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveUsers } from "./redux/people/slice.js";

export default function FindPeople() {
    const dispatch = useDispatch();
    const [search, updateSearch] = useState();
    const users = useSelector((state) => state?.users);

    useEffect(() => {
        showThreeLatestUsers();
    }, []);

    useEffect(() => {
        let abort;

        if (search === "" || !search) {
            // if the search input got deleted, show the three newest members again
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
            <h2>Find People</h2>
            <input
                name="userSearch"
                type="text"
                onChange={(e) => updateSearch(e.target.value)}
            />
            <h3>These are the three newest members:</h3>
            <div className="search-results">
                {users?.map((user) => (
                    <Link
                        key={user.id}
                        to={`/users/${user.id}`}
                        title={`/users/${user.id}`}
                    >
                        <div className="users">
                            <img
                                src={user.profilePic}
                                alt={user.firstname + " " + user.lastname}
                            />
                            <h3>
                                {user.firstname} {user.lastname}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
}
