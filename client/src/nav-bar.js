import ProfilePic from "./profile-pic";
import { Link } from "react-router-dom";

export default function NavBar({
    firstname,
    lastname,
    profilePic,
    toggleModalVisibility,
}) {
    return (
        <header className="navbar">
            <img className="nav-logo" src="/crew-p-logo_xl.png"></img>
            <div className="nav-menu">
                <Link to="/users">
                    <h5>⌕ Find friends</h5>
                </Link>
                <Link to="/friends">
                    <h5>Friends</h5>
                </Link>
                <Link to="/chat">
                    <h5>Crew chat</h5>
                </Link>
                <div className="nav-user">
                    <Link to="/">
                        <h5>{firstname}</h5>
                    </Link>
                    <ProfilePic
                        firstname={firstname}
                        lastname={lastname}
                        profilePic={profilePic}
                        toggleModalVisibility={toggleModalVisibility}
                        largePreview={false}
                    />
                </div>
            </div>
        </header>
    );
}
