import { Component } from "react";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {};
        this.updateInput = this.updateInput.bind(this);
        this.login = this.login.bind(this);
    }
    updateInput({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    login() {
        fetch("/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            });
    }
    render() {
        return (
            <>
                <h3>Login</h3>
                {this.state.error && (
                    <h5 className="error">
                        Oh no! Either e-mail or password are wrong.
                    </h5>
                )}
                <input
                    onChange={this.updateInput}
                    name="email"
                    type="email"
                    placeholder="e-mail"
                />
                <input
                    onChange={this.updateInput}
                    name="password"
                    type="password"
                    placeholder="password"
                />
                <button onClick={this.login}>submit</button>
                <p>
                    Sign up <Link to="/">here.</Link>
                </p>
            </>
        );
    }
}
