import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "",
        };
        this.toggleBioEditor = this.toggleBioEditor.bind(this);
        this.updateInput = this.updateInput.bind(this);
        this.submitBio = this.submitBio.bind(this);
        this.handleButtonState = this.handleButtonState.bind(this);
    }
    toggleBioEditor() {
        this.setState({
            editorIsVisible: !this.state.editorIsVisible,
        });
    }
    updateInput({ target }) {
        this.setState({
            bio: target.value,
        });
    }
    submitBio() {
        fetch("/insert-bio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        })
            .then((resp) => resp.json())
            .then((bio) => {
                this.props.updateBio(bio);
                this.toggleBioEditor();
            });
    }
    handleButtonState() {
        if (!this.state.editorIsVisible) {
            if (this.props.bio === "" || this.props.bio === null) {
                return <button onClick={this.toggleBioEditor}>add bio</button>;
            } else {
                return <button onClick={this.toggleBioEditor}>edit bio</button>;
            }
        } else {
            return <button onClick={this.submitBio}>save</button>;
        }
    }
    render() {
        return (
            <div>
                <h1>Bio editor</h1>
                {this.state.editorIsVisible && (
                    <textarea
                        name="bio"
                        id="bio"
                        cols="30"
                        rows="10"
                        onChange={this.updateInput}
                        defaultValue={this.props.bio}
                    ></textarea>
                )}
                {!this.state.editorIsVisible && <p>{this.props.bio}</p>}
                {this.handleButtonState()}
            </div>
        );
    }
}
