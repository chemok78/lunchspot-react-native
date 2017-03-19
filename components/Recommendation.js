// @flow
//RecommendationsMap renders Recommendation components that are fetched from Foursquare
//Each Recommendation is a custom marker that shows a picture and a tip when you tap on it.

import React, { Component } from 'react';

import MapView from 'react-native-maps';

import {Card, Image, View, Subtitle, Text, Caption} from '@shoutem/ui';

class Recommendation extends Component {

      get photo(){

          const photo = this.props.venue.photos.groups[0].items[0];

          return '${photo.prefix}300x500${photo.suffix}';

      }

      render(){

          const { venues, tips } = this.props;

          //Marker is a pin we show on the map
          //Callout is popover
          //card, subtitle and caption are shoutem UI toolkit elements
          return (

              <MapView.Marker coordinate={{latitude: venue.location.lat,
                                           longitude: venue.location.lng}}>
                    <MapView.Callout>
                      <Card>
                          <Image styleName="medium-wide"
                                 source={{uri: this.photo}}/>
                          <View styleName="content">
                              <Subtitle>{venue.name}</Subtitle>
                              <Caption>{tips ? tips[0].text: '']}</Caption>
                          </View>
                      </Card>
                    <MapView.Callout/>

              </MapView.Marker/>

          )

      }//render
};

export default Recommendation
