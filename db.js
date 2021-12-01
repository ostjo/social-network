const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbUserPassword = "postgres";
const database = "socialnetwork";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`
);

module.exports.addUser = (firstname, lastname, email, hashedPW) => {
    const query = `INSERT INTO users (firstname, lastname, email, password)
                    VALUES($1, $2, $3, $4)
                    RETURNING id`;
    const params = [firstname, lastname, email, hashedPW];
    return db.query(query, params);
};

module.exports.getUserByEmail = (email) => {
    const query = `SELECT id, firstname, lastname, email, password
                    FROM users
                    WHERE email = $1`;
    return db.query(query, [email]);
};

module.exports.insertResetCode = (email, resetCode) => {
    const query = `INSERT INTO reset_codes (email, reset_code)
                    VALUES($1, $2)
                    RETURNING reset_code AS code`;
    return db.query(query, [email, resetCode]);
};

module.exports.verifyCode = (code, email) => {
    const query = `SELECT email, reset_code, created_at
                    FROM reset_codes
                    WHERE email = $2
                    AND CURRENT_TIMESTAMP - created_at < INTERVAL '120 minutes'
                    AND reset_code = (SELECT reset_code FROM reset_codes
				  	                    WHERE email = $2
	   				                    ORDER BY created_at DESC
					                    LIMIT 1)
                    AND reset_code = $1`;
    return db.query(query, [code, email]);
};

module.exports.updateUserPw = (newPw, email) => {
    const query = `UPDATE users
                    SET password = $1
                    WHERE email = $2`;
    return db.query(query, [newPw, email]);
};

module.exports.getUserById = (id) => {
    const query = `SELECT id, firstname, lastname, profile_pic AS "profilePic", bio 
                    FROM users
                    WHERE id = $1`;
    return db.query(query, [id]);
};

module.exports.addImage = (id, url) => {
    const query = `UPDATE users
                    SET profile_pic = $2
                    WHERE id = $1
                    RETURNING profile_pic AS "profilePic"`;
    return db.query(query, [id, url]);
};

module.exports.addBioById = (id, bio) => {
    const query = `UPDATE users
                    SET bio = $2
                    WHERE id = $1
                    RETURNING bio`;
    return db.query(query, [id, bio]);
};

module.exports.getLatestUsers = (curUser) => {
    const query = `SELECT firstname, lastname, id, profile_pic AS "profilePic" FROM users
                    WHERE id != $1
                    ORDER BY id DESC
                    LIMIT 3`;
    return db.query(query, [curUser]);
};

module.exports.getMatchingUsers = (search, curUser) => {
    const query = `SELECT id, firstname, lastname, profile_pic AS "profilePic" FROM users
                    WHERE concat(firstname,' ',lastname) ILIKE $1 
                    AND id != $2`;
    return db.query(query, [search + "%", curUser]);
};

module.exports.getUserProfileById = (id) => {
    const query = `SELECT id, firstname, lastname, profile_pic AS "profilePic", bio
                    FROM users
                    WHERE id = $1`;
    return db.query(query, [id]);
};

module.exports.getRelationshipStatus = (loggedIn, viewed) => {
    const query = `SELECT recipient_id AS "recipientId", sender_id AS "senderId", accepted FROM friendships
                    WHERE (recipient_id = $1 AND sender_id = $2)
                    OR (recipient_id = $2 AND sender_id = $1)`;
    return db.query(query, [loggedIn, viewed]);
};

module.exports.addFriendRequest = (sender, recipient) => {
    const query = `INSERT INTO friendships (sender_id, recipient_id)
                    VALUES($1, $2)
                    RETURNING id, sender_id AS "senderId", recipient_id AS "recipientId", accepted`;
    return db.query(query, [sender, recipient]);
};

module.exports.deleteFriendRequest = (sender, recipient) => {
    const query = `DELETE FROM friendships
                    WHERE sender_id = $1 AND recipient_id = $2`;
    return db.query(query, [sender, recipient]);
};

module.exports.acceptFriendship = (sender, recipient) => {
    const query = `UPDATE friendships
                    SET accepted = true
                    WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)
                    RETURNING id, sender_id AS "senderId", recipient_id AS "recipientId", accepted`;
    return db.query(query, [sender, recipient]);
};

module.exports.deleteFriendship = (sender, recipient) => {
    const query = `DELETE FROM friendships
                    WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1)`;
    return db.query(query, [sender, recipient]);
};
