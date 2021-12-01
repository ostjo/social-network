// import { Component } from "react";
import { useState } from "react";

export default function BioEditor({ bio, updateBio }) {
    const [editorIsVisible, setEditorVisibility] = useState(false);
    const [draftBio, setDraftBio] = useState({});

    function toggleBioEditor() {
        setEditorVisibility(!editorIsVisible);
    }

    const handleChange = (e) => setDraftBio({ draftBio: e.target.value });

    function submitBio() {
        if (draftBio === "") {
            return toggleBioEditor();
        }
        fetch("/insert-bio.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(draftBio),
        })
            .then((resp) => resp.json())
            .then((bio) => {
                updateBio(bio);
                toggleBioEditor();
            });
    }

    function handleButtonState() {
        if (!editorIsVisible) {
            if (bio === "" || !bio) {
                return <button onClick={toggleBioEditor}>add bio</button>;
            } else {
                return <button onClick={toggleBioEditor}>edit bio</button>;
            }
        } else {
            return <button onClick={submitBio}>save</button>;
        }
    }

    return (
        <div>
            <h1>Bio editor</h1>
            {editorIsVisible && (
                <textarea
                    name="bio"
                    id="bio"
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                    defaultValue={bio}
                ></textarea>
            )}
            {!editorIsVisible && <p>{bio}</p>}
            {handleButtonState()}
        </div>
    );
}

// export default class BioEditor extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             editorIsVisible: false,
//             draftBio: "",
//         };
//         this.toggleBioEditor = this.toggleBioEditor.bind(this);
//         this.updateInput = this.updateInput.bind(this);
//         this.submitBio = this.submitBio.bind(this);
//         this.handleButtonState = this.handleButtonState.bind(this);
//     }
//     toggleBioEditor() {
//         this.setState({
//             editorIsVisible: !this.state.editorIsVisible,
//         });
//     }
//     updateInput({ target }) {
//         this.setState(
//             {
//                 draftBio: target.value,
//             },
//             console.log("draft bio: ", this.draftBio)
//         );
//     }
//     submitBio() {
//         if (this.state.draftBio === "") {
//             return this.toggleBioEditor();
//         }
//         fetch("/insert-bio.json", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(this.state),
//         })
//             .then((resp) => resp.json())
//             .then((bio) => {
//                 this.props.updateBio(bio);
//                 this.toggleBioEditor();
//             });
//     }
//     handleButtonState() {
//         if (!this.state.editorIsVisible) {
//             if (this.props.bio === "" || !this.props.bio) {
//                 return <button onClick={this.toggleBioEditor}>add bio</button>;
//             } else {
//                 return <button onClick={this.toggleBioEditor}>edit bio</button>;
//             }
//         } else {
//             return <button onClick={this.submitBio}>save</button>;
//         }
//     }

//     render() {
//         console.log("this.state:	", this.state);
//         return (
//             <div>
//                 <h1>Bio editor</h1>
//                 {this.state.editorIsVisible && (
//                     <textarea
//                         name="bio"
//                         id="bio"
//                         cols="30"
//                         rows="10"
//                         onChange={this.updateInput}
//                         defaultValue={this.props.bio}
//                     ></textarea>
//                 )}
//                 {!this.state.editorIsVisible && <p>{this.props.bio}</p>}
//                 {this.handleButtonState()}
//             </div>
//         );
//     }
// }
