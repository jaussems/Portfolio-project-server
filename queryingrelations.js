const { user, favoriteCoin, coin } = require("./models");

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

async function ListUsers() {
  const response = await user.findAll({
    attributes: ["email", "firstName"],
  });

  return response.map((list) => list.get({ plain: true }));
}

ListUsers().then((found) => console.log({ found }));
