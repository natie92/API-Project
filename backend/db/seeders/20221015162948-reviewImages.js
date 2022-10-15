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
   await queryInterface.bulkInsert('ReviewImages', [
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bultDelete('ReviewImages',
    {
      id: [1,2],
    },
    {}
    )
  },
};
