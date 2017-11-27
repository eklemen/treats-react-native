import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import { MapView } from 'expo';
import { FontAwesome } from '@expo/vector-icons';
import VoteButtons from './VoteButtons';
const houseIcon1 = require('../../assets/houseIcon1.png');
const houseIcon2 = require('../../assets/houseIcon2.png');

export default class HouseMarker extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedCalloutIndex: null
        };
    }
    onCalloutPressed (index) {
        const calloutRef = `callout-${index}`;
        // const item = this.refs[calloutRef];
        this.setState({ selectedCalloutIndex: index });
    }

    render() {
        const { house, handleVote, index } = this.props;
        const {
            position: {lat, long},
            votes,
            creator,
        } = house;

        const netLikes = votes.reduce((a, b) => a + b.vote, 0);
        const likesStyles = [styles.netLikes];
        if(netLikes < 0) likesStyles.push(styles.negativeLikes);
        if(netLikes === 0) likesStyles.push(styles.neutralLikes);
        const icon = index % 2 ? houseIcon1 : houseIcon2;

        return (
            <MapView.Marker
                coordinate={{
                    latitude: lat,
                    longitude: long
                }}
                image={ icon }
                onPress={() => this.onCalloutPressed(index)}
                ref={`callout-${index}`}
                zIndex={this.state.selectedCalloutIndex === index ? 999 : 0}
            >
                <MapView.Callout style={styles.container}>
                    <View style={styles.callout}>
                        <Text style={ [likesStyles] }>
                            {netLikes}
                        </Text>
                        <VoteButtons
                            handleVote={handleVote}
                            house={ house }
                            voteCreator={ creator }
                        />
                    </View>
                </MapView.Callout>
            </MapView.Marker>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 110
    },
    netLikes: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom: 8,
        color: 'darkgreen'
    },
    neutralLikes: {
        color: 'darkgray'
    },
    negativeLikes: {
        color: 'crimson'
    },
    callout: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    voteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    vote: {
        flex: 1,
        alignItems: 'center'
    }
});
