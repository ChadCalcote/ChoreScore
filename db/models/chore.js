'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chore = sequelize.define('Chore', {
    choreName: DataTypes.STRING,
    value: DataTypes.INTEGER,
    note: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    isCompleted: DataTypes.BOOLEAN,
    listId: DataTypes.INTEGER,
    choreTypeId: DataTypes.INTEGER
  }, {});
  Chore.associate = function(models) {
    Chore.belongsTo(models.ChoreType, {foreignKey:"choreTypeId"}),
    Chore.belongsTo(models.List, {foreignKey:"listId"})
  };
  return Chore;
};