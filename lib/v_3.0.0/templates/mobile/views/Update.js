/**
 * Will update an existing __camelName__ using the inputs on the __PascalName__Form
 */

// import react things
import React from 'react';

// import react-native components
import {
  ActivityIndicator
  , Alert
  , View
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import __PascalName__Form from '../components/__PascalName__Form';

// import services
import { useGetUpdatable__PascalName__ } from '../__camelName__Service';

// import styles
import tw from '../../../global/styles/tailwind/twrnc';

const Update__PascalName__ = () => {
  const route = useRoute();
  // get navigation obj so we can access goBack(); 
  const navigation = useNavigation();
  // get the __camelName__ id from the route. Below is equivalent to const { __camelName__Id } = this.props.navigation.state.params;
  // this component knows about __camelName__Id from declaring it in navigation stack in TabNavigator.js 
  const { __camelName__Id } = route.params;

  const { data: __camelName__, handleFormChange, handleFormSubmit, ...__camelName__Query } = useGetUpdatable__PascalName__(__camelName__Id, {
    // optional, callback function to run after the request is complete
    onResponse: (updated__PascalName__, error) => {
      if(error || !updated__PascalName__) {
        Alert.alert(error || 'Something went wrong');
      }
      // back to single __camelName__ view.
      navigation.goBack();
    }
  });

  const leftItem = {
    icon: require('../../../global/img/back.png')
    , layout: 'icon'
    , onPress: () => navigation.goBack()
  }

  return (
    // <WaitOn/> handles all of the isLoading, isError, etc stuff so we don't have to do the stuff above
    <View style={tw`flex-1`}>
      <YTHeader
        title='Update __PascalName__'
        leftItem={leftItem}
      />
      <WaitOn query={__camelName__Query} fallback={<ActivityIndicator />}>
        <__PascalName__Form
          __camelName__={__camelName__}
          disabled={__camelName__Query.isFetching}
          formType='update'
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </View>
  )
}

export default Update__PascalName__;
