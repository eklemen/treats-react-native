import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { FormLabel, FormInput, Text } from 'react-native-elements';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h1>Login</Text>
                <FormLabel>Name</FormLabel>
                <FormInput onChangeText={ e => {console.log('event: ', e)} }/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
});
