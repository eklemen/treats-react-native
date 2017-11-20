import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class ButtonBar extends React.Component {
    render() {
        const { onPress } = this.props;
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={ onPress }
                    style={[styles.bubble, styles.button]}
                >
                    <Text>Treat!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 12,
        borderRadius: 20,
    },
    button: {
        width: 80,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
