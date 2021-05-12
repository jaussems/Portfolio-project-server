const User = require("../models").user;
const { toData } = require("../auth/jwt");

async function admin(req, res, next) {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (!auth || !(auth[0] === "Bearer") || !auth[1]) {
    return res.status(401).send({
      message:
        "This endpoint requires an Authorization header with a valid token",
    });
  }

  try {
    //console.log(auth);
    const data = toData(auth[1]);
    const user = await User.findByPk(data.userId, {
      attributes: ["isAdmin"],
    });

    if (!user.dataValues.isAdmin) {
      return res.status(401).send({ message: "you are an admin " });
    }

    //return true;
    next();
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = admin;
