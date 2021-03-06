/**
 * View component for /__kebabNamePlural__/new
 *
 * Creates a new __camelName__ from a copy of the defaultItem in the __camelName__ reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { history, withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as __camelName__Actions from '../__camelName__Actions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import __camelName__ components
import __PascalName__Form from '../components/__PascalName__Form.js.jsx';
import __PascalName__Layout from '../components/__PascalName__Layout.js.jsx';

class Create__PascalName__ extends Base {
  constructor(props) {
    super(props);
    this.state = {
      __camelName__: _.cloneDeep(this.props.default__PascalName__)
      // NOTE: We don't want to actually change the store's defaultItem, just use a copy
      , formHelpers: {}
      /**
       * NOTE: formHelpers are useful for things like radio controls and other
       * things that manipulate the form, but don't directly effect the state of
       * the __camelName__
       */
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    let newState = _.update( this.state, e.target.name, () => {
      return e.target.value;
    });
    this.setState(newState);
  }


  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(__camelName__Actions.sendCreate__PascalName__(this.state.__camelName__)).then((action) => {
      if(action.success) {
        dispatch(__camelName__Actions.invalidateList());
        history.push(`/__kebabNamePlural__/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { __camelName__, formHelpers } = this.state;
    const isEmpty = (__camelName__.name === null || __camelName__.name === undefined);
    return (
      <__PascalName__Layout>
        <div className="flex">
          <section className="section">
            {isEmpty ?
              <h2> Loading...</h2>
              :
              <__PascalName__Form
                __camelName__={__camelName__}
                cancelLink="/__kebabNamePlural__"
                formHelpers={formHelpers}
                formTitle="Create __startName__"
                formType="create"
                handleFormChange={this._handleFormChange}
                handleFormSubmit={this._handleFormSubmit}
                />
            }
          </section>
        </div>
      </__PascalName__Layout>
    )
  }
}

Create__PascalName__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    default__PascalName__: store.__camelName__.defaultItem
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(Create__PascalName__)
);
