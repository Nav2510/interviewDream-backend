const express = require("express");

const imagesController = require("../controllers/images");

const router = express.Router();

router.put("/upload-profile", imagesController.uploadProfileImage);

// router.get('/', imagesController.getMessage);

module.exports = router;
