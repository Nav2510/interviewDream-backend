const express = require("express");

const imagesController = require("../controllers/images");

const router = express.Router();

router.put("/upload-profile", imagesController.uploadProfileImage);

router.put("/upload-background", imagesController.uploadBackgroundImage);

// router.get('/', imagesController.getMessage);

module.exports = router;
