/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function () {

  const teachers = [
    {
      email: 'teacher@gmail.com',
      fullname: 'le van teacher',
      password: await sails.helpers.passwords.hashPassword('123456'),
      role: 'Teacher'
    },
    {
      email: 'manager@gmail.com',
      fullname: 'pham van manager',
      password: await sails.helpers.passwords.hashPassword('123456'),
      role: 'Manager'
    },
    {
      email: 'staff@gmail.com',
      fullname: 'nguyen hoang staff',
      password: await sails.helpers.passwords.hashPassword('123456'),
      role: 'Staff'
    }
  ]
  const classes = [
    {
      name: 'Physical',
      max_student: 50,
    }
  ]
  const students = [
    {
      fullname: 'Nguyen Van A',
      email: 'nguyen.van@gmail.com',
      password: await sails.helpers.passwords.hashPassword('123456'),
      birthday: '01/01/2000',
      sex: 'Female',
      classid: 1
    }, {
      fullname: 'Nguyen Van B',
      email: 'b.nv@gmail.com',
      password: await sails.helpers.passwords.hashPassword('123456'),
      sex: 'Male',
      birthday: '01/01/1900',
      classid: 1
    }
  ]
  await Teacher.createEach(teachers)
  await Class.createEach(classes)
  await Student.createEach(students)

};
