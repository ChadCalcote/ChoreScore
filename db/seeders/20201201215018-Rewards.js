'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Rewards', [
        {
        rewardName: "Watch a movie",
        rewardDescription: "Pirates of the Carribean! Wheeeeeeee!",
        rewardValue: 200,
        isCollected: false,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
        {
        rewardName: "Buy a comic book",
        rewardDescription: "New Miles Morales series looks awesome",
        rewardValue: 150,
        isCollected: true,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rewards', null, {});
  }
};
