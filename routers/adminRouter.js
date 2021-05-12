const { Router } = require("express");
const User = require("../models/").user;
const isAdminCheck = require("../middlewares/adminCheck");
const router = new Router();

router.get("/user", isAdminCheck, async (req, res) => {
  console.log(req.headers);
  try {
    const allusers = await User.findAll({
      attributes: ["id", "email", "firstName", "isBlocked"],
    });
    res.status(201).send(allusers);
  } catch (e) {
    console.log("ERROR MESSAGE", e.message);
    res
      .status(404)
      .send({ message: "You are not authorized to see the users!" });
  }
});

router.put("/user/:userId", isAdminCheck, async (req, res) => {
  const userID = req.params.userId;
  console.log(req.headers);

  try {
    const user = await User.findByPk(userID);

    const userBlocked = await user.update({ isBlocked: !user.isBlocked });

    const allusers = await User.findAll({
      attributes: ["id", "email", "firstName", "isBlocked"],
    });

    console.log("UPDATED USER", userBlocked);
    res.status(201).send(allusers);
  } catch (e) {
    console.log("ERROR MESSAGE", e.message);
    res
      .status(404)
      .send({ message: "Failed to update the user.isBlocked status!" });
  }
});

module.exports = router;
