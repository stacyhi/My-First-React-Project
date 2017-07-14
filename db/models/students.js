'use strict';
const Sequelize = require('sequelize');
const db = require('../index.js');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
}, {
  defaultScope: {
    include: { model: db.models.campus }
  }

})

module.exports = Student;
