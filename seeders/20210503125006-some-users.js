"use strict";
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        firstName: "Jason",
        lastName: "Miller",
        email: "joson@gmail.com",
        isAdmin: false,
        isBlocked: false,
        password: bcrypt.hashSync("1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Mike",
        lastName: "tycoon",
        email: "boxingmike@gmail.com",
        isAdmin: false,
        isBlocked: false,
        password: bcrypt.hashSync("test1234", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "test",
        lastName: "test",
        isAdmin: false,
        isBlocked: false,
        email: "test@test.com",
        password: bcrypt.hashSync("test123", SALT_ROUNDS),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
