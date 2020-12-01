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
    // associations can be defined here
  };
  return Chore;
};