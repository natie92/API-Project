'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
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
    ownerId: 1,
    address: "275 Fairmount Ave",
    city: "Newark",
    state: "New Jersey",
    country: "Unites States",
    lat: 40.737941023385105,
    lng: -74.19596774453882,
    name: "Natalia's Apt AirBNB rentout",
    description: "small yet private, good place to hunker down after a flight from NWK airport or on the way to NWK airport!",
    price: 200
  },
  {
    ownerId: 2,
    address: "101-63 N Spring St",
    city: "Bloomfield",
    state: "New Jersey",
    country: "Unites States",
    lat: 40.80831751280614,
    lng: -74.18732169130071,
    name: "Bloomfield Rentout",
    description: "Wonderful home stay for those who want to visit Bloomfield's golf course!",
    price: 128

  }], {});
},

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});

     */
    const Op = Sequelize
    await queryInterface.bulkDelete(options , {
      address: {
        [Op.in]: [
          "275 Fairmount Ave",
          "101-63 N Spring St"
        ]
      }
    });
  }
};
