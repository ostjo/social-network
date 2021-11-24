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
