'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expanditure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expanditure.init({
    transactionId: DataTypes.INTEGER,
    expanditure_type: DataTypes.STRING,
    amoung: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    created_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Expanditure',
    tableName: 'Expanditures'
  });
  return Expanditure;
};