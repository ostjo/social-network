// import { Component } from "react";
import useForm from "./hooks/use-form.js";
import useFormSubmit from "./hooks/use-form-submit.js";
import { Link } from "react-router-dom";

export default function Login() {
    const [userInput, handleChange] = useForm();
    const [submit, error] = useFormSubmit("/login.json", userInput, "/");

    return (
        <>
            <div className="registration reg-modal">
                <h3>
                    Hey.
                    <br />
                    Good to see you.
                </h3>
                {error && (
                    <h5 className="error">
                        Oh no! Either e-mail or password are wrong.
                    </h5>
                )}
                <form className="reg-form" onSubmit={submit}>
                    <div className="reg-input-fields">
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
                            login
                        </button>
                        <p>
                            <Link to="/">sign up</Link>
                        </p>
                    </div>
                </form>
                <Link className="link" to="/password/reset">
                    <p>Forgot your password?</p>
                </Link>
            </div>
        </>
    );
}

// export default class Login extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.updateInput = this.updateInput.bind(this);
//         this.login = this.login.bind(this);
//     }
//     updateInput({ target }) {
//         this.setState({
//             [target.name]: target.value,
//         });
//     }
//     login() {
//         fetch("/login.json", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(this.state),
//         })
//             .then((resp) => resp.json())
//             .then((data) => {
//                 if (data.success) {
//                     location.replace("/");
//                 } else {
//                     this.setState({
//                         error: true,
//                     });
//                 }
//             });
//     }
//     render() {
//         return (
//             <>
//                 <h3>Login</h3>
//                 {this.state.error && (
//                     <h5 className="error">
//                         Oh no! Either e-mail or password are wrong.
//                     </h5>
//                 )}
//                 <input
//                     onChange={this.updateInput}
//                     name="email"
//                     type="email"
//                     placeholder="e-mail"
//                 />
//                 <input
//                     onChange={this.updateInput}
//                     name="password"
//                     type="password"
//                     placeholder="password"
//                 />
//                 <button onClick={this.login}>submit</button>
//                 <Link to="/password/reset">
//                     <p>Forgot your password?</p>
//                 </Link>
//                 <p>
//                     Sign up <Link to="/">here.</Link>
//                 </p>
//             </>
//         );
//     }
// }
