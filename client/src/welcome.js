import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration.js";
import Login from "./login.js";
import ResetPassword from "./reset-password";

export default function Welcome() {
    return (
        <>
            <div id="start">
                <div className="registration backdrop"></div>
                <div id="intro">
                    <img src="../crew-p-logo_xl.svg" className="logo"></img>
                    <h1>Cool Beans only.</h1>
                </div>
                <BrowserRouter>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/password">
                        <ResetPassword />
                    </Route>
                </BrowserRouter>
            </div>
        </>
    );
}
