import React from 'react';
import {
    StackNavigator
} from 'react-navigation';
import { Login } from './Login';
import { Map } from './Map';
import { Register } from './Register';
import { SplashScreen } from './SplashScreen';

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
    Register: {
        screen: Register,
        navigationOptions: {
            title: 'Register',
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