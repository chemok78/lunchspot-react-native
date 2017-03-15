// @flow

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './components/App.js';

export default class LunchSpot extends Component {
    render() {
        return (<App />);
    }
}

//Register index.ios.js as main Component
AppRegistry.registerComponent('LunchSpot', () => LunchSpot);
