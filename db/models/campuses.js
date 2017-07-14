'use strict';
const Sequelize = require('sequelize');
const db = require('../index');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'defaultCampus.jpg'
  },
  dean: {
    type: Sequelize.STRING
  },
})

module.exports = Campus;
