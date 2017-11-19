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

export default class HouseMarker extends React.Component {
    render() {
        const { house, handleVote, address } = this.props;
        const {
            coords: {latitude, longitude},
            votes,
            timestamp
        } = house;

        const netLikes = votes.up - votes.down;
        const likesStyles = [styles.netLikes];
        if(netLikes < 0) likesStyles.push(styles.negativeLikes);
        if(netLikes === 0) likesStyles.push(styles.neutralLikes);

        return (
            <MapView.Marker
                coordinate={{
                    latitude,
                    longitude
                }}
            >
                <MapView.Callout style={styles.container}>
                    <View style={styles.callout}>
                        <Text style={ [likesStyles] }>
                            {netLikes}
                        </Text>
                        <VoteButtons
                            handleVote={handleVote}
                            timestamp={timestamp}
                        />
                    </View>
                </MapView.Callout>
            </MapView.Marker>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 90
    },
    netLikes: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
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
