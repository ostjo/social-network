// import { Component } from "react";
import { Link, Route } from "react-router-dom";
import useForm from "./hooks/use-form.js";
import useFormSubmit from "./hooks/use-form-submit.js";

export default function ResetPassword() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit(
        "/password/reset/verify.json",
        userInput,
        "/password/success"
    );

    function resetRequest() {
        fetch("/password/reset/request.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userInput),
        });
    }

    return (
        <>
            <div className="registration reg-modal">
                <Route path="/password/reset">
                    <div className="pw-reset">
                        <h3>Reset Password</h3>
                        <div className="pw-reset-form">
                            <div className="step">
                                <h4>➊</h4>
                                <h5>
                                    First, please enter the e-mail you signed up
                                    with.
                                </h5>
                            </div>
                            <input
                                onChange={handleChange}
                                name="email"
                                type="email"
                                placeholder="e-mail"
                            />
                            <Link to="/password/verify">
                                <button className="xl" onClick={resetRequest}>
                                    submit
                                </button>
                            </Link>
                        </div>
                    </div>
                </Route>
                <Route path="/password/verify">
                    <div className="pw-reset">
                        <h3>Reset Password</h3>
                        <div className="pw-reset-form">
                            <div className="step">
                                <h4>➋</h4>
                                <h5>
                                    We’ve sent a reset code to ‘
                                    {userInput.email}’. Please enter the code
                                    and provide a new password.
                                </h5>
                            </div>
                            <input
                                onChange={handleChange}
                                name="code"
                                type="text"
                                placeholder="code"
                            />
                            <input
                                onChange={handleChange}
                                name="newPassword"
                                type="password"
                                placeholder="new password"
                            />
                            {error && (
                                <h5 className="error">
                                    Oops. Seems like the reset code you
                                    submitted is wrong.
                                </h5>
                            )}
                            <button className="xl" onClick={submit}>
                                submit
                            </button>
                        </div>
                    </div>
                </Route>
                <Route path="/password/success">
                    <div className="pw-reset">
                        <h3>Reset Password</h3>
                        <div className="pw-reset-form">
                            <div className="step">
                                <h4>☻</h4>
                                <h5>
                                    Yay! You can now{" "}
                                    <Link to="/login">login</Link> with your new
                                    password.
                                </h5>
                            </div>
                        </div>
                    </div>
                </Route>
            </div>
        </>
    );
}
