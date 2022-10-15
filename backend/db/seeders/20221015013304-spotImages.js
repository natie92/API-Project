'use strict';

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
   await queryInterface.bulkInsert("SpotImages", [
    {
      spotId: 1,
      url: 'airbnb1.com/room.jpg',
      preview: true,
    },
    {
      spotId: 2,
      url: 'locationwoods.com/woods.jpg',
      preview: true
    },
     {
      spotId: 3,
      url: 'uglycabin.com/ick.jpg',
      preview: false,
    },

   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete('SpotImages',
    {
      spotId: [1,2,3],
    },
    {}
    )
  }
};
