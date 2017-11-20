import React from 'react';
import {
    StackNavigator
} from 'react-navigation';
import Login from './Login/Login';
import Map from './Map/Map';

const Routes = StackNavigator({
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