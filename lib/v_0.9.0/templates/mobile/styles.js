// __camelName__ styles

// import react things
import {
  Dimensions
  , Platform
  , StyleSheet
} from 'react-native';

// import common styles
import common from '../../global/styles/YTStyles'; 

// import colors
import YTColors from '../../global/styles/YTColors';

const { height, width } = Dimensions.get('window');

let __camelName__Styles = StyleSheet.create({

  // common styles
  cell: common.cell
  , container: common.container
  , header: common.header
  , header2: common.header2
  , listSeparator: common.separator
  , icon: common.icon
  , input: common.input
  , shadow: common.shadow
  , subHeader: common.subHeader
  , text: common.text
  , userImg: common.userImg

  // resource specific modules
  , cardHeader: {
    fontSize: 16
    , fontWeight: '500'
    , color: "#fff"
    , padding: 8
    , backgroundColor: YTColors.actionText
  }
  , cell: {
      padding: 5
    }
  , cellColumn: {
      flex: 1
      , justifyContent: 'center'
    }
  , cellForwardImg: {
      justifyContent: 'center'
      , paddingHorizontal: 10
    }
  , cellRow: {
      flex: 1
      , flexDirection: 'row'
      , margin: 5
    }
  , comment: {
      backgroundColor: '#fff'
      , padding: 10
      , margin: 5
      , flex: 1
      , justifyContent: 'space-between'
    }
  , content: {
      color: YTColors.darkText
      , textAlign: 'left'
      , padding: 10
      , fontSize: 20
    }
  , description: {
      fontSize: 15
      , color: YTColors.lightText
    }
  , details: {
      height: 52
      , textAlign: 'center'
      , fontWeight: '500'
      , flex: 1
      , fontSize: 17
      , paddingTop: 8
      , paddingBottom: 8
    }
  , emptyMessage: {
      fontSize: 12
      , textAlign: 'left'
      , fontStyle: "italic"
      , color: YTColors.lightText
    }
  , headerLeft: {
      fontSize: 25
    }
  , info: {
      fontSize: 15
      , textAlign: 'left'
      , padding: 10
      , color: YTColors.lightText
    }
  , infoBox: {
      backgroundColor: 'white'
      , padding: 8
    }
  , instructions: {
      color: YTColors.lightText
      , textAlign: 'center'
      , marginBottom: 5
    }
  , label: {
      fontSize: 12
      , color: YTColors.actionText
    }
  , newProductHeader: {
      fontSize: 16
      , textAlign: 'center'
      , color: "#fff"
      , padding: 4
      , backgroundColor: YTColors.lightText
    }
  , scrollView: {
      marginBottom: 50
    }
});

export default __camelName__Styles;
