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

const apiUtils = require('../../global/utils/api');
let mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

// define __camelName__ schema
const __camelName__Schema = mongoose.Schema({
  // default values from Yote CLI
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }

  // specific values for __camelName__ go below
  , name:                   { type: String, required: '{PATH} is required!' }

});

// __camelName__ instance methods go here
// __camelName__Schema.methods.methodName = function() {};

// __camelName__ model static functions go here
// __camelName__Schema.statics.staticFunctionName = function() {};
__camelName__Schema.statics.getSchema = () => {
  logger.info('return default schema paths');
  let schema = {}
  __camelName__Schema.eachPath((path, schemaType) => {
    // console.log(path, schemaType);
    schema[path] = schemaType;
  });
  return schema;
}

__camelName__Schema.statics.getDefault = () => {
  logger.info('return default object based on schema');
  let defObj = {};
  __camelName__Schema.eachPath((path, schemaType) => {
    defObj[path] = apiUtils.defaultValueFromSchema(schemaType);
  });
  return defObj;
}

const __PascalName__ = mongoose.model('__PascalName__', __camelName__Schema);


// // __camelName__ model methods
// function createDefaults() {
//   __PascalName__.find({}).exec(function(err, __camelNamePlural__) {
//     if(__camelNamePlural__.length == 0) {
//       __PascalName__.create({
//         name: "Sample __PascalName__ Name!"
//       });
//       logger.info("created initial __camelName__ defaults");
//     }
//   });
// }
//
// exports.createDefaults = createDefaults;
