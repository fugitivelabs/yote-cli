/**
 * View component for /__camelName__s/new
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
import _PascalName_Form from '../components/_PascalName_Form.js.jsx';
import _PascalName_Layout from '../components/_PascalName_Layout.js.jsx';

class Create_PascalName_ extends Binder {
  constructor(props) {
    super(props);
    this.state = {
      formHelpers: {}
      , __camelName__: _.cloneDeep(this.props.default_PascalName_.obj)
      // NOTE: ^ We don't want to actually change the store's defaultItem, just use a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(__camelName__Actions.fetchDefault_PascalName_());
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      __camelName__: _.cloneDeep(nextProps.default_PascalName_.obj)
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
    dispatch(__camelName__Actions.sendCreate_PascalName_(this.state.__camelName__)).then(__camelName__Res => {
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
      <_PascalName_Layout>
        <Breadcrumbs links={location.state.breadcrumbs} />
        {isEmpty ?
          <h2> Loading...</h2>
          :
          <_PascalName_Form
            __camelName__={__camelName__}
            cancelLink="/__camelName__s"
            formTitle="Create _PascalName_"
            formType="create"
            handleFormChange={this._handleFormChange}
            handleFormSubmit={this._handleFormSubmit}
          />
        }
      </_PascalName_Layout>
    )
  }
}

Create_PascalName_.propTypes = {
  dispatch: PropTypes.func.isRequired
}

const mapStoreToProps = (store) => {
  /**
  * NOTE: Yote refer's to the global Redux 'state' as 'store' to keep it mentally
  * differentiated from the React component's internal state
  */
  return {
    default_PascalName_: store.__camelName__.defaultItem
  }
}

export default withRouter(
  connect(
    mapStoreToProps
  )(Create_PascalName_)
);
