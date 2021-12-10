const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const sessionSecret =
    process.env.SESSION_SECRET || require("../secrets.json").SESSION_SECRET;
const { authRouter } = require("./routers/auth-router.js");
const { profileRouter } = require("./routers/profile-router.js");
const { peopleRouter } = require("./routers/people-router.js");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
const db = require("../db.js");
const currOnline = [];
let ids = [];

//=========================================================== MIDDLEWARE ===========================================================//
// Cookies Setup -------------------------------------------------------------------------------------------------------------------//
const cookieSessionMiddleware = cookieSession({
    secret: sessionSecret, // used to generate the second cookie used to verify the integrity of the first cookie
    maxAge: 1000 * 60 * 60 * 24 * 14, // this makes the cookie survive two weeks of inactivity
    sameSite: true, // only allow requests from the same site
});

app.use(cookieSessionMiddleware);

io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

// Protection ----------------------------------------------------------------------------------------------------------------------//
// x-frame-options against clickjacking
app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});

// Compression ---------------------------------------------------------------------------------------------------------------------//
app.use(compression());

// JSON Setup ----------------------------------------------------------------------------------------------------------------------//
app.use(express.json());

// Serve client, public folder -----------------------------------------------------------------------------------------------------//
app.use(express.static(path.join(__dirname, "..", "client", "public")));

//============================================================= ROUTES =============================================================//
// REGISTER & LOGIN ----------------------------------------------------------------------------------------------------------------//
app.use(authRouter);

// PROFILE -------------------------------------------------------------------------------------------------------------------------//
app.use(profileRouter);

// FIND PEOPLE ---------------------------------------------------------------------------------------------------------------------//
app.use(peopleRouter);

app.post("/api/add-new-msg", async (req, res) => {
    const { msg } = req.body;
    const { userId } = req.session;

    const chatMessage = await db
        .addNewChatMessage(userId, msg)
        .then(() => db.getLatestMessage(userId))
        .catch((err) => console.log("err in addNewChatMessage on io ", err));

    console.log("new message: ", chatMessage.rows[0]);

    chatMessage.rows.forEach((msg) => {
        msg["date"] = new Date(msg.created_at).toLocaleDateString();
        msg.time = new Date(msg.created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    });

    io.emit("newChatMessage", chatMessage.rows[0]);
    res.json({ success: true });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

// =================================================================================================================================//
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

// =================================================================================================================================//

io.on("connection", async function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    console.log(
        `socket with the id ${socket.id} and userId ${userId} is now connected`
    );

    // keep track of all the currently online users
    if (currOnline.some((user) => user[0] === userId)) {
        currOnline.forEach((user) => {
            if (user[0] === userId) {
                user.push(socket.id);
            }
        });
    } else {
        currOnline.push([userId, socket.id]);
    }

    for (let i = 0; i < currOnline.length; i++) {
        ids.push(currOnline[i][0]);
    }

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    if (ids.length !== 0) {
        const onlineUsers = await db
            .getUsersByIds(ids.filter(onlyUnique))
            .catch((err) => console.log("err in getUsersByIds ", err));

        io.emit("currentlyOnline", onlineUsers.rows);
    }

    socket.on("disconnect", async () => {
        currOnline.forEach((user, i) => {
            if (user[0] === userId) {
                const index = user.indexOf(socket.id);
                user.splice(index, 1);
                if (user.length === 1) {
                    console.log("remove this entry");
                    currOnline.splice(i, 1);
                }
            }
        });

        let ids = [];
        for (let i = 0; i < currOnline.length; i++) {
            ids.push(currOnline[i][0]);
        }

        if (ids.length !== 0) {
            const onlineUsers = await db
                .getUsersByIds(ids.filter(onlyUnique))
                .catch((err) => console.log("err in getUsersByIds ", err));

            io.emit("currentlyOnline", onlineUsers.rows);
        }
    });

    const messages = await db
        .getLastTenChatMessages()
        .catch((err) =>
            console.log("err in getLastTenChatMessages on io ", err)
        );

    messages.rows.forEach((msg) => {
        msg["date"] = new Date(msg.time).toLocaleDateString();
        msg.time = new Date(msg.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    });

    socket.emit("chatMessages", messages.rows);
});
