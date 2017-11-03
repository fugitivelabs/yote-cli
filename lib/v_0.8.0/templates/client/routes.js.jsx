// import primary libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// import __name__ layout
import __PascalName__Layout from './components/__PascalName__Layout.js.jsx';

// intialize __name__ routes here so we can import them via moduleRoutes
const __name__Routes =
  <Route
    component={__PascalName__Layout} 
    key={Math.floor(Math.random()*1000)}
    path="__kebabName__s"
  />
;

export default __name__Routes;
