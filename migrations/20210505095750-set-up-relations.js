"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("favoriteCoins", "coinId", {
      type: Sequelize.INTEGER,
      references: {
        model: "coins",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("comments", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("comments", "coinId", {
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
    await queryInterface.removeColumn("favoriteCoins", "coinId");
    await queryInterface.removeColumn("comments", "userId");
    await queryInterface.removeColumn("comments", "coinId");
  },
};
