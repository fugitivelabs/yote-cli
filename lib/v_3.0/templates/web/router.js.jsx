/**
 * Set up routing for all __PascalName__ views
 *
 * For an example with protected routes, refer to /product/ProductRouter.js.jsx
 */

// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import global components
import Binder from '../../global/components/Binder.js.jsx';
import YTRoute from '../../global/components/routing/YTRoute.js.jsx';

// import __camelName__ views
import Create__PascalName__ from './views/Create__PascalName__.js.jsx';
import __PascalName__List from './views/__PascalName__List.js.jsx';
import Single__PascalName__ from './views/Single__PascalName__.js.jsx';
import Update__PascalName__ from './views/Update__PascalName__.js.jsx';

class __PascalName__Router extends Binder {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <YTRoute exact path="/__kebabNamePlural__" component={__PascalName__List} />
        <YTRoute exact login={true} path="/__kebabNamePlural__/new" component={Create__PascalName__} />
        <YTRoute exact path="/__kebabNamePlural__/:__camelName__Id" component={Single__PascalName__}/>
        <YTRoute exact login={true} path="/__kebabNamePlural__/:__camelName__Id/update" component={Update__PascalName__}/>
      </Switch>
    )
  }
}

export default __PascalName__Router;
