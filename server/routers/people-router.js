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

    if (id == req.session.userId) {
        // the user is trying to access his/her own profile
        return res.json({ ownProfile: true });
    }

    try {
        const matchingUser = await db.getUserProfileById(id);
        if (matchingUser.rows.length === 0) {
            // no matching user found
            return res.json({ error: true });
        }
        res.json(matchingUser.rows[0]);
    } catch (err) {
        console.log("error in GET /api/users/:id ", err);
    }
});

router.get("/api/rel-status/:viewed", async (req, res) => {
    const { viewed } = req.params;
    const loggedIn = req.session.userId;

    const relStatus = await db
        .getRelationshipStatus(loggedIn, viewed)
        .catch((err) => console.log("error in GET /api/rel-status ", err));

    if (relStatus.rows.length === 0) {
        // there's no friendship between the two users
        res.json({ status: "make friend request" });
    } else if (relStatus.rows[0].accepted === false) {
        // the friendship status is still pending (one side sent a friend request)
        if (relStatus.rows[0].senderId == req.session.userId) {
            // the logged in user did send the open friend request
            res.json({ status: "cancel friend request" });
        } else {
            res.json({ status: "accept friend request" });
        }
    } else if (relStatus.rows[0].accepted === true) {
        // they are already friends
        res.json({ status: "unfriend" });
    }
});

router.post("/api/update-relationship", async (req, res) => {
    const { relState, viewed } = req.body;
    const loggedIn = req.session.userId;

    if (relState === "make friend request") {
        // add a friend request to the db
        const updatedRelStatus = await db
            .addFriendRequest(loggedIn, viewed)
            .catch((err) =>
                console.log(
                    "err in POST /api/update-rel on adding friend request ",
                    err
                )
            );

        if (updatedRelStatus.rows.length !== 0) {
            res.json({ status: "cancel friend request" });
        }
    } else if (relState === "cancel friend request") {
        // remove the request (only the sender can do this)
        await db.deleteFriendRequest(loggedIn, viewed).catch(
            (err) =>
                console.log(
                    "err in POST /api/update-rel on removing request ",
                    err
                )
            // TO DO HANDLE ERROR (json!!!)
        );

        res.json({ status: "make friend request" });
    } else if (relState === "accept friend request") {
        // add the friendship
        const updatedRelStatus = await db
            .acceptFriendship(loggedIn, viewed)
            .catch((err) =>
                console.log(
                    "err in POST api/update-rel on accepting friendship",
                    err
                )
            );
        if (updatedRelStatus.rows.length !== 0) {
            res.json({ status: "unfriend" });
        }
    } else if (relState === "unfriend") {
        // remove the friendship (both sides can do this)
        await db
            .deleteFriendship(loggedIn, viewed)
            .catch((err) =>
                console.log(
                    "err in POST api/update-rel on deleting friendship ",
                    err
                )
            );

        res.json({ status: "make friend request" });
    }
});

router.get("/api/friends-and-wannabes", async (req, res) => {
    const loggedIn = req.session.userId;

    const friendsAndWannabes = await db
        .getFriendsAndWannabes(loggedIn)
        .catch((err) =>
            console.log("err in GET on /friends-and-wannabes: ", err)
        );

    res.json(friendsAndWannabes.rows);
});

router.post("/api/friends/accept/:id", async (req, res) => {
    const loggedIn = req.session.userId;
    const viewed = req.params.id;
    const newFriend = await db
        .acceptFriendship(viewed, loggedIn)
        .catch((err) => console.log("err in POST on /friends/accept: ", err));
    res.json({ success: newFriend.length !== 0 });
});

router.post("/api/friends/unfriend/:id", async (req, res) => {
    const loggedIn = req.session.userId;
    const viewed = req.params.id;
    await db
        .deleteFriendship(viewed, loggedIn)
        .catch((err) => console.log("err in POST on /friends/unfriend: ", err));
    res.json({ success: true });
});

module.exports.peopleRouter = router;
