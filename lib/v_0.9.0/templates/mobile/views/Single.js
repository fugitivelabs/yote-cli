/**
 * Displays a single __camelName__ by the __camelName__Id sent from props and the __camelName__Store
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
import * as __camelName__Actions from '../__camelName__Actions';

// import styles
import __camelName__Styles from '../__camelName__Styles';
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
    const { __camelName__Id } = this.props.navigation.state.params;
    this.props.dispatch(__camelName__Actions.fetchSingle__PascalName__ById(__camelName__Id));
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openEdit() {
    // console.log("open update __camelName__");
    const { __camelName__Id } = this.props.navigation.state.params;
    this.props.navigation.navigate('Update__PascalName__', {__camelName__Id: __camelName__Id});
  }

  render() {
    const { __camelName__Store } = this.props;
    const { __camelName__Id } = this.props.navigation.state.params;
    let __camelName__ = __camelName__Store.byId[__camelName__Id];
    // console.log(__camelName__);

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
      <View style={__camelName__Styles.container}>
        <YTHeader
          leftItem={leftItem}
          title={'Single __startName__'}
        />
        <ScrollView>
          <View style={__camelName__Styles.cell}>
            <Text style={[{padding: 5}]}>Single __PascalName__ </Text>
          </View>
          <View style={__camelName__Styles.cell}>
            <Text style={[__camelName__Styles.headerLeft, {padding: 5}]}>{__camelName__.name} </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

Single__PascalName__.propTypes = {
  __camelName__Id: PropTypes.string
}

const mapStoreToProps = (store) => {

  return {
    userStore: store.user
    , __camelName__Store: store.__camelName__
  }
}

export default connect(mapStoreToProps)(Single__PascalName__);
