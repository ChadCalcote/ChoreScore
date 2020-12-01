'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChoreType = sequelize.define('ChoreType', {
    choreType: DataTypes.STRING
  }, {});
  ChoreType.associate = function(models) {
    // associations can be defined here
  };
  return ChoreType;
};