import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
const upvoteIcon = require('../../assets/upvoteIcon.png');
const downvoteIcon = require('../../assets/downvoteIcon.png');

export default class VoteButtons extends React.Component {
    render() {
        const { handleVote, voteCreator, house } = this.props;
        return (
            <View style={styles.voteContainer}>
                <TouchableOpacity
                    onPress={() => handleVote(house, voteCreator, -1)}
                    style={styles.vote}>
                    <Image
                        style={styles.voteIcon}
                        source={ downvoteIcon } />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleVote(house, voteCreator, 1)}
                    style={styles.vote}>
                    <Image
                        style={styles.voteIcon}
                        source={ upvoteIcon } />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    voteContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    vote: {
        flex: 1,
        alignItems: 'center',
    },
    voteIcon: {
        width: 40,
        height: 50,
        paddingTop: 10,
        paddingHorizontal: 15,
        marginBottom: -5,
    },
});
