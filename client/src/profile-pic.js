import { useDispatch, useSelector } from "react-redux";
import { toggleModalVisibility } from "./redux/img-modal/slice.js";

export default function ProfilePic({ largePreview }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.curUser);

    const toggleVisibility = () => {
        dispatch(toggleModalVisibility());
    };

    return (
        <div
            className={
                largePreview
                    ? "profile-picture editable"
                    : "profile-icon editable"
            }
            onClick={toggleVisibility}
        >
            <img
                src={user?.profilePic || "./bean-favicon.png"}
                alt={user?.firstname + " " + user?.lastname}
            ></img>
        </div>
    );
}
