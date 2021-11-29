import { useState, useEffect } from "react";

export default function FindPeople() {
    const [users, setUsers] = useState();
    const [search, updateSearch] = useState();

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
                    setUsers(matchingUsers);
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
                setUsers(latestUsers);
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
                    <div className="users" key={user.id}>
                        <img
                            src={user.profilePic}
                            alt={user.firstname + " " + user.lastname}
                        />
                        <h3>
                            {user.firstname} {user.lastname}
                        </h3>
                    </div>
                ))}
            </div>
        </>
    );
}
