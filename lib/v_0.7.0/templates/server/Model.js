/**
 * Data Model for __PascalName__.
 *
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add properties to the
 * productSchema below, the create and update controllers
 * will respect the updated model.
 *
 * NOTE: make sure to account for any model changes on the client
 */

let mongoose = require('mongoose');
let ObjectId = mongoose.SchemaTypes.ObjectId;

// define __name__ schema
const __name__Schema = mongoose.Schema({
  // default values from Yote CLI
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }

  // specific values for __name__ go below
  , name:                   { type: String, required: '{PATH} is required!' }

});

// __name__ instance methods go here
// __name__Schema.methods.methodName = function() {};

// __name__ model static functions go here
// __name__Schema.statics.staticFunctionName = function() {};

const __PascalName__ = mongoose.model('__PascalName__', __name__Schema);


// // __name__ model methods
// function createDefaults() {
//   __PascalName__.find({}).exec(function(err, __name__s) {
//     if(__name__s.length == 0) {
//       __PascalName__.create({
//         name: "Sample __PascalName__ Name!"
//       });
//       logger.info("created initial __name__ defaults");
//     }
//   });
// }
//
// exports.createDefaults = createDefaults;
