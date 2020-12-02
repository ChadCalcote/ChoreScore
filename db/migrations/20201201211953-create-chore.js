"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Chores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      choreName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      note: {
        type: Sequelize.STRING,
      },
      dueDate: {
        type: Sequelize.DATEONLY, // 2020-12-05
      },
      isCompleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      listId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Lists", key: "id" },
      },
      choreTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "ChoreTypes", key: "id" },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Chores");
  },
};
