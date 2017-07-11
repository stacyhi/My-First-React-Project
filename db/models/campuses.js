'use strict';
const Sequelize = require('sequelize');
const db = require('../index');

module.exports = db.define('campus', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  },
  dean: {
    type: Sequelize.STRING
  },
}, {
    classMethods: {
      findStudentsByCampusId: function (campusId) {
        const Student = db.models.student;
        const campus = {};
        return this.findById(+campusId)
          .then(foundCampus => (campus.campus = foundCampus))
          .then(campus => {
            return Student.findAll({
              where: { campusId: campus.id },
              order: [
                ['name', 'ASC'],
              ]
            })
          })
          .then(students => {
            campus.students = students;
            return campus;
          })
          .catch(err => console.log("Error:", err))
      }
    },
  })

