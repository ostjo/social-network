import { useSelector } from "react-redux";
import { useRef } from "react";
import { Link } from "react-router-dom";

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
            {onlineUsers && (
                <div className="online-cont">
                    <p>Currently online</p>
                    <div className="online-icons">
                        {onlineUsers?.map((user) => (
                            <div key={user.id}>
                                <Link to={`/users/${user.id}`}>
                                    <div className="online-icon">
                                        <img
                                            src={
                                                user?.profilePic ||
                                                "./bean-favicon.png"
                                            }
                                            alt={
                                                user?.firstname +
                                                " " +
                                                user?.lastname
                                            }
                                        />
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
