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
import ActionButton from '../../../global/buttons/ActionButton';
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';

// import libraries
import moment from 'moment';
import _ from 'lodash';

// import actions
import * as __camelName__Actions from '../__camelName__Actions';

// import styles
import YTStyles from '../../../global/styles/YTStyles';

class Single__PascalName__ extends Binder {
  constructor(props){
    super(props);
    this._bind(
      '_closeModal'
      , '_openUpdateProduct'
    )
  }

  componentDidMount() {
    const { __camelName__ } = this.props.navigation.state.params;
    this.props.dispatch(__camelName__Actions.fetchSingle__PascalName__ById(__camelName__._id));
  }

  _closeModal() {
    this.props.navigation.goBack();
  }

  _openUpdateProduct() {
    // console.log("open update __camelName__");
    const { __camelName__ } = this.props.navigation.state.params;
    this.props.navigation.navigate('Update__PascalName__', {__camelName__Id: __camelName__});
  }

  render() {
    const { __camelName__Store } = this.props;
    const { __camelName__ } = this.props.navigation.state.params;
    // console.log(__camelName__);

    const leftItem = {
      icon: require('../../../global/img/back.png'),
      layout: 'icon',
      onPress: this._closeModal,
    }

    const rightItem = {
      title: "Edit",
      onPress: this._openUpdateProduct,
    };

    return(
      <View style={YTStyles.container}>
        <YTHeader
          leftItem={leftItem}
          title={'Single __startName__'}
        />
        <ScrollView>
          <View style={YTStyles.cell}>
            <Text style={[YTStyles.h2, {paddingHorizontal: 10}]}>Single __PascalName__ </Text>
          </View>
          <View style={YTStyles.cell}>
            <Text style={[YTStyles.text, {paddingHorizontal: 10}]}>Display __camelName__ content here </Text>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStoreToProps = (store) => {

  return {
    userStore: store.user
    , __camelName__Store: store.__camelName__
  }
}

export default connect(mapStoreToProps)(Single__PascalName__);
