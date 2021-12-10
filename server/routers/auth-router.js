const express = require("express");
const { hash, compare } = require("../../bc.js");
const db = require("../../db.js");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("../ses.js");

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

router.post("/password/reset/request.json", (req, res) => {
    const { email } = req.body;
    db.getUserByEmail(email)
        .then((user) => {
            if (user.rows.length === 0) {
                return res.json({ success: true });
            }

            // if a user is found in the db, generate a random reset code
            const randomString = cryptoRandomString({
                length: 6,
            });

            db.insertResetCode(email, randomString)
                .then((code) => {
                    const email = "false.acapella+test@spicedling.email";
                    const subject = "Here is the code to reset your password";
                    const message = `There you go: ${code.rows[0].code}`;
                    return sendEmail(email, subject, message);
                })
                .then(() => {
                    console.log("Success!");
                    res.json({ success: true });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: true });
        });
});

router.post("/password/reset/verify.json", (req, res) => {
    const newPassword = req.body.newPassword;
    const code = req.body.code;
    const email = req.body.email;
    db.verifyCode(code, email)
        .then((match) => {
            // no matching codes in the db
            if (match.rows.length === 0) {
                return res.json({ error: true });
            }
            console.log("yaay, matches!");
            // code matches, so hash the new pw and update user
            hash(newPassword)
                .then((hashedPw) => db.updateUserPw(hashedPw, email))
                .then(() => {
                    console.log("success!");
                    res.json({ success: true });
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
});

router.get("/user.json", async (req, res) => {
    const id = req.session.userId;
    try {
        const user = await db.getUserById(id);
        return res.json(user.rows[0]);
    } catch (err) {
        console.log("err", err);
    }
});

router.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/");
});

module.exports.authRouter = router;
