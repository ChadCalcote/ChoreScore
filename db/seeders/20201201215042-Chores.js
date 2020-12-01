'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Chores', [
        {
          choreName: "Sweep The Floor",
          value: 100,
          note: "Hardwood surfaces on the first floor",
          dueDate: null,
          isCompleted: false,
          listId: 1,
          choreTypeId: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          choreName: "Buy a Power Drill",
          value: 100,
          note: "For completely legal reasons",
          dueDate: null,
          isCompleted: false,
          listId: 2,
          choreTypeId: 4,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          choreName: "Get Snacks",
          value: 100,
          note: "Dad is lactose intolerant :(",
          dueDate: null,
          isCompleted: false,
          listId: 1,
          choreTypeId: 3,
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
