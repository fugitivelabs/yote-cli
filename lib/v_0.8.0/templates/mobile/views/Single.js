/**
 * Displays a single __name__ by the __name__Id sent from props and the __name__Map from store
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Alert
  , Dimensions
  , Image
  , ListView
  , Platform
  , ScrollView
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native';

// import global components
import ActionButton from '../../../global/components/ActionButton';
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTHeader from '../../../global/components/YTHeader';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as __name__Actions from '../__name__Actions';

// import styles
import __name__Styles from '../__name__Styles';
import YTColors from '../../../global/styles/YTColors';

class Single__PascalName__ extends Base {
  constructor(props){
    super(props);
    this._bind(
      '_closeModal'
      , '_openEdit'
    )
  }

  componentDidMount() {
    const { __name__Id } = this.props.navigation.state.params;
    this.props.dispatch(__name__Actions.fetchSingle__PascalName__ById(__name__Id));
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openEdit() {
    // console.log("open update __name__");
    const { __name__Id } = this.props.navigation.state.params;
    this.props.navigation.navigate('Update__PascalName__', {__name__Id: __name__Id});
  }

  render() {
    const { __name__Map } = this.props;
    const { __name__Id } = this.props.navigation.state.params;
    let __name__ = __name__Map[__name__Id];
    // console.log(__name__);

    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._closeModal,
    }

    const rightItem = {
      title: "Edit",
      onPress: this._openEdit,
    };

    return(
      <View style={__name__Styles.container}>
        <YTHeader
          leftItem={leftItem}
          title={'Single __startName__'}
          rightItem={rightItem}
        />
        <ScrollView>
          <View style={__name__Styles.cell}>
            <View style={__name__Styles.infoBox}>
              <Text style={[__name__Styles.headerLeft, {paddingBottom: 5}]}>{__name__.name} </Text>
              <View style={__name__Styles.listSeparator}/>
              <View style={{paddingVertical: 5}}>
                <View style={{paddingVertical: 10}}>
                  <Text style={__name__Styles.label}>Created: {moment(__name__.created).format("MMMM Do YYYY, h:mm a")}</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

Single__PascalName__.propTypes = {
  __name__Id: PropTypes.string
}

const mapStoreToProps = (store) => {

  return {
    user: store.user.loggedIn.user
    , __name__Map: store.__name__.byId
  }
}

export default connect(mapStoreToProps)(Single__PascalName__);
