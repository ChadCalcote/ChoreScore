'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Chores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      choreName: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.STRING
      },
      dueDate: {
        type: Sequelize.DATE
      },
      isCompleted: {
        type: Sequelize.BOOLEAN
      },
      listId: {
        type: Sequelize.INTEGER
      },
      choreTypeId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Chores');
  }
};