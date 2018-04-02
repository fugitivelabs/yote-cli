/**
 * View component for /__kebabNamePlural__/:__camelName__Id/update
 *
 * Updates a single __camelName__ from a copy of the selcted __camelName__
 * as defined in the __camelName__ reducer
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

// import module components
import __PascalName__Form from '../components/__PascalName__Form.js.jsx';
import __PascalName__Layout from '../components/__PascalName__Layout.js.jsx';

// import __camelName__ css modules
import __camelName__Styles from '../__camelName__ModuleStyles.css';

class Update__PascalName__ extends Base {
  constructor(props) {
    super(props);
    const { selected__PascalName__, __camelName__Map } = this.props;
    this.state = {
      __camelName__: __camelName__Map[selected__PascalName__.id] ?  _.cloneDeep(__camelName__Map[selected__PascalName__.id]) : {}
      // NOTE: we don't want to change the store, just make changes to a copy
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

  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(__camelName__Actions.fetchSingleIfNeeded(match.params.__camelName__Id))
  }

  componentWillReceiveProps(nextProps) {
    const { selected__PascalName__, __camelName__Map } = nextProps;
    this.setState({
      __camelName__: __camelName__Map[selected__PascalName__.id] ? _.cloneDeep(__camelName__Map[selected__PascalName__.id]) : {}
      //we don't want to actually change the store's __camelName__, just use a copy
      , formHelpers: {}
    })
  }

  _handleFormChange(e) {
    let newState = _.update( this.state, e.target.name, function() {
      return e.target.value;
    });
    this.setState(newState);
  }

  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(__camelName__Actions.sendUpdate__PascalName__(this.state.__camelName__)).then((action) => {
      if(action.success) {
        history.push(`/__kebabNamePlural__/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { selected__PascalName__, __camelName__Map } = this.props;
    const { __camelName__, formHelpers } = this.state;
    const isEmpty = (!__camelName__ || __camelName__._id === null || __camelName__._id === undefined);
    return  (
      <__PascalName__Layout>
        <div className="flex">
          <section className="section">
            {isEmpty ?
              (selected__PascalName__.selected.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
              :
              <__PascalName__Form
                __camelName__={__camelName__}
                cancelLink={`/__kebabNamePlural__/${__camelName__._id}`}
                formHelpers={formHelpers}
                formTitle="Update __startName__"
                formType="update"
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

Update__PascalName__.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    selected__PascalName__: store.__camelName__.selected
    , __camelName__Map: store.__camelName__.byId
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(Update__PascalName__)
);
