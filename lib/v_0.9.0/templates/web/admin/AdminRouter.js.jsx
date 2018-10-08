/**
 * Sets up the routing for all __startName__ views.
 *
 * NOTE: As an example, we've included two other Route Components that protect a given
 * path: LoginRoute and RoleRoute
 *
 * LoginRoute simply checks if the user is logged in and if NOT, it redirects
 * them to the login page.
 *
 * RoleRoute protects the path to make sure the user is A) logged in and B) has
 * role matching the path=/admin/__kebabNamePlural__.
 */

// import primary libraries
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

// import global components
import Binder from '../../../global/Binder.js.jsx';
import YTRoute from '../../../global/routing/YTRoute.js.jsx';

// import __camelName__ views
import AdminCreate__PascalName__ from './views/AdminCreate__PascalName__.js.jsx';
import Admin__PascalName__List from './views/Admin__PascalName__List.js.jsx';
import AdminSingle__PascalName__ from './views/AdminSingle__PascalName__.js.jsx';
import AdminUpdate__PascalName__ from './views/AdminUpdate__PascalName__.js.jsx';

class __PascalName__AdminRouter extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    let single__PascalName__Path = this.props.location.pathname.replace('/update', '');
    return (
      <Switch>
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All __kebabNamePlural__', path: null }]}
          component={Admin__PascalName__List}
          exact
          path="/admin/__kebabNamePlural__"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All __kebabNamePlural__', path: '/admin/__kebabNamePlural__'}, {display: 'New ', path: null}]}
          component={AdminCreate__PascalName__}
          exact
          path="/admin/__kebabNamePlural__/new"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All __kebabNamePlural__', path: '/admin/__kebabNamePlural__'}, {display: '__startName__ details', path: null}]}
          component={AdminSingle__PascalName__}
          exact
          path="/admin/__kebabNamePlural__/:__camelName__Id"
          role="admin"
        />
        <YTRoute
          breadcrumbs={[{display: 'Dashboard', path: '/admin'}, {display: 'All __kebabNamePlural__', path: '/admin/__kebabNamePlural__'}, {display: '__startName__ Details', path: single__PascalName__Path}, {display: 'Update', path: null}]}
          component={AdminUpdate__PascalName__}
          exact
          path="/admin/__kebabNamePlural__/:__camelName__Id/update"
          role="admin"
        />
      </Switch>
    )
  }
}

export default __PascalName__AdminRouter;
