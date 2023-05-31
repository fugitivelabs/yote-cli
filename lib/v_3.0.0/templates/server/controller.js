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
const __PascalName__ = require('./__PascalName__Model');
const YoteError = require('../../global/helpers/YoteError');
const apiUtils = require('../../global/api/apiUtils')

// TODO: in theory, we could split "controller" into single/many/utils files
// any utility functions (internal facing only)

// single api functions
exports.getSingleById = async (req, res) => {
  const __camelName__ = await __PascalName__.findById(req.params.id).catch(err => {
    console.log(err);
    throw new YoteError("Error finding __PascalName__", 404);
  });
  if(!__camelName__) throw new YoteError("Could not find matching __PascalName__", 404);
  res.json(__camelName__);
}

exports.createSingle = async (req, res) => {
  let new__PascalName__ = new __PascalName__(req.body);
  const __camelName__ = await new__PascalName__.save().catch(err => {
    console.log(err);
    throw new YoteError("Error creating __PascalName__", 404);
  });
  res.json(__camelName__);
}

exports.updateSingleById = async (req, res) => {
  let old__PascalName__ = await __PascalName__.findById(req.params.id).catch(err => {
    console.log(err);
    throw new YoteError("Error finding __PascalName__", 404);
  });
  if(!old__PascalName__) throw new YoteError("Could not find matching __PascalName__", 404);
  old__PascalName__ = Object.assign(old__PascalName__, req.body);
  const __camelName__ = await old__PascalName__.save().catch(err => {
    console.log(err);
    throw new YoteError("Could not update __PascalName__", 404);
  });
  res.json(__camelName__);
}

exports.deleteSingle = async (req, res) => {
  const old__PascalName__ = await __PascalName__.findById(req.params.id).catch(err => {
    console.log(err);
    throw new YoteError("Error finding __PascalName__", 404);
  });
  if(!old__PascalName__) throw new YoteError("Could not find matching __PascalName__", 404);
  const deleted__PascalName__ = await old__PascalName__.remove().catch(err => {
    console.log(err);
    throw new YoteError("There was a problem deleting this __PascalName__", 404);
  });
  // console.log('__camelName__ deleted', deleted__PascalName__);
  // return the deleted __camelName__
  res.json(deleted__PascalName__);
}

exports.getDefault = async (req, res) => {
  const default__PascalName__ = await __PascalName__.getDefault();
  res.json(default__PascalName__);
}

// list api functions
exports.getListWithArgs = async (req, res) => {
  const { query, pagination, sort, limit } = apiUtils.buildMongoQueryFromUrlQuery(req.query);
  const { __camelNamePlural__, totalPages, totalCount } = await utilFetch__PascalName__List({ query, pagination, sort, limit });
  res.json({ __camelNamePlural__, totalPages, totalCount });
}

// FETCH UTILS
const utilFetch__PascalName__List = async ({ query, pagination, sort, limit }) => {
  // get count so we can determine total pages for front end to allow proper pagination on client
  const totalCount = pagination ? await __PascalName__.countDocuments(query) : null
  const totalPages = totalCount && Math.ceil(totalCount / pagination.per)
  const __camelNamePlural__ = await __PascalName__.find(query)
    .skip(pagination ? (pagination.page - 1) * pagination.per : null)
    .limit(pagination ? pagination.per : (limit || 500))
    .sort(sort)
    .catch(err => {
      console.log(err);
      throw new YoteError("There was a problem finding __PascalName__ list", 404);
    });
  return { __camelNamePlural__, totalPages, totalCount };
}