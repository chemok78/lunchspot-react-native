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

import {OverlayTopics, BottomTopics} from './Topics';

//Foursquare API variables
const CLIENT_ID = 'JQUCGBYNIZQ5QUAGKSND0EU5X1WMK1TLXWLE1YQX3NTCKJIX';
const ClIENT_SECRET = 'PB0ZLX0CXVTKY44UE3CBZCUSAIOEPCMEU3QUKZ1GEPHSUXCN';
const FOURSQUARE_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore';
const API_DEBOUNCE_TIME = 2000;

export default class App extends Component {
    state = {
        mapRegion: null,
        gpsAccuracy: null,
        recommendations: [],
        lookingFor: null,
        headerLocation: null,
        last4sqCall: null
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
        this.fetchVenues(region);

        this.setState({
            mapRegion: region,
            gpsAccuracy: gpsAccuracy || this.state.gpsAccuracy
        });
    }//onRegionChange

    //fetchVenues talks to Foursquare and updates this.state when new recommendations fly in
    //Recommendations come in nested groups: flatten them with json.response.groups.reduce
    //walk through array of arrays and concat them in one big arrays
    //fetchvenues is called from within onRegionChange(in componentWillMount and RecommendationsMap)
    fetchVenues(region, lookingFor){
    //called from onRegionChange
    //called from onTopicChange

        //Check first, if we should fetch venues
        //shouldFetchVenues returns false, we stop and return the function
        if(!this.shouldFetchVenues(lookingFor)) return;

        //create query string
        const query = this.venuesQuery(region, lookingFor);

        //fetch the FourSquare results and set state
        fetch('${FOURSQUARE_ENDPOINT}?${query}')
              .then(fetch.throwErrors)
              //parse response as JSON
              .then(res => res.json())
              //parse response and set state
              .then(json => {

                  if(json.response.groups){

                    this.setState({

                      //reduce applies a function to every array element to a single value
                      recommendations: json.response.groups.reduce(

                          (total,g) => total.concat(g ? g.items: []), []

                      ),
                      headerLocation: json.response.headerLocation,
                      last4sqCall: new Date()

                    });

                  }
              })
              .catch(err => console.log(err));

    }//fetchVenues

    //use shouldFetchVenues in combination with state.last4sqCall and API_DEBOUNCE_TIME to avoid calling the API too often.
    //We call the API every 2 seconds
    shouldFetchVenues(lookingFor) {
    //return true or false based on lookingFor
    //if lookingFor is not the same as the one in state return True
    //or state last4sqCall is null, so non existant
    //or it has been longer than API Debounce Time
       return lookingFor != this.state.lookingFor
            || this.state.last4sqCall === null
            || new Date() - this.state.last4sqCall > API_DEBOUNCE_TIME;
   }

    //venuesQuery uses query-string to turn object into a URL query
    venuesQuery({ latitude, longitude }, lookingFor) {
        return queryString({
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            v: 20170305,
            ll: `${latitude}, ${longitude}`,
            llAcc: this.state.gpsAccuracy,
            section: lookingFor || this.state.lookingFor || 'food',
            limit: 10,
            openNow: 1,
            venuePhotos: 1
        });
    }

    onTopicSelect(lookingFor){
    //when topic is selected we fetch the venues
    //and we set the sate with lookingFor

        this.fetchVenues(this.state.mapRegion, lookingFor);

        this.setState({

            lookingFor:lookingFor

        })

    }

    render() {
       const { mapRegion, lookingFor } = this.state;

       if (mapRegion) {
       //pass in the whole state as props with {..this.state}, is ES6 spread operator
       //pass onRegionChange as prop, we want user move map and location move as the same behavior
       //if lookingFor is set = true, we render OverlayTopics with the onTopicSelect function that changes lookingFor in state
       //else, we render BottomTopics, which is under the map
           return (
               <Screen>
                   <RecommendationsMap {...this.state} onRegionChange={this.onRegionChange.bind(this)} />

                   {!lookingFor ? <OverlayTopics onTopicSelect={this.onTopicSelect.bind(this)}/>
                                : <BottomTopics onTopicSelect={this.onTopicSelect.bind(this)}/>}
               </Screen>
           );
       }else{
           return (
               <Screen style={Style.centered}>
                   <Spinner styleName="large" />
               </Screen>
           );
       }
   }//render

}
