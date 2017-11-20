import React from 'react';
import {
    StackNavigator
} from 'react-navigation';
import Login from './Login/Login';
import Map from './Map/Map';
import SplashScreen from './SplashScreen/SplashScreen';

const Routes = StackNavigator({
    Splash: {
        screen: SplashScreen,
        navigationOptions: {
            header: false,
            headerLeft: null,
        },
    },
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            headerLeft: null,
        },
    },
    Map: {
        screen: Map,
        navigationOptions: {
            headerLeft: null,
            header: false
        },
    },
});

export default Routes;