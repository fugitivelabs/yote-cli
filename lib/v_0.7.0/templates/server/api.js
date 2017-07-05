/**
 * CRUD API for __PascalName__.
 *
 * NOTE:
 * to restrict routes to only logged in users, add "requireLogin()"
 * to restrict routes to only admin users, add "requireRole('admin')"
 */

var __name__s = require('./__name__sController');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/__kebabName__s'               , requireLogin(), __name__s.create); // must login by default

  // - Read
  router.get('/api/__kebabName__s'                , __name__s.list);
  router.get('/api/__kebabName__s/search'         , __name__s.search);
  router.get('/api/__kebabName__s/by-:refKey/:refId'  , __name__s.listByRef);
  router.get('/api/__kebabName__s/by-:refKey-list'    , __name__s.listByValues);
  router.get('/api/__kebabName__s/:id'            , __name__s.getById);

  // - Update
  router.put('/api/__kebabName__s/:id'            , requireLogin(), __name__s.update); // must login by default

  // - Delete
  router.delete('/api/__kebabName__s/:id'         , requireRole('admin'), __name__s.delete); // must be an 'admin' by default

}
