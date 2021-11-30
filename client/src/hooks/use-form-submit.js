import { useState } from "react";

export default function useFormSubmit(url, userInput) {
    const [error, setError] = useState(false);

    const submit = (e) => {
        e.preventDefault(); // we need to prevent the default or else the form tag will automatically force request (& reload)
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        })
            .then(() => location.replace("/"))
            .catch((err) => setError(err));
    };

    return [submit, error];
}
