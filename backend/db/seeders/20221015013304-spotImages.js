'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
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
      spotId: 1,
      url: 'airbnb1.com/room.jpg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'locationwoods.com/woods.jpg',
      preview: true
    }], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = "SpotImages"
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,
    {
      spotId: [1,2],
    },
    {}
    )
  }
};
