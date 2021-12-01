// import { Component } from "react";
import { useState } from "react";

export default function UploadModal({
    toggleModalVisibility,
    updateProfilePic,
}) {
    const [file, setFile] = useState("");

    function updateFile(event) {
        setFile(event.target.files[0]);
    }

    function uploadImage() {
        const formData = new FormData();
        formData.append("file", file);
        fetch("/upload-profile.json", {
            method: "POST",
            body: formData,
        })
            .then((resp) => resp.json())
            .then(({ profilePic }) => {
                updateProfilePic(profilePic);
            });
    }

    return (
        <>
            <div id="upload">
                <div id="modal">
                    <div
                        onClick={toggleModalVisibility}
                        className="close absolute"
                    ></div>
                    <h3>Upload a new profile pic</h3>
                    <input
                        className="inputfile"
                        id="file"
                        name="file"
                        type="file"
                        accept="image/*"
                        onChange={updateFile}
                    />
                    <label htmlFor="file">
                        <span>choose a file</span>
                    </label>
                    <button className="light" onClick={uploadImage}>
                        upload
                    </button>
                </div>
            </div>
        </>
    );
}

// export default class UploadModal extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {};
//         this.setFile = this.setFile.bind(this);
//         this.uploadImage = this.uploadImage.bind(this);
//     }
//     setFile(event) {
//         this.setState({
//             file: event.target.files[0],
//         });
//     }
//     uploadImage() {
//         const formData = new FormData();
//         formData.append("file", this.state.file);
//         fetch("/upload-profile.json", {
//             method: "POST",
//             body: formData,
//         })
//             .then((resp) => resp.json())
//             .then(({ profilePic }) => {
//                 this.props.updateProfilePic(profilePic);
//             });
//     }
//     render() {
//         return (
//             <>
//                 <div id="upload">
//                     <div id="modal">
//                         <div
//                             onClick={this.props.toggleModalVisibility}
//                             className="close absolute"
//                         ></div>
//                         <h3>Upload a new profile pic</h3>
//                         <input
//                             className="inputfile"
//                             id="file"
//                             name="file"
//                             type="file"
//                             accept="image/*"
//                             onChange={this.setFile}
//                         />
//                         <label htmlFor="file">
//                             <span>choose a file</span>
//                         </label>
//                         <button className="light" onClick={this.uploadImage}>
//                             upload
//                         </button>
//                     </div>
//                 </div>
//             </>
//         );
//     }
// }
