/**
 * Set up routing for all __PascalName__ views
 *
 * For an example with protected routes, refer to /product/ProductRouter.js.jsx
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import global components
import Base from "../../global/components/BaseComponent.js.jsx";
import { LoginRoute, RoleRoute } from '../../global/components/routing';

// import __camelName__ views
import Create__PascalName__ from './views/Create__PascalName__.js.jsx';
import __PascalName__List from './views/__PascalName__List.js.jsx';
import Single__PascalName__ from './views/Single__PascalName__.js.jsx';
import Update__PascalName__ from './views/Update__PascalName__.js.jsx';

class __PascalName__Router extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/__kebabNamePlural__" component={__PascalName__List} />
        <LoginRoute exact path="/__kebabNamePlural__/new" component={Create__PascalName__} />
        <Route exact path="/__kebabNamePlural__/:__camelName__Id" component={Single__PascalName__}/>
        <LoginRoute exact path="/__kebabNamePlural__/:__camelName__Id/update" component={Update__PascalName__}/>
      </Switch>
    )
  }
}

export default __PascalName__Router;
