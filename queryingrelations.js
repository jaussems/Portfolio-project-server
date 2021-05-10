const { user, favoriteCoin, coin, comment } = require("./models");

// async function listWithUserCoins() {
//   const userwithcoinslist = await user.findAll({
//     include: {
//       model: coin,
//       attributes: ["name", "stringCoinId", "imageUrl"],
//     },
//   });

//   return userwithcoinslist.map((list) => list.get({ plain: true }));
// }

// listWithUserCoins().then((lists) =>
//   console.log({ user: lists[1], coins: lists[1].coins })
// );

// async function ListUsers() {
//   const response = await user.findAll({
//     attributes: ["email", "firstName"],
//   });

//   return response.map((list) => list.get({ plain: true }));
// }

// ListUsers().then((found) => console.log({ found }));

async function GetCoinComments() {
  // const checkUserfav = await favoriteCoin.findOne({
  //   where: { coinId: 1 },
  // });
  // return checkUserfav;

  //   const allcomments = await coin.findAll({
  //     where: { stringCoinId: "ethereum" },
  //   });

  //   if (allcomments) {
  //     return "You have been blessed";
  //   } else return;

  //   const findcoin = await coin.findAll({
  //     where: { stringCoinId: "chainlink" },
  //   });
  //   if (findcoin) {
  //     const findAllcomments = await comment.findAll({
  //       where: {
  //         coinId: findcoin[0].dataValues.id,
  //       },
  //     });
  //     return findAllcomments.map((listofcomments) =>
  //       listofcomments.get({ plain: true })
  //     );
  //   }
  //   const findcoin = await coin.findAll({
  //     where: { stringCoinId: "chainlink" },
  //     include: [{ model: comment }],
  //   });
  //   return findcoin.map((list) => list.toJSON());

  const findcoin = await coin.findAll({
    where: { stringCoinId: "chainlink" },
    include: [{ model: comment }],
  });
  return findcoin.map((list) => list.toJSON());

  //return findcoin[0].dataValues.id;
}

//   const checkCoin = await favoriteCoin.findOne({
//         include: {
//           model: "coin",
//           attributes: ["name", "stringCoinId", "imageUrl"],
//         },
//       }

//   return checkCoin.id;

GetCoinComments().then((found) => console.log({ found }));
