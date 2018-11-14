/**
 * CRUD API for __PascalName__.
 *
 * NOTE:
 * to restrict routes to only logged in users, add "requireLogin()"
 * to restrict routes to only admin users, add "requireRole('admin')"
 */

var __camelNamePlural__ = require('./__camelNamePlural__Controller');

module.exports = function(router, requireLogin, requireRole) {

  // - Create
  router.post('/api/__kebabNamePlural__'               , requireLogin(), __camelNamePlural__.create); // must login by default

  // - Read
  router.get('/api/__kebabNamePlural__'                , __camelNamePlural__.list);
  router.get('/api/__kebabNamePlural__/search'         , __camelNamePlural__.search);
  router.get('/api/__kebabNamePlural__/by-:refKey/:refId*'  , __camelNamePlural__.listByRefs);
  router.get('/api/__kebabNamePlural__/by-:refKey-list'    , __camelNamePlural__.listByValues);
  router.get('/api/__kebabNamePlural__/default'        , __camelNamePlural__.getDefault);
  router.get('/api/__kebabNamePlural__/schema'         , requireRole('admin'), __camelNamePlural__.getSchema);
  router.get('/api/__kebabNamePlural__/:id'            , __camelNamePlural__.getById);

  // - Update
  router.put('/api/__kebabNamePlural__/:id'            , requireLogin(), __camelNamePlural__.update); // must login by default

  // - Delete
  router.delete('/api/__kebabNamePlural__/:id'         , requireRole('admin'), __camelNamePlural__.delete); // must be an 'admin' by default

}
