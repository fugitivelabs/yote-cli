/**
 * Updates a single __name__ from a copy of the selcted __name__
 * as defined in the __name__ reducer
 */

// import primary libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

// import third-party libraries
import _ from 'lodash';

// import actions
import * as __name__Actions from '../__name__Actions';

// import global components
import Base from "../../../global/components/BaseComponent.js.jsx";

// import module components
import __PascalName__Form from './__PascalName__Form.js.jsx';

class Update__PascalName__ extends Base {
  constructor(props) {
    super(props);
    const { selected__PascalName__, __name__Map } = this.props;
    this.state = {
      __name__: __name__Map[selected__PascalName__.id] ? JSON.parse(JSON.stringify(__name__Map[selected__PascalName__.id])) : {}
      // NOTE: we don't want to change the store, just make changes to a copy
    }
    this._bind(
      '_handleFormChange'
      , '_handleFormSubmit'
    );
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(__name__Actions.fetchSingleIfNeeded(params.__name__Id))
  }

  componentWillReceiveProps(nextProps) {
    const { selected__PascalName__, __name__Map } = nextProps;
    this.state = {
      __name__: __name__Map[selected__PascalName__.id] ? JSON.parse(JSON.stringify(__name__Map[selected__PascalName__.id])) : {}
      //we don't want to actually change the store's __name__, just use a copy
    }
  }

  _handleFormChange(e) {
    let new__PascalName__State = _.update( this.state.__name__, e.target.name, function() {
      return e.target.value;
    });
    this.setState({__name__ :new__PascalName__State});
  }

  _handleFormSubmit(e) {
    e.preventDefault();
    this.props.dispatch(__name__Actions.sendUpdate__PascalName__(this.state.__name__)).then((action) => {
      if(action.success) {
        browserHistory.push(`/__kebabName__s/${action.item._id}`)
      } else {
        // console.log("Response Error:");
        // console.log(action);
        alert("ERROR - Check logs");
      }
    });
  }

  render() {
    const { selected__PascalName__, __name__Map } = this.props;
    const { __name__ } = this.state;
    const isEmpty = (!__name__ || __name__._id === null || __name__._id === undefined);
    return  (
      <div className="flex">
        <section className="section">
          {isEmpty ?
            (selected__PascalName__.isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
            :
            <__PascalName__Form
              __name__={__name__}
              cancelLink={`/__kebabName__s/${__name__._id}`}
              formTitle="Update __PascalName__"
              formType="update"
              handleFormChange={this._handleFormChange}
              handleFormSubmit={this._handleFormSubmit}
            />
          }
        </section>
      </div>
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
    selected__PascalName__: store.__name__.selected
    , __name__Map: store.__name__.byId
  }
}

export default connect(
  mapStoreToProps
)(Update__PascalName__);
