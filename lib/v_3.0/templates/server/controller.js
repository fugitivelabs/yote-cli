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
    __PascalName__.find({}).skip((page-1)*per).limit(per).exec((err, __camelNamePlural__) => {
      if(err || !__camelNamePlural__) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({success: false, message: err});
      } else {
        res.send({
          success: true
          , __camelNamePlural__: __camelNamePlural__
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    // list all __camelNamePlural__
    __PascalName__.find({}).exec((err, __camelNamePlural__) => {
      if(err || !__camelNamePlural__) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, __camelNamePlural__: __camelNamePlural__ });
      }
    });
  }
}

exports.listByValues = (req, res) => {
  /**
   * returns list of __camelNamePlural__ queried from the array of _id's passed in the query param
   *
   * NOTES:
   * node default max request headers + uri size is 80kb.
   */

  if(!req.query[req.params.refKey]) {
    // make sure the correct query params are included
    res.send({success: false, message: `Missing query param(s) specified by the ref: ${req.params.refKey}`});
  } else {
    __PascalName__.find({[req.params.refKey]: {$in: [].concat(req.query[req.params.refKey]) }}, (err, __camelNamePlural__) => {
        if(err || !__camelNamePlural__) {
          res.send({success: false, message: `Error querying for __camelNamePlural__ by ${[req.params.refKey]} list`, err});
        } else  {
          res.send({success: true, __camelNamePlural__});
        }
    })
  }
}

exports.listByRefs = (req, res) => {
  /**
   * NOTE: This let's us query by ANY string or pointer key by passing in a refKey and refId
   */

   // build query
  let query = {
    [req.params.refKey]: req.params.refId === 'null' ? null : req.params.refId
  }
  // test for optional additional parameters
  const nextParams = req.params['0'];
  if(nextParams.split("/").length % 2 == 0) {
    // can't have length be uneven, throw error
    res.send({success: false, message: "Invalid parameter length"});
  } else {
    if(nextParams.length !== 0) {
      for(let i = 1; i < nextParams.split("/").length; i+= 2) {
        query[nextParams.split("/")[i]] = nextParams.split("/")[i+1] === 'null' ? null : nextParams.split("/")[i+1]
      }
    }
    __PascalName__.find(query, (err, __camelNamePlural__) => {
      if(err || !__camelNamePlural__) {
        res.send({success: false, message: `Error retrieving __camelNamePlural__ by ${req.params.refKey}: ${req.params.refId}`});
      } else {
        res.send({success: true, __camelNamePlural__})
      }
    })
  }
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
    __PascalName__.find(mongoQuery).skip((page-1)*per).limit(per).exec((err, __camelNamePlural__) => {
      if(err || !__camelNamePlural__) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({
          success: true
          , __camelNamePlural__: __camelNamePlural__
          , pagination: {
            per: per
            , page: page
          }
        });
      }
    });
  } else {
    __PascalName__.find(mongoQuery).exec((err, __camelNamePlural__) => {
      if(err || !__camelNamePlural__) {
        logger.error("ERROR:");
        logger.info(err);
        res.send({ success: false, message: err });
      } else {
        res.send({ success: true, __camelNamePlural__: __camelNamePlural__ });
      }
    });
  }
}

exports.getById = (req, res) => {
  logger.info('get __camelName__ by id');
  __PascalName__.findById(req.params.id).exec((err, __camelName__) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if (!__camelName__) {
      logger.error("ERROR: __PascalName__ not found.");
      res.send({ success: false, message: "__PascalName__ not found." });
    } else {
      res.send({ success: true, __camelName__: __camelName__ });
    }
  });
}

exports.getSchema = (req, res) => {
  /**
   * This is admin protected and useful for displaying REST api documentation
   */
  logger.info('get __camelName__ full mongo schema object');
  res.send({success: true, schema: __PascalName__.getSchema()});
}


exports.getDefault = (req, res) => {
  /**
   * This is an open api call by default (see what I did there?) and is used to
   * return the default object back to the Create components on the client-side.
   * 
   * NOTE: uses /global/utils/api.js to return default values IF defined on the model.
   * will otherwise return null. 
   */
  logger.info('get __camelName__ default object');
  res.send({success: true, defaultObj: __PascalName__.getDefault()});
}

exports.create = (req, res) => {
  logger.info('creating new __camelName__');
  let __camelName__ = new __PascalName__({});

  // run through and create all fields on the model
  for(var k in req.body) {
    if(req.body.hasOwnProperty(k)) {
      __camelName__[k] = req.body[k];
    }
  }

  __camelName__.save((err, __camelName__) => {
    if (err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!__camelName__) {
      logger.error("ERROR: Could not create __PascalName__.");
      res.send({ success: false, message: "Could not create __PascalName__." });
    } else {
      logger.info("created new __camelName__");
      res.send({ success: true, __camelName__: __camelName__ });
    }
  });
}

exports.update = (req, res) => {
  logger.info('updating __camelName__');
  __PascalName__.findById(req.params.id).exec((err, __camelName__) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else if(!__camelName__) {
      logger.error("ERROR: __PascalName__ not found.");
      res.send({ success: false, message: "__PascalName__ not found." });
    } else {
      // run through and update all fields on the model
      for(var k in req.body) {
        if(req.body.hasOwnProperty(k)) {
          __camelName__[k] = req.body[k];
        }
      }
      // now edit the 'updated' date
      __camelName__.updated = new Date();
      __camelName__.save((err, __camelName__) => {
        if(err) {
          logger.error("ERROR:");
          logger.info(err);
          res.send({ success: false, message: err });
        } else if(!__camelName__) {
          logger.error("ERROR: Could not save __camelName__.");
          res.send({ success: false, message: "Could not save __camelName__."});
        } else {
          res.send({ success: true, __camelName__: __camelName__ });
        }
      });
    }
  });
}

exports.delete = (req, res) => {
  logger.warn("deleting __camelName__");
  __PascalName__.findById(req.params.id).remove((err) => {
    if(err) {
      logger.error("ERROR:");
      logger.info(err);
      res.send({ success: false, message: err });
    } else {
      res.send({ success: true, message: "Deleted __camelName__" });
    }
  });
}
