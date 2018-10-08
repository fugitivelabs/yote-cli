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
import __camelName__Styles from '../__camelName__Styles';
import YTColors from '../../../global/styles/YTColors';

class __PascalName__ListItem extends Binder {
  constructor(props){
    super(props);
  }

  render() {
    const { __camelName__, onPress } = this.props;

    var cell =
            <View style={__camelName__Styles.cell}>
              <Text style={__camelName__Styles.headerLeft}>{__camelName__.name}</Text>
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
  __camelName__: PropTypes.object
  , onPress: PropTypes.func
}

const mapStoreToProps = (store) => {

  return {
    userStore: store.user
  }
}

export default connect(mapStoreToProps)(__PascalName__ListItem);
