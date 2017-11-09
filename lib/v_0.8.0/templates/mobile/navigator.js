/**
* Navigator for __name__ components
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

// import __name__ components
import Create__PascalName__ from './components/Create__PascalName__'; 
import __PascalName__Layout from './components/__PascalName__Layout'; 
import Single__PascalName__ from './components/Single__PascalName__'; 
import Update__PascalName__ from './components/Update__PascalName__'; 

// horizontal screen transitions
const CardNavigator = StackNavigator(
  {
    __PascalName__Layout: {
      screen: __PascalName__Layout
    }
    , Single__PascalName__: {
      screen: Single__PascalName__
    }
  }
  , {
      headerMode: 'none'
      , initialRouteName: '__PascalName__Layout'
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