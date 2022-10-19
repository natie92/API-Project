'use strict';
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
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
    firstName: 'Megan',
    lastName: 'Got',
    email: 'megangotgot@gmail.com',
    username: 'megangotit',
    hashedPassword: bcrypt.hashSync('password')
   },
   {
    firstName: 'Yasmine',
    lastName: 'Hernandez',
    email: 'yashern1@gmail.com',
    username: 'yasherd1',
    hashedPassword: bcrypt.hashSync('password2'),
   }]

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
