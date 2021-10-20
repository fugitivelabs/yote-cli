/**
 * View component for /__kebabNamePlural__/new
 *
 * Creates a new __camelName__ from a copy of the defaultItem in the __camelName__ store
 */

// import react things
import React, { useState } from 'react'

// import react-native components
import {
  ActivityIndicator
  , Text
  , TextInput
  , TouchableOpacity
  , View
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

// import global components
import YTHeader from '../../../global/headers/YTHeader';
import WaitOn from '../../../global/components/helpers/WaitOn';

import __PascalName__Form from '../components/__PascalName__Form'; 

// import libraries
import _ from 'lodash';

// import services
import { useCreate__PascalName__ } from '../__camelName__Service';

// import styles
import YTStyles from '../../../global/styles/YTStyles';

const Create__PascalName__ = () => {
  const { data: default__PascalName__, sendCreate__PascalName__, ...default__PascalName__Query } = useCreate__PascalName__()

  const navigation = useNavigation(); 

  // this useState call is equivalent to this.state = { isCreating: false } and setIsCreating(boolean) is this.setState({isCreating: boolean})
  const [isCreating, setIsCreating] = useState(false)

  const handleFormSubmit = async (new__PascalName__) => {
    // set isCreating true to disable the form while wait for the new __camelName__ to get returned
    setIsCreating(true)
    const { payload: __camelName__ } = await sendCreate__PascalName__(new__PascalName__) // replaces dispatch(__camelName__Actions.sendCreate__PascalName__(new__PascalName__)).then(__camelName__Res => ...)
    setIsCreating(false)
    navigation.replace('Single__PascalName__', {__camelName__Id: __camelName__._id}); 
  }

  const leftItem = {
    icon: require('../../../global/img/back.png'),
    layout: 'icon',
    onPress: () => navigation.goBack(),
  }

  // render UI based on data and loading state
  return (
    <View style={YTStyles.container}>
      <YTHeader
        title='Create __PascalName__'
        leftItem={leftItem}
      />
      <WaitOn query={default__PascalName__Query}>
      { default__PascalName__ &&
        // we have the default__PascalName__, render the form
        <__PascalName__Form
          __camelName__={default__PascalName__}
          disabled={default__PascalName__Query.isFetching || isCreating}
          formType="create"
          handleFormSubmit={handleFormSubmit}
        />
      }
      </WaitOn>
    </View>
  )
}

export default Create__PascalName__
