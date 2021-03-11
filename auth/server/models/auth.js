'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.auth.belongsTo(models.user, {foreignKey: 'userID'})
    }
  };
  auth.init({
    userID: DataTypes.INTEGER,
    token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    scope: DataTypes.STRING,
    token_type: DataTypes.STRING,
    expiry_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'auth',
  });
  return auth;
};