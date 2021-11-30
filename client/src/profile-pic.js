export default function ProfilePic({
    firstname,
    lastname,
    profilePic,
    toggleModalVisibility,
    largePreview,
}) {
    return (
        <div
            className={
                largePreview
                    ? "profile-picture editable"
                    : "profile-icon editable"
            }
            onClick={toggleModalVisibility}
        >
            <img
                src={profilePic || "./bean-favicon.png"}
                alt={firstname + " " + lastname}
            ></img>
        </div>
    );
}
