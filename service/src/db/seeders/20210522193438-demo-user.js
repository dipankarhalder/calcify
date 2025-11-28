'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let users = [...Array(50).keys()].map((i) => {
      return {
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        registrationComplete: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    });

    // console.log("users", users);

    return await queryInterface.bulkInsert('Users', users, {
      updateOnDuplicate: ['email']
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
