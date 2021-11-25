const spicedPg = require("spiced-pg");
const dbUsername = "postgres";
const dbUserPassword = "postgres";
const database = "socialnetwork";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${dbUsername}:${dbUserPassword}@localhost:5432/${database}`
);

module.exports.addUser = (firstname, lastname, email, hashedPW) => {
    const query = `INSERT INTO users (first_name, last_name, email, password)
                    VALUES($1, $2, $3, $4)
                    RETURNING id`;
    const params = [firstname, lastname, email, hashedPW];
    return db.query(query, params);
};

module.exports.getUserByEmail = (email) => {
    const query = `SELECT id, first_name, last_name, email, password
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
