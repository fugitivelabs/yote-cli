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
  if(req.query.page) {
    console.log('list __name__s with pagination');
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    __Proper__.find({}).skip((page-1)*per).limit(per).exec(function(err, __name__s) {
      if(err || !__name__s) {
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , __name__s: __name__s
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    console.log('list __name__s');
    __Proper__.find({})..exec(function(err, __name__s) {
      if(err || !__name__s) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, __name__s: __name__s });
      }
    });
  }
}

exports.search = function(req, res) {
  //search by query parameters
  // up to front end to make sure the params exist on the model
  console.log("searching for __name__s with params.");
  var mongoQuery = {};
  var page, per;
  for(key in req.query) {
    if(req.query.hasOwnProperty(key)) {
      if(key == "page") {
        page = req.query.page;
      } else if(key == "per") {
        per = req.query.per;
      } else {
        console.log("found search query param: " + key);
        mongoQuery[key] = req.query[key];
      }
    }
  }
  if(page || per) {
    console.log("searching for __name__s with pagination");
    console.log(mongoQuery);
    page = page || 1;
    per = per || 20;
    __Proper__.find(mongoQuery).skip((page-1)*per).limit(per).exec(function(err, __name__s) {
      if(err || !__name__s) {
        res.send({ success: false, message: err });
      } else {
        res.send({ 
          success: true
          , __name__s: __name__s
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    console.log(mongoQuery);
    __Proper__.find(mongoQuery).exec(function(err, __name__s) {
      if(err || !__name__s) {
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, __name__s: __name__s });
      }
    });
  }
}

exports.getById = function(req, res) {
  console.log('get __name__ by id');
  __Proper__.findById(req.params.id).exec(function(err, __name__) {
    if(err) {
      res.send({ success: false, message: err });
    } else if (!__name__) {
      res.send({ success: false, message: "no __name__ found :(" });
    } else {
      res.send({ success: true, __name__: __name__ });
    }
  });
}

exports.getAndPopulate = function(req, res) {
  console.log('get __name__ by id');
  __Proper__.findById(req.params.id).populate('author').exec(function(err, __name__) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!__name__) {
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
  __Proper__.findById(req.params.id).exec(function(err, __name__) {
    if(err) {
      res.send({ success: false, message: err });
    } else if(!__name__) {
      res.send({ success: false, message: "__Proper__ not found. Edit failed. :(" });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          __name__[k] = req.body[k];
        }
      }
      // now edit the updated date
      __name__.updated = new Date();
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
  __Proper__.findById(req.params.id.remove(function(err) {
    if(err) {
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted __name__" });
    }
  });
}