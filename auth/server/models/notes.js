'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  notes.init({
    language: DataTypes.ARRAY(DataTypes.STRING),
    noteFile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notes',
  });
  return notes;
};