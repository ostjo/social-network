// import { Component } from "react";
import useForm from "./hooks/use-form.js";
import useFormSubmit from "./hooks/use-form-submit.js";
import { Link } from "react-router-dom";

export default function Registration() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/registration.json", userInput, "/");

    return (
        <>
            <div className="registration reg-modal">
                <h3>
                    Sign up now and become part of{" "}
                    <span className="txt-highlight">the crew</span>
                </h3>
                {error && <h5 className="error">Oops!</h5>}
                <form className="reg-form" onSubmit={submit}>
                    <div className="reg-input-fields">
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
                    </div>
                    <div className="reg-cta">
                        <button className="xl" type="submit">
                            sign up
                        </button>
                        <p>
                            <Link to="/login">login</Link>
                        </p>
                    </div>
                </form>
            </div>
        </>
    );
}
