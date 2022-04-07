'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsToMany(models.category, {
        as: 'category',
        through: {
          model: "categoryProduct",
          as: 'bridge'
        },
        foreignKey:'idProduct'
      })

      product.belongsTo(models.User, {
        as: 'User',
        foreignKey: {
          name: 'idUser',
        },
      })
    }
  }
  product.init({
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    price: DataTypes.BIGINT,
    image: DataTypes.STRING,
    qty: DataTypes.INTEGER,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};