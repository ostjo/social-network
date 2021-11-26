export default function ProfilePic({
    firstname,
    lastname,
    profilePic,
    toggleModalVisibility,
}) {
    return (
        <div className="profile-icon" onClick={toggleModalVisibility}>
            <img
                src={profilePic || "./bean-favicon.png"}
                alt={`${firstname} ${lastname}`}
            ></img>
        </div>
    );
}
