/**
 * Navigator for product components
 */

// import primary libraries
import React from 'react';
import { connect } from 'react-redux';
import {
  Button
  , Image
  , Text
  , TouchableOpacity
  , View
} from 'react-native';
import { StackNavigator } from 'react-navigation';

// import product components
import Create__PascalName__ from './views/Create__PascalName__';
import __PascalName__Root from './views/__PascalName__Root';
import Single__PascalName__ from './views/Single__PascalName__';
import Update__PascalName__ from './views/Update__PascalName__';

// horizontal screen transitions
const CardNavigator = StackNavigator(
  {
    __PascalName__Root: {
      screen: __PascalName__Root
    }
    , Single__PascalName__: {
      screen: Single__PascalName__
    }
  }
  , {
      headerMode: 'none'
      , initialRouteName: '__PascalName__Root'
    }
);

const __PascalName__Navigator = StackNavigator(
  {
    CardNavigator: {
      screen: CardNavigator
    }
    , New__PascalName__: {
      screen: Create__PascalName__
    }
    , Update__PascalName__: {
      screen: Update__PascalName__
    }
  }
  , {
      headerMode: 'none'
      , mode: 'modal' // vertical screen transitions
    }
);

export default __PascalName__Navigator;
