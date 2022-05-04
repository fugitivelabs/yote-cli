/**
 * Will create a new __camelName__ from the default __camelName__ and the inputs on the __PascalName__Form
 */

// import react things
import React from 'react'

// import react-native components
import {
  ActivityIndicator
  , View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

// import resource components
import __PascalName__Form from '../components/__PascalName__Form';

// import services
import { useCreate__PascalName__ } from '../__camelName__Service';

// import styles
import tw from '../../../global/styles/tailwind/twrnc';

const Create__PascalName__ = () => {
  const navigation = useNavigation();

  const { data: __camelName__, handleFormChange, handleFormSubmit, ...__camelName__Query } = useCreate__PascalName__({
    // optional, anything we want to add to the default object
    initialState: {
      // someKey: someValue
    }
    // optional, callback function to run after the request is complete
    , onResponse: (new__PascalName__, error) => {
      if(error || !new__PascalName__) {
        // TODO: handle error
      } else {
        // replace create view with single __camelName__ on stack 
        navigation.replace('Single__PascalName__', { __camelName__Id: new__PascalName__._id });
      }
    }
  });

  const leftItem = {
    icon: require('../../../global/img/back.png')
    , layout: 'icon'
    , onPress: () => navigation.goBack()
  }

  // render UI based on data and loading state
  return (
    <View style={tw`flex-1 bg-white`}>
      <YTHeader
        title='Create __PascalName__'
        leftItem={leftItem}
      />
      <WaitOn query={__camelName__Query} fallback={<ActivityIndicator />}>
        <__PascalName__Form
          __camelName__={__camelName__}
          disabled={__camelName__Query.isFetching}
          formType="create"
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      </WaitOn>
    </View>
  )
}

export default Create__PascalName__;
