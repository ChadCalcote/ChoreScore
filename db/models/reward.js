'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reward = sequelize.define('Reward', {
    rewardName: DataTypes.STRING,
    rewardDescription: DataTypes.TEXT,
    rewardValue: DataTypes.INTEGER,
    isCollected: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Reward.associate = function(models) {
    // associations can be defined here
  };
  return Reward;
};