import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    AsyncStorage,
} from 'react-native';

export default class SplashScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this._checkToken().done();
    }

    _checkToken = async () => {
        const { navigation } = this.props;
        try {
            const token = await AsyncStorage.getItem('treatsToken');
            console.log('token', token);
            if(token) {
                navigation.navigate('Map');
            } else {
                navigation.navigate('Login');
            }
        } catch (err) {
            console.log('_checkToken err: ', err);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
});
