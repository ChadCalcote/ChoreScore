'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert(
        "Chores",
        [
          {
            choreName: "Sweep The Floor",
            value: 100,
            note: "Hardwood surfaces on the first floor",
            dueDate: null,
            isCompleted: false,
            userId: 1,
            listId: 1,
            choreTypeId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            choreName: "Buy a Power Drill",
            value: 100,
            note: "For completely legal reasons",
            dueDate: null,
            isCompleted: false,
            userId: 2,
            listId: 2,
            choreTypeId: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
          }, {
            choreName: "Call that Guy",
            value: 100,
            note: "About that favor he owes you, for that thing.",
            dueDate: null,
            isCompleted: false,
            userId: 2,
            listId: 2,
            choreTypeId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          }, {
            choreName: "Watch the bank for a while",
            value: 100,
            note: "The sidewalk is public property, they can't arrest me for that",
            dueDate: null,
            isCompleted: false,
            userId: 2,
            listId: 2,
            choreTypeId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          }, {
            choreName: "Tickets to Morocco",
            value: 100,
            note: "I hear it's nice this time of year.",
            dueDate: null,
            isCompleted: false,
            userId: 2,
            listId: 2,
            choreTypeId: 4,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            choreName: "Get Snacks",
            value: 100,
            note: "Dad is lactose intolerant :(",
            dueDate: null,
            isCompleted: false,
            userId: 1,
            listId: 1,
            choreTypeId: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Chores', null, {});
  }
};
