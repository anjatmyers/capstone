'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('folderIDs', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER,
      // },
      id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      root: {
        type: Sequelize.STRING
      },
      javascript: {
        type: Sequelize.STRING
      },
      python: {
        type: Sequelize.STRING
      },
      htmlcss: {
        type: Sequelize.STRING
      },
      sql: {
        type: Sequelize.STRING
      },
      shell: {
        type: Sequelize.STRING
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('folderIDs');
  }
};