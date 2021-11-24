const express = require("express");
const { hash, compare } = require("../../bc.js");
const db = require("../../db.js");

const router = express.Router();

router.get("/user/id.json", (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});

router.post("/registration.json", (req, res) => {
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

router.post("/login.json", (req, res) => {
    const email = req.body.email;
    const inputPassword = req.body.password;
    db.getUserByEmail(email)
        .then((user) => {
            if (user.rows.length === 0) {
                return res.json({ error: true });
            }
            const { password, id } = user.rows[0];

            compare(inputPassword, password)
                .then((match) => {
                    if (match) {
                        // if it's a match, set a cookie to the user's id (req.session.userId = userIdFromDb)
                        req.session.userId = id;
                        return res.json({ success: true });
                    } else {
                        return res.json({ error: true });
                    }
                })
                .catch((err) => {
                    console.log("err in compare: ", err);
                    return res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("err in compare: ", err);
            return res.json({ error: true });
        });
});

module.exports.authRouter = router;
