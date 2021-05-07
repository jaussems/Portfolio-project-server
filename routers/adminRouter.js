const { Router } = require("express");
const User = require("../models/").user;

const router = new Router();

router.get("/admin/user", async (req, res) => {
  try {
    const allusers = await User.findAll({
      attributes: ["email", "firstName"],
    });
    res.status(201).send(allusers);
  } catch (e) {
    console.log("ERROR MESSAGE", e.message);
    res
      .status(404)
      .send({ message: "You are not authorized to see the users!" });
  }
});

module.exports = router;
