"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("coins", [
      {
        stringCoinId: "bitcoin",
        name: "Bitcoin",
        imageUrl:
          "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stringCoinId: "ethereum",
        name: "Ethereum",
        imageUrl:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png?",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        stringCoinId: "chainlink",
        name: "Chainlink",
        imageUrl:
          "https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png?",

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("coins", null, {});
  },
};
