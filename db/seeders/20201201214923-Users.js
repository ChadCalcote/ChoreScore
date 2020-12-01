'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        userName: "TimmyTheTiger",
        email: "ChampionOfChores@chorescore.com",
        hashedPassword: "password",
        points:500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userName: "BlancheDalmond",
        email: "ScoreThief@chorescore.com",
        hashedPassword: "password",
        points:2500,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Users', null, {});

  }
};
