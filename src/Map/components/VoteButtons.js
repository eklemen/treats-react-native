import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default class VoteButtons extends React.Component {
    render() {
        const { handleVote, houseCreator } = this.props;
        return (
            <View style={styles.voteContainer}>
                <TouchableOpacity
                    onPress={() => handleVote(houseCreator, 1)}
                    style={styles.vote}>
                    <FontAwesome
                        style={styles.vote}
                        name="thumbs-o-up"
                        size={28}
                        color="green"
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleVote(houseCreator, -1)}
                    style={styles.vote}>
                    <FontAwesome
                        style={styles.vote}
                        name="thumbs-o-down"
                        size={28}
                        color="red"
                    />
                </TouchableOpacity>
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
