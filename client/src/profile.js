import ProfilePic from "./profile-pic.js";
import BioEditor from "./bio-editor.js";

export default function Profile({
    firstname,
    lastname,
    profilePic,
    bio,
    toggleModalVisibility,
    updateBio,
}) {
    return (
        <div id="profile-page">
            <ProfilePic
                profilePic={profilePic}
                firstname={firstname}
                lastname={lastname}
                largePreview={true}
                toggleModalVisibility={toggleModalVisibility}
            />
            <BioEditor bio={bio} updateBio={updateBio} />
        </div>
    );
}
