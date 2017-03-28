// import primary libraries
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import utilities
import Auth from '../../global/utils/auth';

// import __name__ components
import Create__PascalName__ from './components/Create__PascalName__.js.jsx';
import __PascalName__Layout from './components/__PascalName__Layout.js.jsx';
import __PascalName__List from './components/__PascalName__List.js.jsx';
import Single__PascalName__ from './components/Single__PascalName__.js.jsx';
import Update__PascalName__ from './components/Update__PascalName__.js.jsx';

// define __name__ routes
const __name__Routes =
<Route key={Math.floor(Math.random()*1000)} path="__kebabName__s" component={__PascalName__Layout} >
  <IndexRoute component={__PascalName__List} />
  <Route path="new" component={Create__PascalName__}  onEnter={Auth.requireLogin} />
  <Route path=":__camelName__Id">
    <IndexRoute component={Single__PascalName__} />
    <Route path="update" component={Update__PascalName__}  onEnter={Auth.requireLogin} />
  </Route>
</Route>
;

export default __name__Routes;
