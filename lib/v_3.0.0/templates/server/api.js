/**
 * CRUD API for __PascalName__.
 *
 */

const __camelName__ = require('./__camelName__Controller')

const { requireLogin, requireAccountAccess } = require('../../global/handlers/authHandler')

module.exports = (router) => {

  router.get('/api/__kebabNamePlural__/default', __camelName__.getDefault)
  router.get('/api/__kebabNamePlural__/:id', __camelName__.getSingleById)


  router.get('/api/__kebabNamePlural__', __camelName__.getListWithArgs)

  // // same but with api level restrictions
  // router.get('/api/__kebabNamePlural__', 
  //   requireLogin, 
  //   requireAccountAccess, 
  //   __camelName__.getListWithArgs
  // )

  // router.post('/api/__kebabNamePlural__', __camelName__.createSingle)
  router.post('/api/__kebabNamePlural__', requireLogin, __camelName__.createSingle);

  router.put('/api/__kebabNamePlural__/:id', __camelName__.updateSingleById);

  router.delete('/api/__kebabNamePlural__/:id', requireLogin, __camelName__.deleteSingle);

}