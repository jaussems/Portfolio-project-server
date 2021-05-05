"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class favoriteCoin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      favoriteCoin.belongsTo(models.user);
      favoriteCoin.belongsTo(models.coin, {
        foreignKey: "favoriteCoinId",
      });
    }
  }
  favoriteCoin.init(
    {
      userId: { type: DataTypes.INTEGER },
      favoriteCoinId: { type: DataTypes.INTEGER },
    },
    {
      sequelize,
      modelName: "favoriteCoin",
    }
  );
  return favoriteCoin;
};
