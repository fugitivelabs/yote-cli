/**
 * View component for /__kebabNamePlural__/new
 *
 * Creates a new __camelName__ from a copy of the defaultItem in the __camelName__ reducer
 */

// import primary libraries
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as __camelName__Actions from '../__camelName__Actions';

// import global components
import Binder from '../../../global/components/Binder.js.jsx';
import Breadcrumbs from '../../../global/components/navigation/Breadcrumbs.js.jsx';

// import __camelName__ components
import __PascalName__Form from '../components/__PascalName__Form.js.jsx';
import __PascalName__Layout from '../components/__PascalName__Layout.js.jsx';

class Create__PascalName__ extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      formHelpers: {}
      , __camelName__: _.cloneDeep(this.props.default__PascalName__.obj)
      // NOTE: ^ We don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(__camelName__Actions.fetchDefault__PascalName__());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      __camelName__: _.cloneDeep(nextProps.default__PascalName__.obj)
    })
  }

  _handleFormChange(e) {
    /**
     * This let's us change arbitrarily nested objects with one pass
     */
    let newState = _.update(this.state, e.target.name, function() {
      return e.target.value;
    });
    this.setState({newState});
  }


  _handleFormSubmit(e) {
    const { dispatch, history } = this.props;
    e.preventDefault();
    dispatch(__camelName__Actions.sendCreate__PascalName__(this.state.__camelName__)).then(__camelName__Res => {
      if(__camelName__Res.success) {
        dispatch(__camelName__Actions.invalidateList("all"));
        history.push(`/__camelName__s/${__camelName__Res.item._id}`)
      } else {
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { location } = this.props;
    const { __camelName__ } = this.state;
    const isEmpty = !__camelName__;
    return (
      <__PascalName__Layout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        {isEmpty ?
          <h2> Loading...</h2>
          :
          <__PascalName__Form
            __camelName__={__camelName__}
            cancelLink="/__camelName__s"
            formTitle="Create __PascalName__"
            formType="create"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
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
