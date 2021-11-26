import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorIsVisible: false,
            draftBio: "",
        };
        this.toggleBioEditor = this.toggleBioEditor.bind(this);
    }
    toggleBioEditor() {
        this.setState({
            editorIsVisible: !this.editorIsVisible,
        });
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
                    ></textarea>
                )}
                <button onClick={this.toggleBioEditor}>Add bio</button>
            </div>
        );
    }
}
