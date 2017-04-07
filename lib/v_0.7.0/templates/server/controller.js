/**
 * Sever-side controllers for __PascalName__.
 * By default, Yote's server controllers are dynamic relative
 * to their models -- i.e. if you add fields to the __PascalName__
 * model, the create and update controllers below will respect
 * the new schema.
 *
 * NOTE: HOWEVER, you still need to make sure to account for
 * any model changes on the client
 */

let __PascalName__ = require('mongoose').model('__PascalName__');

exports.list = (req, res) => {
  if(req.query.page) {
    // paginate on the server
    var page = req.query.page || 1;
    var per = req.query.per || 20;
    __PascalName__.find({}).skip((page-1)*per).limit(per).exec((err, __name__s) => {
      if(err || !__name__s) {
        logger.error("ERROR:");
        logger.info(err);
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
    // list all __name__s
    __PascalName__.find({}).exec((err, __name__s) => {
      if(err || !__name__s) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, __name__s: __name__s });
      }
    });
  }
}

exports.listByRef = (req, res) => {
  /**
   * NOTE: This let's us querey ANY pointer by passing in a refKey and refId
   */
  let query = {
    ["_" + req.params.refKey]: req.params.refId
  }
  __PascalName__.find(query, (err, __name__s) => {
    if(err || !__name__s) {
      res.send({success: false, message: `Error retrieving __name__s by ${req.params.refKey}:${req.params.refId}`});
    } else {
      res.send({success: true, __name__s})
    }
  })
}

exports.search = (req, res) => {
  // search by query parameters
  // NOTE: It's up to the front end to make sure the params match the model
  let mongoQuery = {};
  let page, per;

  for(key in req.query) {
    if(req.query.hasOwnProperty(key)) {
      if(key == "page") {
        page = parseInt(req.query.page);
      } else if(key == "per") {
        per = parseInt(req.query.per);
      } else {
        logger.debug("found search query param: " + key);
        mongoQuery[key] = req.query[key];
      }
    }
  }

  logger.info(mongoQuery);
  if(page || per) {
    page = page || 1;
    per = per || 20;
    __PascalName__.find(mongoQuery).skip((page-1)*per).limit(per).exec((err, __name__s) => {
      if(err || !__name__s) {
        logger.error("ERROR:");
        logger.info(err);
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
    __PascalName__.find(mongoQuery).exec((err, __name__s) => {
      if(err || !__name__s) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, __name__s: __name__s });
      }
    });
  }
}

exports.getById = (req, res) => {
  logger.info('get __name__ by id');
  __PascalName__.findById(req.params.id).exec((err, __name__) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if (!__name__) {
      logger.error("ERROR: __PascalName__ not found.");
      res.send({ success: false, message: "__PascalName__ not found." });
    } else {
      res.send({ success: true, __name__: __name__ });
    }
  });
}

exports.create = (req, res) => {
  logger.info('creating new __name__');
  let __name__ = new __PascalName__({});

  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      __name__[k] = req.body[k];
    }
  }

  __name__.save((err, __name__) => {
    if (err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!__name__) {
      logger.error("ERROR: Could not create __PascalName__.");
      res.send({ success: false, message: "Could not create __PascalName__." });
    } else {
      logger.info("created new __name__");
      res.send({ success: true, __name__: __name__ });
    }
  });
}

exports.update = (req, res) => {
  logger.info('updating __name__');
  __PascalName__.findById(req.params.id).exec((err, __name__) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!__name__) {
      logger.error("ERROR: __PascalName__ not found.");
      res.send({ success: false, message: "__PascalName__ not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          __name__[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      __name__.updated = new Date();
      __name__.save((err, __name__) => {
        if(err) {
          logger.error("ERROR:");
          logger.info(err);
          res.send({ success: false, message: err });
        } else if(!__name__) {
          logger.error("ERROR: Could not save __name__.");
          res.send({ success: false, message: "Could not save __name__."});
        } else {
          res.send({ success: true, __name__: __name__ });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  logger.warn("deleting __name__");
  __PascalName__.findById(req.params.id).remove((err) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted __name__" });
    }
  });
}
