const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const { hash } = require("../bc.js");
const cookieSession = require("cookie-session");
const sessionSecret =
    process.env.SESSION_SECRET || require("../secrets.json").SESSION_SECRET;
const db = require("../db.js");

//---------------------------------------------------------- Cookies Setup ---------------------------------------------------------//
app.use(
    cookieSession({
        secret: sessionSecret, // used to generate the second cookie used to verify the integrity of the first cookie
        maxAge: 1000 * 60 * 60 * 24 * 14, // this makes the cookie survive two weeks of inactivity
        sameSite: true, // only allow requests from the same site
    })
);

app.use(compression());

app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/user/id.json", (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/registration.json", (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    hash(password)
        .then((hashedPw) => db.addUser(firstname, lastname, email, hashedPw))
        .then((user) => {
            req.session.userId = user.rows[0].id;
            res.json({ success: true });
        })
        .catch((err) => {
            console.log(
                "err in hash pw or addUser on POST /registration.json",
                err
            );
            res.json({ error: true });
        });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
