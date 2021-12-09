import UploadModal from "./upload-modal.js";
import Profile from "./profile.js";
import FindPeople from "./find-people.js";
import NavBar from "./nav-bar.js";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./other-profile.js";
import Friends from "./friends.js";
import Chat from "./chat.js";
import { useDispatch, useSelector } from "react-redux";
import { receiveCurUser } from "./redux/cur-user/slice.js";
import { useEffect } from "react";

export default function App() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.curUser);
    const imageModalVisible = useSelector((state) => state.imageModalVisible);

    useEffect(() => {
        console.log("starting fetch");
        fetch("/user.json")
            .then((resp) => resp.json())
            .then((user) => {
                dispatch(receiveCurUser(user));
            });
    }, []);

    return (
        <>
            <BrowserRouter>
                <div className="navbar backdrop"></div>
                <NavBar></NavBar>
                <section>
                    <Route exact path="/">
                        <Profile />
                    </Route>
                    <Route exact path="/users">
                        <FindPeople />
                    </Route>
                    <Route path="/users/:id">
                        <OtherProfile />
                    </Route>
                    <Route path="/friends">
                        <Friends />
                    </Route>
                    <Route path="/chat">
                        <Chat loggedIn={user?.id} />
                    </Route>
                    {imageModalVisible && <UploadModal />}
                </section>
            </BrowserRouter>
        </>
    );
}
