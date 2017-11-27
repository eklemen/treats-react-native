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
                    <Text style={ styles.buttonText }>Treat!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bubble: {
        backgroundColor: 'rgba(214, 128, 14, 0.8)',
        paddingVertical: 12,
        borderRadius: 20,
    },
    button: {
        width: 180,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginVertical: 20,
        backgroundColor: 'transparent',
    },
});
