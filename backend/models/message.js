"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
      //   models.Message.hasMany(models.comment);
      //  models.Message.hasMany(models.Like);
      //  models.Message.hasMany(models.Dislike);
    }
  }
  Message.init(
    {
      userId: DataTypes.INTEGER,
      //title: DataTypes.STRING,
      message: DataTypes.STRING,
      image: DataTypes.STRING,
      //likes: DataTypes.INTEGER,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
