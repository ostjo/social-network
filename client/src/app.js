import { Component } from "react";
import UploadModal from "./upload-modal.js";
import Profile from "./profile.js";
import FindPeople from "./find-people.js";
import NavBar from "./nav-bar.js";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./other-profile.js";
import Friends from "./friends.js";
import Chat from "./chat.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
        this.updateProfilePic = this.updateProfilePic.bind(this);
        this.updateBio = this.updateBio.bind(this);
    }
    toggleModalVisibility() {
        console.log("Show Modal!");
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    }
    componentDidMount() {
        fetch("/user.json")
            .then((resp) => resp.json())
            .then((user) => {
                console.log("user data received: ", user);
                this.setState({
                    userId: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    profilePic: user.profilePic,
                    bio: user.bio,
                });
            });
    }
    updateProfilePic(newImg) {
        this.setState(
            {
                profilePic: newImg,
            },
            this.toggleModalVisibility()
        );
    }
    updateBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }
    render() {
        return (
            <>
                <BrowserRouter>
                    <NavBar
                        firstname={this.state.firstname}
                        lastname={this.state.lastname}
                        profilePic={this.state.profilePic}
                        toggleModalVisibility={this.toggleModalVisibility}
                    ></NavBar>
                    <section>
                        <Route exact path="/">
                            <Profile
                                firstname={this.state.firstname}
                                lastname={this.state.lastname}
                                profilePic={this.state.profilePic}
                                bio={this.state.bio}
                                toggleModalVisibility={
                                    this.toggleModalVisibility
                                }
                                updateBio={this.updateBio}
                            />
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
                            <Chat />
                        </Route>
                        {this.state.modalVisible && (
                            <UploadModal
                                updateProfilePic={this.updateProfilePic}
                                toggleModalVisibility={
                                    this.toggleModalVisibility
                                }
                            />
                        )}
                    </section>
                </BrowserRouter>
            </>
        );
    }
}
