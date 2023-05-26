 
  // login
  - 'POST /login' : for teacher/student login


  // student
  - 'POST /students': create new student
  - 'GET /students/:id': get detail student: available: manager, owner student
  -  'GET /students': get list students, available: manager
  - 'PUT /students/:id/upload-avatar': upload avatar student: available: manager, owner student
  - 'PUT /students/:id': available: manager, owner student
  - 'DELETE /students/:id': available: manager
  // teacher

  // class
  - 'GET /classes/:id' : available Manager
  - 'GET /classes' : available Manager
  - 'POST /classes': available Manager
  - 'PUT /classes/:id': available Manager
  - 'DELETE /classes/:id': available Manager

