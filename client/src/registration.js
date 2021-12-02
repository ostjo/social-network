// import { Component } from "react";
import useForm from "./hooks/use-form.js";
import useFormSubmit from "./hooks/use-form-submit.js";
import { Link } from "react-router-dom";

export default function Registration() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/registration.json", userInput, "/");

    return (
        <>
            <div className="registration">
                <h3>Sign up to become a part of us</h3>
                {error && <h5 className="error">Oops!</h5>}
                <form onSubmit={submit}>
                    <input
                        onChange={handleChange}
                        name="firstname"
                        type="text"
                        placeholder="first name"
                    />
                    <input
                        onChange={handleChange}
                        name="lastname"
                        type="text"
                        placeholder="last name"
                    />
                    <input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="e-mail"
                    />
                    <input
                        onChange={handleChange}
                        name="password"
                        type="password"
                        placeholder="password"
                    />
                    <button type="submit">Sign up</button>
                </form>
                <p>
                    Already signed up? Log in <Link to="/login">here.</Link>
                </p>
            </div>
        </>
    );
}
