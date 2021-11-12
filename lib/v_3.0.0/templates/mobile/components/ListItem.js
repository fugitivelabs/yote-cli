// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  Dimensions
  , Image
  , Platform
  , Text
  , TouchableHighlight
  , View
} from 'react-native'; 

// import global components
import YTButton from '../../../global/buttons/YTButton';
import WaitOn from '../../../global/components/helpers/WaitOn'; 

// import libraries

// import styles
import YTStyles from '../../../global/styles/YTStyles';

// import services
import { useGet__PascalName__ById } from '../__camelName__Service';

const __PascalName__ListItem = ({ id, navigation }) => {
  const { data: __camelName__, ...__camelName__Query } = useGet__PascalName__ById(id);

  return (
    <WaitOn query={__camelName__Query} fallback={<Skeleton/>}>
      <View style={{flex: 1, opacity: __camelName__Query.isFetching ? 0.5 : 1}}>
        <TouchableHighlight onPress={() => navigation.navigate('Single__PascalName__', {__camelName__Id: id})}>
          <View>
            <Text>{__camelName__.name}</Text>
            {/* <Text>{__camelName__.description}</Text> */}
          </View>
        </TouchableHighlight>
      </View>
    </WaitOn>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <View >
      <Text>Loading</Text>
    </View>
  )
}
// add the skeleton to the component so we can access it in other components (__PascalName__List in this case)
__PascalName__ListItem.Skeleton = Skeleton;

__PascalName__ListItem.propTypes = {
  id: PropTypes.string.isRequired
  , navigation: PropTypes.object.isRequired
}

export default __PascalName__ListItem;
