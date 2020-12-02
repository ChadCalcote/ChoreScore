'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Lists', [
        {
          listName: "Before Parents Come to Visit",
          userId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          listName: "Pre-Heist Planning",
          userId: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Lists', null, {});
  }
};
