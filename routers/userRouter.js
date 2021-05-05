const { Router } = require("express");
const User = require("../models/").user;
const Coin = require("../models").coin;
const Favoritecoins = require("../models").favoriteCoin;
const router = new Router();

router.get("/user/favorites/:usersId", async (req, res) => {
  try {
    const id = req.params.usersId;
    const userCoins = await Favoritecoins.findAll({
      where: { userId: id },
      include: {
        model: Coin,
        attributes: ["name", "stringCoinId", "imageUrl"],
      },
    });

    return res.status(200).send(userCoins);
  } catch (e) {
    console.log(e.message);
  }
});

module.exports = router;
