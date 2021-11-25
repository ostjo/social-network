export default function ProfilePic({ profileImg, uploadModal }) {
    return (
        <div className="profile-icon" onClick={uploadModal}>
            <img src={profileImg || "./bean-favicon.png"}></img>
        </div>
    );
}
