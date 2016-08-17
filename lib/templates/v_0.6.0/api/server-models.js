/***********************************************************

Model for __Proper__.  

By default, Yote's server controllers are dynamic relative 
to their models -- i.e. if you add properties to the 
__name__Schema below, the create and update controllers 
will respect the updated model.

NOTE: make sure to account for any model changes 
on the client

***********************************************************/

var mongoose = require('mongoose')
  , ObjectId = mongoose.SchemaTypes.ObjectId
  ;

// define __name__ schema
var __name__Schema = mongoose.Schema({
  created:                  { type: Date, default: Date.now }
  , updated:                { type: Date, default: Date.now }
  , title:                  { type: String, required: '{PATH} is required!' }
});

// __name__ instance methods go here
// __name__Schema.methods.methodName = function() {};

// __name__ model static functions go here
// __name__Schema.statics.staticFunctionName = function() {};

__Proper__ = mongoose.model('__Proper__', __name__Schema);
