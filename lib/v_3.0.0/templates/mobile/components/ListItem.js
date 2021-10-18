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
import ListItem from '../../../global/components/base/ListItem';

// import libraries

// import styles
import YTStyles from '../../../global/styles/YTStyles';
import { tailwind, getColor } from '../../../global/styles/tailwind/tailwind.js'; 

// import services
import { useGet__PascalName__ById } from '../__camelName__Service';

const __PascalName__ListItem = ({ id, navigation }) => {
  const { data: __camelName__, ...__camelName__Query } = useGet__PascalName__ById(id);

  if(__camelName__Query.isLoading) return <Skeleton />
  if(__camelName__Query.isError) return <ListItem>An error occurred 😬 <YTButton onPress={__camelName__Query.refetch}>Refetch</YTButton></ListItem>
  if(!__camelName__) return <ListItem>No __camelName__ found</ListItem>

  return (
    <ListItem style={{opacity: __camelName__Query.isFetching ? 0.5 : ''}}>
      <TouchableHighlight onPress={() => navigation.navigate('Single__PascalName__', {__camelName__Id: id})}>
        <View>
          <Text>{__camelName__.title}</Text>
          <Text>{__camelName__.description}</Text>
        </View>
      </TouchableHighlight>
    </ListItem>
  )
}

// custom loading skeleton for this component, by defining it right here we can keep it synced with any changes we make to the actual component above
const Skeleton = () => {
  return (
    <ListItem className="animate-pulse">
      <Text>Loading</Text>
    </ListItem>
  )
}
// add the skeleton to the component so we can access it in other components (__PascalName__List in this case)
__PascalName__ListItem.Skeleton = Skeleton;

__PascalName__ListItem.propTypes = {
  id: PropTypes.string.isRequired
}

export default __PascalName__ListItem;
