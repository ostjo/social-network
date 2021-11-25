import { Component } from "react";
import ProfilePic from "./profile-pic.js";
import UploadModal from "./upload-modal.js";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
        this.uploadModal = this.uploadModal.bind(this);
        this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
    }
    uploadModal() {
        this.toggleModalVisibility();
    }
    toggleModalVisibility() {
        this.setState({
            modalVisible: !this.state.modalVisible,
        });
    }
    render() {
        return (
            <>
                <header className="navbar">
                    <img className="logo" src="./bean-favicon.png"></img>
                    <ProfilePic
                        profileImg={this.state.profileImg}
                        uploadModal={this.uploadModal}
                    />
                </header>
                {this.state.modalVisible && <UploadModal />}
            </>
        );
    }
}
