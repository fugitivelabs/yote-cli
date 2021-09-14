/**
 * Sets up the routing for all __PascalName__ views.
 */

// import primary libraries
import React from 'react'
import { Switch, useLocation } from 'react-router-dom'

// import global components
import YTRoute from '../../global/components/routing/YTRoute.jsx'

// import __camelName__ views
import Create__PascalName__ from './views/Create__PascalName__.jsx'
import __PascalName__List from './views/__PascalName__List.jsx'
import Single__PascalName__ from './views/Single__PascalName__.jsx'
import Update__PascalName__ from './views/Update__PascalName__.jsx'

const __PascalName__Router = () => {
  const location = useLocation()
  const __camelName__Id = location.pathname.split('/')[1]
  return (
    <Switch>
      <YTRoute
        breadcrumbs={[{display: 'All __camelNamePlural__', path: null }]}
        component={__PascalName__List}
        exact
        // login={true}
        path='/__kebabNamePlural__'
      />
      <YTRoute
        breadcrumbs={[{display: 'All __camelNamePlural__', path: '/__kebabNamePlural__'}, {display: 'New ', path: null}]}
        component={Create__PascalName__}
        exact
        // login={true}
        path='/__kebabNamePlural__/new'
      />
      <YTRoute
        breadcrumbs={[{display: 'All __camelNamePlural__', path: '/__kebabNamePlural__'}, {display: '__PascalName__ details', path: null}]}
        component={Single__PascalName__}
        // login={true}
        exact
        path='/__kebabNamePlural__/:__camelName__Id'
      />
      <YTRoute
        breadcrumbs={[{display: 'All __camelNamePlural__', path: '/__kebabNamePlural__'}, {display: '__PascalName__ Details', path: `/__kebabNamePlural__/${__camelName__Id}`}, {display: 'Update', path: null}]}
        component={Update__PascalName__}
        exact
        // login={true}
        path='/__kebabNamePlural__/:__camelName__Id/update'
        // role='admin'
      />
    </Switch>
  )
}

export default __PascalName__Router
