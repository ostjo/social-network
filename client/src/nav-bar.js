import ProfilePic from "./profile-pic";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
    const user = useSelector((state) => state.curUser);
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
                        <h5>{user?.firstname}</h5>
                    </Link>
                    <ProfilePic largePreview={false} />
                </div>
                <a href="/logout">
                    <img
                        className="logout"
                        src="/logout.png"
                        alt=""
                        title="/logout"
                    />
                </a>
            </div>
        </header>
    );
}
