"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class coin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //coin.hasMany(models.favoriteCoin);
      coin.belongsToMany(models.user, {
        through: "favoriteCoins",
        foreignKey: "favoriteCoinId",
      });
    }
  }
  coin.init(
    {
      stringCoinId: { type: DataTypes.STRING, allowNull: false, unique: true },
      name: { type: DataTypes.STRING, allowNull: false },
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "coin",
    }
  );
  return coin;
};
