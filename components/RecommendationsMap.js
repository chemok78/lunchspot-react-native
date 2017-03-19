//react-native-maps by Air BNB deals with rendering the map

import React, { Component } from 'react';

import MapView from 'react-native-maps';

import Style from './styles.js';

import {

  Subtitle,
  Title

} from '@shoutem/ui';

import Recommendation from './Recommendation.js';

// This component only renders and has not state of it's own, so we pass in the props through the function
// Everytime App state changes, triggers a re-render of this component and props as well
//We only render in this component, so we pass in everything as props instead of this.props
const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor,
                              headerLocation, onRegionChange }) => (
    //Title is a Shoutem component
    //if lookingFor prop is True...we insert lookingFor otherwise an empty string
    //Two MapView.Circle components to render location indicator
    //Bigger indicates accuracy
    //Small is a faux dot
    <MapView.Animated region={mapRegion}
                      style={Style.fullscreen}
                      onRegionChange={onRegionChange}>
        <Title styleName="h-center multiline" style={Style.mapHeader}>
            {lookingFor ? `${lookingFor} in` : ''} {headerLocation}
        </Title>

        <MapView.Circle center={mapRegion}
                        radius={gpsAccuracy*1.5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 0.2)"
                        />
        <MapView.Circle center={mapRegion}
                        radius={5}
                        strokeWidth={0.5}
                        strokeColor="rgba(66, 180, 230, 1)"
                        fillColor="rgba(66, 180, 230, 1)"
                        />
    </MapView.Animated>

    //<App/> component passes whole state in
    //Loop through every element in recommendations and return a new array with Recommendation component that has the recommendation as prop and key as r.venue.id
    //every r in the loop is a recommendations item
    {recommendations.map(r => <Recommendation {...r} key={r.venue.id} />)}

);

export default RecommendationsMap;
