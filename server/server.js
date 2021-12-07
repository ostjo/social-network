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

//=========================================================== MIDDLEWARE ===========================================================//
// Cookies Setup -------------------------------------------------------------------------------------------------------------------//
app.use(
    cookieSession({
        secret: sessionSecret, // used to generate the second cookie used to verify the integrity of the first cookie
        maxAge: 1000 * 60 * 60 * 24 * 14, // this makes the cookie survive two weeks of inactivity
        sameSite: true, // only allow requests from the same site
    })
);
io.use(function (socket, next) {
    cookieSession(socket.request, socket.request.res, next);
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

// =================================================================================================================================//
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

// =================================================================================================================================//

io.on("connection", function (socket) {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }

    const userId = socket.request.session.userId;
    console.log(
        `socket with the id ${socket.id} and userId ${userId} is now connected`
    );
});
