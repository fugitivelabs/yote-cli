/**
 * Data Model for __Proper__.
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
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , name:                   { type: String, required: '{PATH} is required!' }
});

// __name__ instance methods go here
// __name__Schema.methods.methodName = function() {};

// __name__ model static functions go here
// __name__Schema.statics.staticFunctionName = function() {};

const __Proper__ = mongoose.model('__Proper__', __name__Schema);


// // __name__ model methods
// function createDefaults() {
//   __Proper__.find({}).exec(function(err, __name__s) {
//     if(__name__s.length == 0) {
//       __Proper__.create({
//         name: "Sample __Proper__ Name!"
//       });
//       logger.info("created initial __name__ defaults");
//     }
//   });
// }
//
// exports.createDefaults = createDefaults;
