import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfilePic } from "./redux/cur-user/slice";
import { toggleModalVisibility } from "./redux/img-modal/slice";

export default function UploadModal() {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");

    function updateFile(event) {
        console.log("getting file: ", event.target.files[0]);
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
                dispatch(updateProfilePic(profilePic));
                toggleModal();
            });
    }

    function toggleModal() {
        dispatch(toggleModalVisibility());
    }

    return (
        <>
            <div id="upload">
                <div id="modal">
                    <div onClick={toggleModal} className="close absolute"></div>
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
