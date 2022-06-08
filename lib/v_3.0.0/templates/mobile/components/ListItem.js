// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  Text
  , TouchableHighlight
  , View
} from 'react-native';

// import libraries

// Import tailwind with config
import tw from '../../../global/styles/tailwind/twrnc';

// import services
import { use__PascalName__FromMap } from '../__camelName__Service';

const FIXED_HEIGHT = 50; // required for infinite list to work

const __PascalName__ListItem = ({ id, onPress = () => { } }) => {
  // if this is being rendered then we already fetched the list so we know this __camelName__ exists in the map, no need to attempt to fetch it again
  const __camelName__ = use__PascalName__FromMap(id);

  if(!__camelName__) return <Skeleton />;

  return (
    <View style={[tw`flex`, { height: FIXED_HEIGHT}]}>
      <TouchableHighlight style={tw`p-2`} onPress={onPress}>
        <Text style={tw`text-lg font-semibold`}>{__camelName__?.name}</Text>
      </TouchableHighlight>
    </View>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <View style={[tw`flex`, { height: FIXED_HEIGHT}]}>
      <View style={tw`p-2`}>
        <Text style={tw`bg-gray-400 h-5 my-1 w-2/5`} />
      </View>
    </View>
  )
}
// add the skeleton to the component so we can access it in other components (__PascalName__List in this case)
__PascalName__ListItem.Skeleton = Skeleton;

__PascalName__ListItem.propTypes = {
  id: PropTypes.string.isRequired
  , onPress: PropTypes.func
}

export default __PascalName__ListItem;
