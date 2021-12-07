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
            <img className="logo" src="/cbc-logo-01.png"></img>
            <Link to="/users">
                <h3>⌕ Find friends</h3>
            </Link>
            <Link to="/friends">
                <h3>Friends</h3>
            </Link>
            <Link to="/chat">
                <h3>Crew chat</h3>
            </Link>
            <div className="nav-user">
                <Link to="/">
                    <h3>{firstname}</h3>
                </Link>
                <ProfilePic
                    firstname={firstname}
                    lastname={lastname}
                    profilePic={profilePic}
                    toggleModalVisibility={toggleModalVisibility}
                    largePreview={false}
                />
            </div>
        </header>
    );
}
