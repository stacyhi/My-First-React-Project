'use strict';

const Campus = require('./campuses')
const Student = require('./students')

Student.belongsTo(Campus);
Campus.hasMany(Student, {
  foreignKey: 'campusId',
  onDelete: 'cascade',
  hooks: true
});

module.exports = {Campus, Student}
