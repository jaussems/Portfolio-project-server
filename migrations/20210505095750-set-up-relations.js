"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("favoriteCoins", "favoriteCoinId", {
      type: Sequelize.INTEGER,
      references: {
        model: "coins",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("favoriteCoins", "favoriteCoinId");
  },
};
