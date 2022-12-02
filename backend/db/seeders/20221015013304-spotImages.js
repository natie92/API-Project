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
      url: 'https://images.contentstack.io/v3/assets/blt00454ccee8f8fe6b/blt0aa4f256602486c1/618117a59b08490cdd118c37/US_Villas_US_Header.jpg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'https://a0.muscache.com/im/pictures/d03d9889-b6c3-42f5-ad84-2c6c4b7a57b2.jpg?im_w=2560',
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
