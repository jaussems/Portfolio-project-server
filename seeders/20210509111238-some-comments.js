"use strict";

const { query } = require("express");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("comments", [
      {
        name: "Anon",
        content: "Nice coin, I expect lots from the future!",
        userId: 1,
        coinId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Joost",
        content: "Made some good money of this coin!",
        userId: 1,
        coinId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Erik",
        content: "Not sure about this one, but it will get there!",
        userId: 2,
        coinId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Anon",
        content: "Awesome coin, can definitly recommend!",
        userId: 3,
        coinId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("comments", null, {});
  },
};
