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
   await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          userId: 1,
          spotId: 1,
          review: "I loved how quiet it was and a beautiful drive to the airport.",
          stars: 5,
        },
        {
          userId: 2,
          spotId: 1,
          review: "super cozy amazing!",
          stars: 4,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete(
      "Reviews",
      {
        id: 1,
      },
      {}
    );
  }
};
