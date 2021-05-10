const { Router } = require("express");
const User = require("../models/").user;

const router = new Router();

router.get("/admin/user", async (req, res) => {
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

router.put("/admin/user/:userId", async (req, res) => {
  const userID = req.params.userId;
  //const blocked = req.body.blocked;

  try {
    // const updatedUser = await User.update(
    //   { isBlocked: Boolean(req.body.IsBlocked) },
    //   { where: { id: req.params.userId } }
    // );
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
