'use strict';

const Campus = require('./campuses')
const Student = require('./students')

Campus.hasMany(Student, {
  foreignKey: 'campusId',
  onDelete: 'cascade',
  hooks: true
});
Student.belongsTo(Campus);

module.exports = {Campus, Student}
