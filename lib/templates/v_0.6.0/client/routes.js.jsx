

import React from 'react';
import { Route, IndexRoute } from 'react-router';

//import Components
import Layout from './components/__Proper__Layout.js.jsx';
import List from './components/__Proper__List.js.jsx';
import Single from './components/Single__Proper__.js.jsx';
import Create from './components/Create__Proper__.js.jsx';
import Update from './components/Update__Proper__.js.jsx';

const __name__Routes =
<Route path="/__name__s" component={Layout} >
  <IndexRoute component={List} />
  <Route path="/__name__s/new" component={Create} />
  <Route path="/__name__s/:__name__Id">
    <IndexRoute component={Single} />
    <Route path="/__name__s/:__name__Id/update" component={Update} />
  </Route>
</Route>

;

export default __name__Routes;
