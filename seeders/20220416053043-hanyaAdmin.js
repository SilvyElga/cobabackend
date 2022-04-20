'use strict';

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

     await queryInterface.bulkInsert('users', [{
      email: 'adminAll@mail.com',
      password: '$2a$10$GoOu4RoOiLRRAixp6dMlW.YXQQsg4Whk7G4/zxewjFrqycMFT.4hq',//12345678
      name: 'adminAll',
      status: 'admin',
      
      }], {});
  },



  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
