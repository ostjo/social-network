const express = require("express");
const db = require("../../db.js");
const s3 = require("../../s3.js");

const router = express.Router();

//================================================ MULTER SETUP ================================================//

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

const diskStorage = multer.diskStorage({
    // put files in the uploads directory
    destination: function (req, file, callback) {
        callback(null, __dirname + "../../uploads");
    },
    // as the file name, use the unique id generated by the call to uidSafe with the extension of the original file name appended to it
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

//================================================================================================================//

router.post(
    "/upload-profile.json",
    uploader.single("file"),
    s3.upload,
    async (req, res) => {
        if (req.file) {
            const url =
                `https://s3.amazonaws.com/spicedling/` + req.file.filename;

            try {
                const profilePic = await db.addImage(req.session.userId, url);
                res.json(profilePic.rows[0]);
            } catch (err) {
                console.log("err", err);
            }
        }
    }
);

module.exports.profileRouter = router;
