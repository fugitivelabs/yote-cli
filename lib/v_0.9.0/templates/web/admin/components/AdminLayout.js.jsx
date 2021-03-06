/**
 * Wraps all __PascalName__ components in a default container. If you want to
 * give all __PascalName__ views a sidebar for example, you would set that here.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';

// import global components
import Binder from '../../../../global/components/Binder.js.jsx';
import AdminLayout from '../../../../global/admin/components/AdminLayout.js.jsx';

class Admin__PascalName__Layout extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <AdminLayout>
        {this.props.children}
      </AdminLayout>
    )
  }
}

export default Admin__PascalName__Layout;
