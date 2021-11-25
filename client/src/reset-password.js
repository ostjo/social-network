import { Component } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";

export default class resetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.updateInput = this.updateInput.bind(this);
        this.resetRequest = this.resetRequest.bind(this);
        this.setNewPassword = this.setNewPassword.bind(this);
    }
    updateInput({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    resetRequest() {
        fetch("/password/reset/request.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        });
    }
    setNewPassword() {
        fetch("/password/reset/verify.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.error) {
                    this.setState({
                        error: true,
                    });
                } else if (data.success) {
                    location.replace("/password/success");
                }
            });
    }
    render() {
        return (
            <>
                <h3>Reset Password</h3>
                <Route path="/password/reset">
                    <h4>Please enter the e-mail you signed up with.</h4>
                    <input
                        onChange={this.updateInput}
                        name="email"
                        type="email"
                        placeholder="e-mail"
                    />
                    <Link to="/password/verify">
                        <button onClick={this.resetRequest}>submit</button>
                    </Link>
                </Route>
                <Route path="/password/verify">
                    <h4>
                        Please enter the reset code that was sent to ‘
                        {this.state.email}’
                    </h4>
                    {this.state.error && (
                        <h5 className="error">
                            Sorry, but the reset code you submitted is invalid.
                        </h5>
                    )}
                    <input
                        onChange={this.updateInput}
                        name="code"
                        type="text"
                        placeholder="code"
                    />
                    <h4>Please enter a new password.</h4>
                    <input
                        onChange={this.updateInput}
                        name="newPassword"
                        type="password"
                        placeholder="new password"
                    />
                    <button onClick={this.setNewPassword}>submit</button>
                </Route>
                <Route path="/password/success">
                    <h4>We successfully updated your password.</h4>
                    <h3>
                        <Link to="/login">Login</Link> with your new password
                    </h3>
                </Route>
            </>
        );
    }
}
