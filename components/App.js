// @flow
//import libraries from React and React-Native
import React, { Component } from 'react';
import {

  AppRegistry

} from 'react-native';
import {

  Screen,
  Spinner

} from '@shoutem/ui';

import Style from './styles.js';

import RecommendationsMap from './RecommendationsMap.js';

export default class App extends Component {
    state = {
        mapRegion: null,
        gpsAccuracy: null
    }
    watchID = null

    componentWillMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.00922*1.5,
                longitudeDelta: 0.00421*1.5
            }

            this.onRegionChange(region, position.coords.accuracy);
        });
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region, gpsAccuracy) {
        //this.fetchVenues(region);

        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }

    render() {
       const { mapRegion, lookingFor } = this.state;

       if (mapRegion) {
       //pass in the whole state as props with {..this.state}, is ES6 spread operator
       //pass onRegionChange as prop, we want user move map and location move as the same behavior   
           return (
               <Screen>
                   <RecommendationsMap {...this.state} onRegionChange={this.onRegionChange.bind(this)} />
               </Screen>
           );
       }else{
           return (
               <Screen style={Style.centered}>
                   <Spinner styleName="large" />
               </Screen>
           );
       }
   }

}
