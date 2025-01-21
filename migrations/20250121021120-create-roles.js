'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdBy: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedBy:{
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });

    queryInterface.addConstraint('roles', {
      fields: ['createdBy'],
      type: 'foreign key',
      name: 'fk_created_by',
      references:{
        table: 'users',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    })
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('roles');
    queryInterface.removeConstraint('roles', 'fk_created_by');
  }
};