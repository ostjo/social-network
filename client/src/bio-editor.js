import { useSelector, useDispatch } from "react-redux";
import { updateBio } from "./redux/cur-user/slice";
import { useState } from "react";

export default function BioEditor() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.curUser);
    const [editorIsVisible, setEditorVisibility] = useState(false);
    const [draftBio, setDraftBio] = useState({});

    function toggleBioEditor() {
        setEditorVisibility(!editorIsVisible);
    }

    const handleChange = (e) => setDraftBio({ draftBio: e.target.value });

    const submitBio = () => {
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
                dispatch(updateBio(bio));
                toggleBioEditor();
            });
    };

    const handleButtonState = () => {
        if (!editorIsVisible) {
            if (user?.bio === "" || !user?.bio) {
                return (
                    <button className="m" onClick={toggleBioEditor}>
                        add bio
                    </button>
                );
            } else {
                return (
                    <button className="m" onClick={toggleBioEditor}>
                        edit bio
                    </button>
                );
            }
        } else {
            return (
                <button className="m" onClick={submitBio}>
                    save
                </button>
            );
        }
    };

    return (
        <div className="profile">
            <h3>Your Profile</h3>
            {editorIsVisible && (
                <textarea
                    className="bio"
                    name="bio"
                    id="bio"
                    cols="30"
                    rows="10"
                    onChange={handleChange}
                    defaultValue={user?.bio}
                ></textarea>
            )}
            {!editorIsVisible && <p className="bio">{user?.bio}</p>}
            {handleButtonState()}
        </div>
    );
}
