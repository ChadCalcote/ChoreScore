'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    listName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.User, {foreignKey:"userId"}),
    List.hasMany(models.Chore, {foreignKey:"listId"})
  };
  return List;
};
