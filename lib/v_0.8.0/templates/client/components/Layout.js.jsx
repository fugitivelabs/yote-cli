/**
 * Wraps all __PascalName__ components in a default view wrapper and sets up the
 * routing for all __PascalName__ CRUD actions.
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, Switch } from 'react-router-dom';


// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";
import DefaultLayout from "../../../global/components/DefaultLayout.js.jsx";

// import __name__ components
import Create__PascalName__ from './Create__PascalName__.js.jsx';
import __PascalName__List from './__PascalName__List.js.jsx';
import Single__PascalName__ from './Single__PascalName__.js.jsx';
import Update__PascalName__ from './Update__PascalName__.js.jsx';


class __PascalName__Layout extends Base {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DefaultLayout>
        <Switch >
          <Route exact path="/__kebabName__s" component={__PascalName__List} />
          <Route
            path="/__kebabName__s/new"
            render={() => (
              Auth.notLoggedIn() ?
                <Redirect to={{
                    pathname: "/user/login"
                    , state: { from: this.props.location }
                  }}
                />
              :
                <Create__PascalName__ />
            )}
          />
          <Route
            path="/__kebabName__s/:__camelName__Id/update"
            render={() => (
              Auth.notLoggedIn() ?
                <Redirect to={{
                    pathname: "/user/login"
                    , state: { from: this.props.location }
                  }}
                />
              :
                <Update__PascalName__ />
            )}
          />
          <Route path="/__kebabName__s/:__camelName__Id" component={Single__PascalName__}/>
        </Switch>
      </DefaultLayout>
    )
  }
}

export default __PascalName__Layout;
