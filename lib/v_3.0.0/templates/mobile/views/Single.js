/**
 * Displays a single __camelName__ by the __camelName__Id sent from props and the __camelName__Map from store
 */

// import react things
import React from 'react';
import PropTypes from 'prop-types';

// import react-native components
import {
  ScrollView
  , Text
  , View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTButton from '../../../global/buttons/YTButton';
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import services
import { useGet__PascalName__ById } from '../__camelName__Service';

// import styles
import tw from '../../../global/styles/tailwind/twrnc';

const Single__PascalName__ = () => {
  // get route state. Below is equivalent to getting navigation obj to access params
  const route = useRoute();
  // get navigation obj so we can access goBack(); 
  const navigation = useNavigation();

  // get the __camelName__ id from the route. Below is equivalent to const { __camelName__Id } = this.props.navigation.state.params;
  // this component knows about __camelName__Id from declaring it in navigation stack in TabNavigator.js 
  const { __camelName__Id } = route.params;

  // get the __camelName__ from the store (or fetch it from the server)
  const { data: __camelName__, ...__camelName__Query } = useGet__PascalName__ById(__camelName__Id);

  const leftItem = {
    icon: require('../../../global/img/back.png')
    , layout: 'icon'
    , onPress: () => navigation.goBack()
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <YTHeader
        title='Single __PascalName__'
        leftItem={leftItem}
      />
      <WaitOn query={__camelName__Query} fallback={<Skeleton />}>
        <ScrollView style={{ opacity: __camelName__Query.isFetching ? 0.5 : null }}>
          <View style={tw`p-4`}>
            <Text style={tw`text-lg`}>{__camelName__?.name}</Text>
          </View>
          <View style={tw`p-4`}>
            <YTButton
              caption={"Edit"}
              onPress={() => navigation.navigate('Update__PascalName__', { __camelName__Id: __camelName__._id })}
            />
          </View>
        </ScrollView>
      </WaitOn>
    </View>
  )
}

const Skeleton = () => {
  return (
    <View>
      <Text>Loading</Text>
    </View>
  )
}

Single__PascalName__.propTypes = {
  __camelName__Id: PropTypes.string
}

export default Single__PascalName__;
