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
  , TouchableHighlight
  , View
} from 'react-native';

// import global components
import Binder from '../../../global/Binder';
import YTButton from '../../../global/buttons/YTButton';

// import libraries
import moment from 'moment';

// import styles
import YTStyles from '../../../global/styles/YTStyles';

class __PascalName__ListItem extends Binder {
  constructor(props){
    super(props);
  }

  render() {
    const { __camelName__, onPress } = this.props;

    var cell =
            <View style={YTStyles.cell}>
              <Text style={YTStyles.text}>{__camelName__.name}</Text>
            </View>;

    if(this.props.onPress) {
      cell =
        <TouchableHighlight underlayColor={YTStyles.colors.underlay} onPress={this.props.onPress}>
          {cell}
        </TouchableHighlight>
    }
    return cell;
  }
}

const mapStoreToProps = (store) => {

  return {
    userStore: store.user
  }
}

export default connect(mapStoreToProps)(__PascalName__ListItem);
