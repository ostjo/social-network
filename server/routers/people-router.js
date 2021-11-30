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

router.get(`/api/users/:id`, async (req, res) => {
    const { id } = req.params;

    if (id === req.session.userId) {
        // the user is trying to access his/her own profile
        return res.json({ ownProfile: true });
    }

    try {
        const matchingUser = await db.getUserProfileById(id);
        res.json(matchingUser.rows[0]);
    } catch (err) {
        console.log("error in GET /api/users/:id ", err);
    }
});

module.exports.peopleRouter = router;
