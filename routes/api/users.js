const express = require("express");
const { validation, ctrlWrapper, auth, upload } = require("../../middlewares");
const { joiSchemaUser, joiSchemaSubscription } = require("../../models");
const { usersApi: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", validation(joiSchemaUser), ctrlWrapper(ctrl.register));
router.post("/login", validation(joiSchemaUser), ctrlWrapper(ctrl.login));

router.patch(
  "/",
  auth,
  validation(joiSchemaSubscription),
  ctrlWrapper(ctrl.patchUser)
);

router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail));
router.post("/verify", ctrlWrapper(ctrl.verifyEmailAgain));

module.exports = router;
