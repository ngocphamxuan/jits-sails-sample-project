/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */
// định nghĩa policy
// ví dụ: verifyToken cho tất cả các api
module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/


  '*': true,
  'students/StudentsController': {
    '*': 'isAuthorized',
    create: ['isAuthorized', 'isManager'],
    delete: ['isAuthorized', 'isManager'],
    getById: ['isAuthorized', 'verifyPermission'],
    getAll: ['isAuthorized', 'isManager'],
    update: ['isAuthorized', 'verifyPermission'],
    upload: ['isAuthorized', 'verifyPermission']
  },
  'class/ClassController': {
    '*': ['isAuthorized', 'isManager']
  }

};
