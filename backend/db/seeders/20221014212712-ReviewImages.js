'use strict';

const { urlencoded } = require('express');

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
      url: "firsturl.com"
     },
      {
      id: 2,
      reviewId: 2,
      url: "secondurl.com"
     },
     {
      id: 3,
      reviewId: 3,
      url: "thirdurl.com"
     },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ReviewImages',
    {
      id: [1,2,3]

    });
  }
};
