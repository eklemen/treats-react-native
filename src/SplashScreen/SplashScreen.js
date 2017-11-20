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
        const { navigation } = this.props;
        AsyncStorage.getItem('treatsToken').then(token => {
            console.log('token', token);
            if(token) {
                navigation.navigate('Map');
            } else {
                navigation.navigate('Login');
            }
        })
    }

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
