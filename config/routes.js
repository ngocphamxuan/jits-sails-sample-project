/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */
// định nghĩa routes
module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
 
  // login
  'POST /login' :'LoginController.login',


  // student
  'POST /students': 'students/StudentsController.create',
  'GET /students/:id': 'students/StudentsController.getById',
  'GET /students': 'students/StudentsController.getAll',
  'PUT /students/:id/upload-avatar': 'students/StudentsController.uploadAvatar',
  'PUT /students/:id': 'students/StudentsController.update',
  'DELETE /students/:id': 'students/StudentsController.delete',
  // teacher

  // class
  'GET /classes/:id' : 'class/ClassController.getById',
  'GET /classes' : 'class/ClassController.getAll',
  'POST /classes': 'class/ClassController.create',
  'PUT /classes/:id': 'class/ClassController.update',
  'DELETE /classes/:id': 'class/ClassController.delete'





};
