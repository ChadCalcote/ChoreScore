'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    points: DataTypes.INTEGER
  }, {});
  User.associate = function(models) {
    User.hasMany(models.List, {foreignKey:"userId"})
    User.hasMany(models.Reward, {foreignKey:"userId"})
    User.hasMany(models.Chore, {foreignKey:"userId"})
  };
  return User;
};
