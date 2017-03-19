//renders buttons with onPress that calls onTopicSelect in App.js
//opTopicSelect calls te lookingFor property in state
//lookingFor is used in fetchVenues query string to get results from FourSquare

import React, {Component} from 'react';
import {View, Button, Text, Overlay, Heading} from '@shoutem/ui';

import Style from './styles.js';

const TOPICS = ['food', 'drinks','shops', 'sights', 'arts'];

const OverlayTopics = ({ onTopicSelect }) => (
    <Overlay styleName="fill-parent">
        <Heading style={{marginBottom: 15}}>What do you feel like?</Heading>
        {TOPICS.map(topic => (
            <Button onPress={() => onTopicSelect(topic)} key={topic} style={{marginBottom: 10}}>
                <Text>{topic}</Text>
            </Button>
        ))}
    </Overlay>
);

const BottomTopics = ({ onTopicSelect }) => (
    <View styleName="horizontal">
        {TOPICS.map(topic => (
            <Button onPress={() => onTopicSelect(topic)} key={topic} styleName="muted">
                <Text>{topic}</Text>
            </Button>
         ))}
    </View>
);

export { OverlayTopics, BottomTopics };
