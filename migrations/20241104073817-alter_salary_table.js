'use strict';

const { FOREIGNKEYS } = require('sequelize/lib/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    queryInterface.addConstraint('salaries', {
      fields: ['transaction_id'],
      type: 'foreign key',
      name: 'fk_salary_transaction',
      references: {
        table: 'transactions',
        field: 'id',
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint('salaries', 'fk_salary_transaction');
  }
};
