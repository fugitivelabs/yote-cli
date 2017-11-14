// import react things
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import react-native components
import {
  Dimensions
  , Image
  , ListView
  , Platform
  , StyleSheet
  , Text
  , View
} from 'react-native'; 

// import global components
import Base from '../../../global/components/BaseComponent';
import YTButton from '../../../global/components/YTButton';
import YTTouchable from '../../../global/components/YTTouchable';

// import libraries
import moment from 'moment';

// import styles
import __name__Styles from '../__name__Styles'; 
import YTColors from '../../../global/styles/YTColors';

class __PascalName__ListItem extends Base {
  constructor(props){
    super(props);
  }

  render() {
    const { __name__, onPress } = this.props;

    var cell =
            <View style={__name__Styles.cell}>
              <View style ={__name__Styles.cellBackground}>
                <View style={{padding: 5}}>
                  <Text style={__name__Styles.headerLeft}>{__name__.name} </Text>
                  <View style={__name__Styles.listSeparator}/>
                </View>
                <View style={__name__Styles.cellRow}>
                  <View style={__name__Styles.cellColumn}>
                    <Text style={__name__Styles.label}>Created: {moment(__name__.created).format("MMMM Do YYYY, h:mm a")}</Text>
                  </View>
                  <View style={__name__Styles.cellForwardImg}>
                    <Image
                      source={require('../../../global/img/forward.png')}
                    />
                  </View>
                </View>
              </View>
            </View>;

    if(this.props.onPress) {
      cell =
        <YTTouchable onPress={this.props.onPress}>
          {cell}
        </YTTouchable>
    }

    return cell;

  }

}

__PascalName__ListItem.propTypes = {
  __name__: PropTypes.object
  , onPress: PropTypes.func
}

const mapStoreToProps = (store) => {
  const user = store.user.loggedIn.user;

  return {
    user: user
  }
}

export default connect(mapStoreToProps)(__PascalName__ListItem);
