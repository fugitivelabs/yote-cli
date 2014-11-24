/***********************************************************

API for __Proper__.  

***********************************************************/

var __name__s = require('../../controllers/__name__s');

module.exports = function(router, requireLogin, requireRole) {

  // - Create 
  router.post('/api/__name__s'            , requireLogin(), __name__s.create); // must login by default

  // - Read
  router.get('/api/__name__s'             , __name__s.list);
  router.get('/api/__name__s/search'      , __name__s.search);
  router.get('/api/__name__s/:id'         , __name__s.getById);

  // - Update
  router.put('/api/__name__s/:id'         , requireLogin(), __name__s.update); // must login by default

  // - Delete
  router.delete('/api/__name__s/:id'      , requireRole('admin'), __name__s.delete); // must be an 'admin' by default

}