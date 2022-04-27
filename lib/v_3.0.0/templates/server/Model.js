/**
 * Data Model for __PascalName__.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * __camelName__Schema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

const mongoose = require('mongoose');
const apiUtils = require('../../global/api/apiUtils')

const __camelName__Schema = mongoose.Schema({
  created: { type: Date, default: Date.now }
  , updated: { type: Date, default: Date.now }

  // specific values for __camelName__ go below
  , name: { type: String, required: '{PATH} is required!' }
});

// schema hooks
__camelName__Schema.pre('save', function () {
  // set the "updated" field automatically
  this.updated = new Date();
})
// https://mongoosejs.com/docs/middleware.html#types-of-middleware
// NOTE: we can also override some of the default mongo errors here, and replace with more specific YoteErrors

// instance methods go here
// __camelName__Schema.methods.methodName = function() {};

// model static functions go here
// __camelName__Schema.statics.staticFunctionName = function() {};
__camelName__Schema.statics.getDefault = () => {
  let defaultObj = {};
  __camelName__Schema.eachPath((path, schemaType) => {
    defaultObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defaultObj;
}

// necessary for server-side text search.
// __camelName__Schema.index({
//   name: 'text'
// })

const __PascalName__ = mongoose.model('__PascalName__', __camelName__Schema);
