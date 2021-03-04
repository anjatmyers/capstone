'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.assess.belongsTo(models.user, {foreignKey: "id"})
      models.notes.belongsTo(models.user, {foreignKey: "id"})
    }
  };
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    gitHub: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};