import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

export default class LogoutButton extends React.Component {
    render() {
        const { showAlert } = this.props;
        return (
            <TouchableOpacity
                onPress={ showAlert }
                style={ styles.button }
            >
                <Icon
                    raised
                    type='material-community'
                    name='logout-variant'
                    color='red' />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 40,
        marginRight: 10,
        borderRadius: 50,
        paddingVertical: 3,
        paddingHorizontal: 3,
        zIndex: 5,
        alignSelf: 'flex-end',
    },
});
