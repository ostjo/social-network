import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./registration.js";
import Login from "./login.js";

export default function Welcome() {
    return (
        <>
            <img src="../bean-favicon.png" className="logo"></img>
            <h1>Welcome to this Social Network</h1>
            <BrowserRouter>
                <Route exact path="/">
                    <Registration />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </BrowserRouter>
        </>
    );
}
