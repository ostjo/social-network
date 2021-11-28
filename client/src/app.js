import { Component } from "react";
import ProfilePic from "./profile-pic.js";
import UploadModal from "./upload-modal.js";
import Profile from "./profile.js";

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
                <header className="navbar">
                    <img className="logo" src="./bean-favicon.png"></img>
                    <div className="nav-user">
                        <h3>
                            {this.state.firstname} {this.state.lastname}
                        </h3>
                        <ProfilePic
                            profilePic={this.state.profilePic}
                            toggleModalVisibility={this.toggleModalVisibility}
                            largePreview={false}
                        />
                    </div>
                </header>
                {this.state.modalVisible && (
                    <UploadModal
                        updateProfilePic={this.updateProfilePic}
                        toggleModalVisibility={this.toggleModalVisibility}
                    />
                )}
                <Profile
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    profilePic={this.state.profilePic}
                    bio={this.state.bio}
                    toggleModalVisibility={this.toggleModalVisibility}
                    updateBio={this.updateBio}
                />
            </>
        );
    }
}
