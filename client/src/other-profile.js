import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router";

export default function OtherProfile() {
    const { id } = useParams();
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then((resp) => resp.json())
            .then((result) => {
                if (result.ownProfile) {
                    return history.replace("/");
                }
                setUser(result);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div id="profile-page">
            <div className="profile-picture">
                <img
                    src={user?.profilePic || "./bean-favicon.png"}
                    alt={user?.firstname + " " + user?.lastname}
                ></img>
            </div>
            <div>
                <h2>
                    {user?.firstname} {user?.lastname}
                </h2>
                <p>{user?.bio}</p>
            </div>
        </div>
    );
}
