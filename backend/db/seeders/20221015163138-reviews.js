'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "Reviews"
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(options, [
    {
      id: 1,
      userId: 1,
      spotId: 1,
      review: 'So close to the airport after our red eye. Quiet neighborhood!',
      stars: 4
    },
    {
      id: 2,
      userId: 2,
      spotId: 2,
      review: 'Super cozy and only a few blocks away from the golf course!',
      stars: 4
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "Reviews"
    /**
     *
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(options,
    {
      id: [1,2],
    },
    )
  },
};
