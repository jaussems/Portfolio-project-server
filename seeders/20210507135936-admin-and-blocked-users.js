"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        firstName: "block",
        lastName: "blocked",
        email: "block@block.com",
        password: bcrypt.hashSync("block123", SALT_ROUNDS),
        isAdmin: false,
        isBlocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "admin",
        lastName: "admin",
        email: "ad@min.com",
        isAdmin: true,
        isBlocked: false,
        password: bcrypt.hashSync("admin", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
