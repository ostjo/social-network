import { useSelector } from "react-redux";
import { useRef } from "react";

export default function Chat({ loggedIn }) {
    const chatMessages = useSelector((state) => state?.chatMessages);
    const onlineUsers = useSelector((state) => state?.onlineUsers);
    const textareaRef = useRef();

    const checkForEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (textareaRef.current.value !== "") {
                fetch("/api/add-new-msg", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ msg: e.target.value }),
                })
                    .then((resp) => resp.json())
                    .then((resp) => console.log(resp));
                // empty the value of the textarea reference
                textareaRef.current.value = "";
            }
        }
    };

    return (
        <>
            <div className="chat-container">
                <div className="messages">
                    {chatMessages?.map((message) => (
                        <div
                            key={message.id}
                            className={
                                (message.userId === loggedIn &&
                                    "message-text own-message") ||
                                "message-text"
                            }
                        >
                            {message.userId === loggedIn && (
                                <>
                                    <p>{message.message}</p>
                                    <p className="message-time">
                                        {message.time}
                                    </p>
                                </>
                            )}
                            {message.userId !== loggedIn && (
                                <>
                                    <p className="username">
                                        {message.firstname} {message.lastname}
                                    </p>
                                    <p>{message.message}</p>
                                    <p className="message-time">
                                        {message.time}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <textarea
                    ref={textareaRef}
                    placeholder="enter your message here"
                    onKeyDown={checkForEnter}
                ></textarea>
            </div>
            <div className="online-cont">
                {console.log("onlineusers", onlineUsers)}
                {onlineUsers?.map((user) => (
                    <div key={user.id}>
                        <div className="profile-icon">
                            <img
                                src={user?.profilePic || "./bean-favicon.png"}
                                alt={user?.firstname + " " + user?.lastname}
                            />
                        </div>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
