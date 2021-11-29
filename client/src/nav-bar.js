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
            <img className="logo" src="./bean-favicon.png"></img>
            <Link to="/users">
                <h3>⌕ Find friends</h3>
            </Link>
            <div className="nav-user">
                <Link to="/">
                    <h3>
                        {firstname} {lastname}
                    </h3>
                </Link>
                <ProfilePic
                    profilePic={profilePic}
                    toggleModalVisibility={toggleModalVisibility}
                    largePreview={false}
                />
            </div>
        </header>
    );
}
