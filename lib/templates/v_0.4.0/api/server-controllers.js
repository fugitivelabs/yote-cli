/***********************************************************

Sever-side controllers for __Proper__.  

By default, Yote's server controllers are dynamic relative 
to their models -- i.e. if you add fields to the __Proper__
model, the create and update controllers below will respect
the new schema.

NOTE: make sure to account for any model changes 
on the client

***********************************************************/

var __Proper__ = require('mongoose').model('__Proper__')
  ;

exports.list = function(req, res) {
  console.log('list __name__s');
  __Proper__.find({}).exec(function(err, __name__s) {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!__name__s) {
      res.send({ success: false, message: "no __name__s found :( " });
    } else {
      res.send({ success: true, __name__s: __name__s });
    }
  });
}

exports.search = function(req, res) {
  // search by query parameters 
  // up to front end to make sure the params exist on the model
  console.log('searching for __name__s with params.');
  var mongoQuery = {};
  for(key in req.query) {
    if(req.query.hasOwnProperty(key)) {
      console.log('found query param: ' + key);
      mongoQuery[key] = req.query[key];
    }
  }
  console.log(mongoQuery);
  __Proper__.find(mongoQuery).exec(function(err, __name__s) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!__name__s) {
      res.send({ success: false, message: "no __name__s found with params" });
    } else {
      res.send({ success: true, __name__s: __name__s});
    }
  });
}

exports.getById = function(req, res) {
  console.log('get __name__ by id');
  __Proper__.findOne({ _id: req.params.id }).exec(function(err, __name__) {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!__name__) {
      res.send({ success: false, message: "no __name__ found :(" });
    } else {
      res.send({ success: true, __name__: __name__ });
    }
  });
}

exports.create = function(req, res) {
  console.log('creating new __name__');
  var __name__ = new __Proper__({});
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      __name__[k] = req.body[k];
    }
  }
  __name__.save(function(err, __name__) {
    if (err) {
      res.send({ success: false, message: err });
    } else if(!__name__) {
      res.send({ success: false, message: "Could not create __name__ :(" });
    } else {
      console.log("created new __name__");
      res.send({ success: true, __name__: __name__ });
    }
  });
}

exports.update = function(req, res) {
  console.log('updating __name__');
  __Proper__.findOne({ _id: req.params.id }).exec(function(err, __name__) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!__name__) {
      res.send({ success: false, message: "__Proper__ not found. Edit failed. :(" });
    } else {
      __name__.updated = new Date();
      // now run through and update all other fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          __name__[k] = req.body[k];
        }
      }
      __name__.save(function(err, __name__) {
        if(err) {
          res.send({ success: false, message: err });
        } else if(!__name__) {
          res.send({ success: false, message: "Could not save __name__ :("});
        } else {
          res.send({ success: true, __name__: __name__ });
        }
      });
    }
  });
}

exports.delete = function(req, res) {
  console.log("deleting __name__");
  __Proper__.findOne({ _id: req.param('id') }).remove(function(err) {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted __name__" });
    }
  });
}