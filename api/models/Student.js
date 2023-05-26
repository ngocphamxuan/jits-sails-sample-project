const bcrypt = require('bcrypt')
/**
 * Students.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    fullname: {
      type: 'string',
      example: 'Nguyen Van A',
      required: true
    },
    email: {
      type: 'string',
      isEmail: true,
      required: true,
      unique: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    birthday: {
      type: 'string',
      custom: (value) => {
        return new Date(value) != "Invalid Date"
      }
    },
    province: {
      type: 'string',
      defaultsTo: 'Hanoi'
    },
    district: {
      type: 'string',
      defaultsTo: 'Hai Ba Trung'
    },
    sex: {
      type: 'string',
      isIn: ['Female', 'Male'],
      required: true,
    },
    town: {
      type: 'string',
      defaultsTo: 'Tran Dai Nghia street'
    },
    classid: {
      model: 'class'
    },
    avatar_url: {
      type: 'string',
      defaultsTo: 'default.img'
    },
    isdeleted: {
      type: 'boolean',
      defaultsTo: false
    },

  },
  beforeCreated: async (user, next) => {
    bcrypt.genSalt(10, (err, salt) => {
      if(err) return next(err)
      bcrypt.hash(user.password, salt, (err, hashed) => {
        if(err) return next(err)
        user.password = hashed
        next()
      })
    })
  }
};

