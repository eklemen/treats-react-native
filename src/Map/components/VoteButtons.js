import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class VoteButtons extends React.Component {
    render() {
        const { handleVote, timestamp } = this.props;
        return (
            <View style={styles.voteContainer}>
                <TouchableHighlight
                    onPress={() => handleVote(timestamp, true)}
                    style={styles.vote}>
                    <FontAwesome
                        style={styles.vote}
                        name="thumbs-o-up"
                        size={28}
                        color="green"
                    />
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => handleVote(timestamp, false)}
                    style={styles.vote}>
                    <FontAwesome
                        style={styles.vote}
                        name="thumbs-o-down"
                        size={28}
                        color="red"
                    />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    voteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    vote: {
        flex: 1,
        alignItems: 'center',
    }
});
