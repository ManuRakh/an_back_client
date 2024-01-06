const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash(process.env.seeding_password, 8);

    await queryInterface.bulkInsert('users', [{
        id: uuidv4(),
        name: 'Admin',
      phone: '1234567890',
      telegram: '@admin',
      role: 'admin',
      username: 'admin',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
