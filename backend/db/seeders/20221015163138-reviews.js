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
   await queryInterface.bulkInsert('Reviews', [
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Reviews',
    {
      id: [1,2],
    },
    )
  },
};
