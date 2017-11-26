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
        const { house, handleVote } = this.props;
        const {
            position: {lat, long},
            votes,
            creator,
        } = house;

        const netLikes = votes.reduce((a, b) => a + b.vote, 0);
        const likesStyles = [styles.netLikes];
        if(netLikes < 0) likesStyles.push(styles.negativeLikes);
        if(netLikes === 0) likesStyles.push(styles.neutralLikes);

        return (
            <MapView.Marker
                coordinate={{
                    latitude: lat,
                    longitude: long
                }}
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
