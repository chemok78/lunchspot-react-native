// @flow

//import libraries from React and React-Native
import React, { Component } from 'react';
import {

  AppRegistry,

} from 'react-native';

//import App component
import App from './components/App';

//create and export app
export default class LunchSpotApp extends Component{


  render(){

      return (<App />);

  }//render

}//export default

AppRegistry.registerComponent('LunchSpotApp', ()=> LunchSpotApp);
