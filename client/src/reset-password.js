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
            <h3>Reset Password</h3>
            <Route path="/password/reset">
                <h4>Please enter the e-mail you signed up with.</h4>
                <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="e-mail"
                />
                <Link to="/password/verify">
                    <button onClick={resetRequest}>submit</button>
                </Link>
            </Route>
            <Route path="/password/verify">
                <h4>
                    Please enter the reset code that was sent to ‘
                    {userInput.email}’
                </h4>
                {error && (
                    <h5 className="error">
                        Sorry, but the reset code you submitted is invalid.
                    </h5>
                )}
                <input
                    onChange={handleChange}
                    name="code"
                    type="text"
                    placeholder="code"
                />
                <h4>Please enter a new password.</h4>
                <input
                    onChange={handleChange}
                    name="newPassword"
                    type="password"
                    placeholder="new password"
                />
                <button onClick={submit}>submit</button>
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

// export default class resetPassword extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.updateInput = this.updateInput.bind(this);
//         this.resetRequest = this.resetRequest.bind(this);
//         this.setNewPassword = this.setNewPassword.bind(this);
//     }
//     updateInput({ target }) {
//         this.setState({
//             [target.name]: target.value,
//         });
//     }
//     resetRequest() {
//         fetch("/password/reset/request.json", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(this.state),
//         });
//     }
//     setNewPassword() {
//         fetch("/password/reset/verify.json", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(this.state),
//         })
//             .then((resp) => resp.json())
//             .then((data) => {
//                 if (data.error) {
//                     this.setState({
//                         error: true,
//                     });
//                 } else if (data.success) {
//                     location.replace("/password/success");
//                 }
//             });
//     }
//     render() {
//         return (
//             <>
//                 <h3>Reset Password</h3>
//                 <Route path="/password/reset">
//                     <h4>Please enter the e-mail you signed up with.</h4>
//                     <input
//                         onChange={this.updateInput}
//                         name="email"
//                         type="email"
//                         placeholder="e-mail"
//                     />
//                     <Link to="/password/verify">
//                         <button onClick={this.resetRequest}>submit</button>
//                     </Link>
//                 </Route>
//                 <Route path="/password/verify">
//                     <h4>
//                         Please enter the reset code that was sent to ‘
//                         {this.state.email}’
//                     </h4>
//                     {this.state.error && (
//                         <h5 className="error">
//                             Sorry, but the reset code you submitted is invalid.
//                         </h5>
//                     )}
//                     <input
//                         onChange={this.updateInput}
//                         name="code"
//                         type="text"
//                         placeholder="code"
//                     />
//                     <h4>Please enter a new password.</h4>
//                     <input
//                         onChange={this.updateInput}
//                         name="newPassword"
//                         type="password"
//                         placeholder="new password"
//                     />
//                     <button onClick={this.setNewPassword}>submit</button>
//                 </Route>
//                 <Route path="/password/success">
//                     <h4>We successfully updated your password.</h4>
//                     <h3>
//                         <Link to="/login">Login</Link> with your new password
//                     </h3>
//                 </Route>
//             </>
//         );
//     }
// }
