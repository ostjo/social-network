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
                } else if (result.error) {
                    return setUser("error");
                }
                setUser(result);
            })
            .catch((err) => console.log(err));
    }, [id]);

    return (
        <div id="profile-page">
            {user !== "error" && (
                <>
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
