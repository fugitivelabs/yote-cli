// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import _ from 'lodash';
import { DateTime } from 'luxon';

const Admin__PascalName__ListItem = ({
  __camelName__
}) => {
  return (
    <tr >
      <td><Link to={`/admin/__kebabNamePlural__/${__camelName__._id}`}>{__camelName__.name}</Link></td>
      <td>{DateTime.fromISO(__camelName__.updated).toLocaleString(DateTime.DATETIME_SHORT)}</td>
      <td className="u-textRight"><Link to={`/admin/__kebabNamePlural__/${__camelName__._id}/update`}>Update</Link></td>
    </tr>
  )
}

Admin__PascalName__ListItem.propTypes = {
  __camelName__: PropTypes.object.isRequired
}

export default Admin__PascalName__ListItem;
