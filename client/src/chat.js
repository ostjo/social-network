import { useSelector } from "react-redux";
import { useRef } from "react";

export default function Chat() {
    const chatMessages = useSelector((state) => state?.chatMessages);
    const textareaRef = useRef();

    const checkForEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
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
    };

    return (
        <>
            <h2>Chat</h2>
            <div className="chat-container">
                <div className="messages">
                    {chatMessages?.map((message) => (
                        <div key={message.id} className="message-text">
                            <p className="username">
                                {message.firstname} {message.lastname}:
                            </p>
                            <p>{message.message}</p>
                        </div>
                    ))}
                </div>
                <textarea
                    ref={textareaRef}
                    placeholder="enter your message here"
                    onKeyDown={checkForEnter}
                ></textarea>
            </div>
        </>
    );
}
