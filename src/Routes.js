import React from 'react';
import {
    StackNavigator
} from 'react-navigation';
import Login from './Login/Login';
import Map from './Map/Map';

const Routes = StackNavigator({
    Login: { screen: Login },
    Map: { screen: Map },
});

export default Routes;