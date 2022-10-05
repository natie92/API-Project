'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcryptjs");

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [{
    email: 'demo@user.io',
    username: 'Demo-lition',
    hashedPassword: bcrypt.hashSync('password')
   }],
   {
    email: 'user1@user.io',
    username: 'FakeUser1',
    hashedPassword: bcrypt.hashSync('password2'),
   },
   {
    email: 'user@user.io',
    username: 'FakeUser2',
    hashedPassword: bcrypt.hashSync('password3')
   }
   )
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('People', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    });
  }
};
