/***********************************************************

API for __Proper__.

***********************************************************/

var __name__s = require('./__name__sController');

module.exports = function(router, requireLogin, requireRole) {
  //to restrict routes to only logged in users, add "requireLogin()"
  //to restrict routes to only admin users, add "requireRole('admin')"

  // - Create
  router.post('/api/__name__s'               ,  __name__s.create); // must login by default

  // - Read
  router.get('/api/__name__s'                , __name__s.list);
  router.get('/api/__name__s/search'         , __name__s.search);
  router.get('/api/__name__s/:id'            , __name__s.getById);

  // - Update
  router.put('/api/__name__s/:id'            ,  __name__s.update); // must login by default

  // - Delete
  router.delete('/api/__name__s/:id'         , requireRole('admin'), __name__s.delete); // must be an 'admin' by default

}
