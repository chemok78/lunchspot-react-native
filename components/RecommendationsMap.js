import React, { Component } from 'react';
//react-native-maps by Air BNB deals with rendering the map
import MapView from 'react-native-maps';

import Style from './styles.js';

import {

  Title

} from '@shoutem/ui';

//We only render in this component, so we pass in everything as props instead of this.props
const RecommendationsMap = ({ mapRegion, gpsAccuracy, recommendations, lookingFor,
                              headerLocation, onRegionChange }) => (

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
);

export default RecommendationsMap;
