const { Router } = require("express");
const User = require("../models/").user;
const Coin = require("../models").coin;
const Comment = require("../models").comment;
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
    return res.status(400).send({ message: "User Coin's  are not found." });
  }
});

router.post("/user/favorites/:usersId/coin/", async (req, res) => {
  const { name, stringCoinId, imageUrl } = req.query;
  if (!name || !stringCoinId || !imageUrl) {
    return res
      .status(400)
      .send(
        "Please provide an coin name, stringCoinId and a imageUrl, or a valid user Id"
      );
  }
  const id = req.params.usersId;

  //Checking to see if the Coin already exists in the Database.
  const checkCoin = await Coin.findOne({
    where: { stringCoinId: stringCoinId },
  });
  //console.log(`checking ID`, checkCoin.id);
  //const foundcoinId = checkCoin.id;
  // const checkUserfav = await Favoritecoins.findOne({
  //   where: { coinId: checkCoin.dataValues.id },
  // });

  //const CheckuserFav = await Coin.findOne({ where: { id: coinId } });
  // const createdFav = await Coin.findOne({
  //   where: { id: checkCoin.dataValues.id },
  // });

  // const coincheckbooelan = checkCoin ? await Coin.findByPk(checkCoin.id) : null;
  // const coincheckbooelan = checkCoin
  //   ? await Coin.findOne({ where: { id: checkCoin.id } })
  //   : null;

  if (checkCoin) {
    const updatedCurrentCoin = await Favoritecoins.create({
      userId: id,
      coinId: checkCoin.id,
    });
    console.log(`Added existing Coin to user's favorites`);
    return res.status(201).send({
      message: "Added existing Coin to user's favorites",
      updatedCurrentCoin,
    });
  }

  try {
    const coinCreated = await Coin.create({
      name,
      stringCoinId,
      imageUrl,
    });

    const updatedFavoriteCoin = await Favoritecoins.create({
      userId: id,
      coinId: coinCreated.id,
    });

    res.status(201).send({
      message: "Created a Coin succesfully and added to user as favorite coin",
      coinCreated,
      updatedFavoriteCoin,
    });
  } catch (e) {
    console.log(e.message);
    res.status(400).send({ message: "User Coin's  are not updated." });
  }
});

router.delete(`/user/favorites/:usersId/coin/`, async (req, res) => {
  const id = req.params.usersId;

  const { stringCoinId } = req.query;
  if (!stringCoinId) {
    return res.status(400).send("Please provide an coin Id");
  }

  const checkCoin = await Coin.findOne({
    where: { stringCoinId: stringCoinId },
  });

  try {
    const deleteUserFavorite = Favoritecoins.destroy({
      where: { userId: id, coinId: coinid },
    });
    return res.status(201).send({
      message: "Succesfully deleted the following user favorite",
      deleteUserFavorite,
      deleted: {
        userid: id,
        coinid: checkCoin.id,
      },
    });
  } catch (e) {
    console.log("ERROR MESSAGE:", e.message);
    return res
      .status(400)
      .send({ message: "Failed to delete coin from user's favorites!" });
  }
});

module.exports = router;
