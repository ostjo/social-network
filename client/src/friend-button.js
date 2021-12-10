import { useEffect, useState } from "react";

export default function FriendButton({ viewed }) {
    const [relState, setRelState] = useState("");

    // find out our current relationship status with the user we are looking at
    // as a result of this fetch our btn should display the correct txt!
    useEffect(() => {
        fetch(`/api/rel-status/${viewed}`)
            .then((resp) => resp.json())
            .then((status) => {
                setRelState(status.status);
            });
    }, [viewed]);

    // when the btn gets clicked, we need to update the relationship in the database,
    // and update the btn text to reflect this change
    function updateRelStatus() {
        fetch("/api/update-relationship", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ relState: relState, viewed: viewed }),
        })
            .then((resp) => resp.json())
            .then((status) => {
                setRelState(status.status);
            });
    }

    return (
        <button onClick={updateRelStatus} className="m wide">
            {relState}
        </button>
    );
}
