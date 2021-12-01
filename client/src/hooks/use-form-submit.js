import { useState } from "react";

export default function useFormSubmit(url, userInput, redirectTo) {
    const [error, setError] = useState(false);

    const submit = (e) => {
        console.log("subit coming in: ", userInput);
        console.log("event:", e);
        e.preventDefault(); // we need to prevent the default or else the form tag will automatically force request (& reload)
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    location.replace(redirectTo);
                } else {
                    setError(true);
                }
            });
    };

    return [submit, error];
}
