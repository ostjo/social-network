import { Component } from "react";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {};
        this.updateInput = this.updateInput.bind(this);
        this.register = this.register.bind(this);
    }
    updateInput({ target }) {
        this.setState({
            // target.name retrieves the name attribute of the corresponding input field (e.g. name="firstname")
            // target.value retrieves the text that was passed into the corresponding input field
            [target.name]: target.value,
        });
    }
    register() {
        // add the user to our db
        fetch("/registration.json", {
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
                <h3>Sign up to become a part of us</h3>
                {this.state.error && <h5 className="error">Oops!</h5>}
                <input
                    onChange={this.updateInput}
                    name="firstname"
                    type="text"
                    placeholder="first name"
                />
                <input
                    onChange={this.updateInput}
                    name="lastname"
                    type="text"
                    placeholder="last name"
                />
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
                <button onClick={this.register}>Sign up</button>
            </>
        );
    }
}
