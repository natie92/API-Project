'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "ReviewImages"
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
      reviewId: 1,
      url: 'anotherspot.com'

    },
     {
      id: 2,
      reviewId: 2,
      url: 'onemorespot.com'
    },
  ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "ReviewImages"
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bultDelete(options ,
    {
      id: [1,2],
    },
    {}
    )
  },
};
