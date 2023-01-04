'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [{
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
   },
   {
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@gmail.com',
    username: 'Demo User',
    hashedPassword: bcrypt.hashSync('password')
   }
  ]


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
    await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['megangotit', 'yasherd1'] }
    });
  }
};
