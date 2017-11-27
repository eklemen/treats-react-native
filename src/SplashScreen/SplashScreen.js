import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    AsyncStorage,
    Image,
    Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo';
const icon = require('../assets/splash.png');

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
            if(token) {
                setTimeout(() => {
                    navigation.navigate('Map');
                }, 2000);

            } else {
                setTimeout(() => {
                    navigation.navigate('Login');
                }, 2000);
            }
        } catch (err) {
            console.log('_checkToken err: ', err);
        }
    };

    render() {
        return (
            <LinearGradient
                colors={['#F7971E', '#FFD200']}
                style={styles.container}>
                <Image
                    style={ styles.icon }
                    source={ icon } />
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
        backgroundColor: 'red',
    },
    icon: {
        height: 250,
        width: 200,
        display: 'flex',
    },
});
