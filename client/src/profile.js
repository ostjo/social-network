import ProfilePic from "./profile-pic.js";
import BioEditor from "./bio-editor.js";

export default function Profile({ firstname, lastname, profilePic, bio }) {
    return (
        <div>
            <h1>User Profile Page</h1>
            <h3>
                {firstname} {lastname}
            </h3>
            <ProfilePic
                profilePic={profilePic}
                firstname={firstname}
                lastname={lastname}
            />
            <BioEditor bio={bio} />
        </div>
    );
}
