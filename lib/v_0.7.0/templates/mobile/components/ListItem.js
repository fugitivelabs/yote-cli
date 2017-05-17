// import react things
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Dimensions from 'Dimensions';
import Image from 'Image';
import ListView from 'ListView';
import Platform from 'Platform';
import StyleSheet from 'StyleSheet';
import Text from 'Text';
import View from 'View';

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
    let icon = <Image source={require('../../../global/img/breast.png')} />;

    var cell =
            <View style={__name__Styles.cell}>
              <View style ={__name__Styles.cellBackground}>
                <Text style={__name__Styles.cardHeader}>{__name__.title} </Text>
                <View style={__name__Styles.cellRow}>
                  <View style={__name__Styles.cellColumn}>
                    <Text style={__name__Styles.emptyMessage}>{__name__.description} </Text>
                    <Text style={__name__Styles.emptyMessage}>Created: {moment(__name__.created).format("MMMM Do YYYY, h:mm a")}</Text>
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
