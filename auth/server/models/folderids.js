'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class folderIDs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.folderIDs, {foreignKey: "id"})
    }
  };
  folderIDs.init({
    root: DataTypes.STRING,
    javascript: DataTypes.STRING,
    python: DataTypes.STRING,
    htmlcss: DataTypes.STRING,
    sql: DataTypes.STRING,
    shell: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'folderIDs',
  });
  return folderIDs;
};