import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Components
import __Proper__Layout from './components/__Proper__Layout.js.jsx';
import __Proper__List from './components/__Proper__List.js.jsx';
import Single__Proper__ from './components/Single__Proper__.js.jsx';
import Create__Proper__ from './components/Create__Proper__.js.jsx';
import Update__Proper__ from './components/Update__Proper__.js.jsx';

const __name__Routes =
<Route key={Math.floor(Math.random()*1000)} path="/__name__s" component={__Proper__Layout} >
  <IndexRoute component={__Proper__List} />
  <Route path="/__name__s/new" component={Create__Proper__} />
  <Route path="/__name__s/:__name__Id">
    <IndexRoute component={Single__Proper__} />
    <Route path="/__name__s/:__name__Id/update" component={Update__Proper__} />
  </Route>
</Route>
;

export default __name__Routes;
