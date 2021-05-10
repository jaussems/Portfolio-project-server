const { Router } = require("express");
const { user, coin, comment } = require("../models");

const router = new Router();

router.get("/coins/:stringCoinId", async (req, res) => {
  try {
    const stringcoin = req.params.stringCoinId;
    const findcoin = await coin.findAll({
      where: { stringCoinId: stringcoin },
      include: [{ model: comment }],
    });
    const found = findcoin.map((list) => list.toJSON());
    const foundcomments = found.map((usercomments) => usercomments.comments);

    return res.status(201).send(foundcomments.reduce((comment) => comment));
  } catch (e) {
    console.log("ERROR MESSAGE", e.message);
    return res
      .status(404)
      .send({ message: "There are no comments for this coin" });
  }
});

router.post("/coins/:userId/:stringCoinId", async (req, res) => {
  const userID = req.params.userId;
  const stringcoin = req.params.stringCoinId;
  const { name, content } = req.body;
  const checkCoin = await coin.findOne({
    where: { stringCoinId: stringcoin },
  });

  try {
    if (checkCoin) {
      const updatedcomment = await comment.create({
        name: name,
        content: content,
        userId: userID,
        coinId: checkCoin.id,
      });
      console.log(`Updated the comments!`);
      const findcoin = await coin.findAll({
        where: { stringCoinId: stringcoin },
        include: [{ model: comment }],
      });
      const found = findcoin.map((list) => list.toJSON());
      const foundcomments = found.map((usercomments) => usercomments.comments);
      const all_comments = foundcomments.reduce((comment) => comment);
      return res
        .status(201)
        .send({ message: "Updated comments", updatedcomment, all_comments });
    }
    // return res
    //   .status(201)
    //   .send({ message: "Updated comments", updatedcomment });
  } catch (e) {
    console.log("ERROR MESSAGE", e.message);
    return res.status(404).send({ message: "Comment was not made" });
  }
});

router.delete("/coins/:userId/:stringCoinId", async (req, res) => {
  const userID = req.params.userId;
  const stringcoin = req.params.stringCoinId;
  if (!stringcoin && !userId) {
    return res.status(400).send("Please provide an coin Id and/or a userId");
  }

  try {
    const checkCoin = await coin.findOne({
      where: { stringCoinId: stringcoin },
    });
    if (checkCoin) {
      const deletedComment = await comment.destroy({
        where: { userId: userID, coinId: checkCoin.id },
      });

      const findcoin = await coin.findAll({
        where: { stringCoinId: stringcoin },
        include: [{ model: comment }],
      });
      const found = findcoin.map((list) => list.toJSON());
      const foundcomments = found.map((usercomments) => usercomments.comments);
      const all_comments = foundcomments.reduce((comment) => comment);

      return res
        .status(201)
        .send({
          message: "Succesfully deleted the comment",
          deletedComment,
          all_comments,
        });
    }
  } catch (e) {
    console.log("ERROR MESSAGE", e.message);
    return res.status(404).send({ message: "Comment was not deleted" });
  }
});

module.exports = router;
