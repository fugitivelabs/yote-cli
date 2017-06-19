/**
* Displays a single __name__ by the __name__Id sent from props and the __name__Map from store
*/

// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Alert from 'Alert';
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import ScrollView from 'ScrollView';
import Text from 'Text';
import TextInput from 'TextInput';
import TouchableOpacity from 'TouchableOpacity';
import View from 'View';

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
    const { __name__Id } = this.props;
    this.props.dispatch(__name__Actions.fetchSingle__PascalName__ById(__name__Id));
  }

  _closeModal() {
    this.props.navigator.pop();
  }

  _openEdit() {
    console.log("open update __name__");
    this.props.navigator.push({update__PascalName__: true});
  }

  render() {
    const { __name__Id, __name__Map } = this.props;
    let __name__ = __name__Map[__name__Id];

    const leftItem = {
      icon: require('../../../global/components/img/back.png'),
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
          title={__name__.title}
          rightItem={rightItem}
        />
        <View style={__name__Styles.cell}>
          <View style={__name__Styles.infoBox}>
            <Text style={__name__Styles.headerLeft}>{__name__.title} </Text>
            <View style={__name__Styles.listSeparator}/>
            <Text style={__name__Styles.description}>{__name__.description}</Text>
            <Text style={__name__Styles.description}>Created: {moment(__name__.created).format("MMMM Do YYYY, h:mm a")}</Text>
            <Text style={__name__Styles.description}>Id: {__name__._id}</Text>
          </View>
        </View>
        <View style={{padding: 10}}>
          <YTButton
            onPress={null}
            caption={"Yote Button!"}
          />
        </View>
        <View style={{padding: 10}}>
          <ActionButton
            onPress={null}
            caption={"Action Button!"}
            style={{backgroundColor: '#31ce7c'}}
          />
        </View>
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
