// import primary libraries
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import utilities
import Auth from '../../global/utils/auth';

// import __name__ components
import Create__Proper__ from './components/Create__Proper__.js.jsx';
import __Proper__Layout from './components/__Proper__Layout.js.jsx';
import __Proper__List from './components/__Proper__List.js.jsx';
import Single__Proper__ from './components/Single__Proper__.js.jsx';
import Update__Proper__ from './components/Update__Proper__.js.jsx';

// define __name__ routes
const __name__Routes =
<Route key={Math.floor(Math.random()*1000)} path="__kebabName__s" component={__Proper__Layout} >
  <IndexRoute component={__Proper__List} />
  <Route path="new" component={Create__Proper__}  onEnter={Auth.requireLogin} />
  <Route path=":__camelName__Id">
    <IndexRoute component={Single__Proper__} />
    <Route path="update" component={Update__Proper__}  onEnter={Auth.requireLogin} />
  </Route>
</Route>
;

export default __name__Routes;
