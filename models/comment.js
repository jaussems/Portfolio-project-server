"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comment.belongsTo(models.user);
      comment.belongsTo(models.coin, {
        foreignKey: "coinId",
      });
    }
  }
  comment.init(
    {
      name: DataTypes.STRING,
      content: { type: DataTypes.STRING, allowNull: false },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      modelName: "comment",
    }
  );
  return comment;
};
