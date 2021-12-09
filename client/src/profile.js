import ProfilePic from "./profile-pic.js";
import BioEditor from "./bio-editor.js";

export default function Profile() {
    return (
        <div id="profile-page">
            <ProfilePic largePreview={true} />
            <BioEditor />
        </div>
    );
}
