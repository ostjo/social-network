const express = require("express");
const db = require("../../db.js");

const router = express.Router();

router.get("/latest-users.json", async (req, res) => {
    const curUser = req.session.userId;

    try {
        const latestUsers = await db.getLatestUsers(curUser);
        res.json(latestUsers.rows);
    } catch (err) {
        console.log("error in GET /latest-users ", err);
        res.json({ success: false });
    }
});

router.post("/users.json", async (req, res) => {
    const { search } = req.body;
    const curUser = req.session.userId;

    try {
        const matchingUsers = await db.getMatchingUsers(search, curUser);
        res.json(matchingUsers.rows);
    } catch (err) {
        console.log("error in POST /users ", err);
        res.json({ success: false });
    }
});

module.exports.peopleRouter = router;
