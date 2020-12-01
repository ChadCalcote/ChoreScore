'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ChoreTypes', [
        {
          choreType: "Household",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          choreType: "Work",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          choreType: "Errands",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          choreType: "Other",
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('ChoreTypes', null, {});
  }
};
