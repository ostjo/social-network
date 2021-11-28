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
        <div>
            <h1>Your Profile</h1>
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
