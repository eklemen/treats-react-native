import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Routes from './src/Routes';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>

                <Routes />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
});
