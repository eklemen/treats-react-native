import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import {
    FormLabel,
    FormInput,
    Text,
    Button,
} from 'react-native-elements';
import Api from './../services/ApiService';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
    }
    async login() {
        const { email, password } = this.state;
        const { navigation } = this.props;
        let res;
        try {
            res = await fetch('http://localhost:3000/v1/users');
            console.log('res1------- ', res);
        } catch (e) {
            res = console.log('error fetching: e: ', e)
        }
        const response = await fetch('http://localhost:3000/v1/users');
        console.log('res2-------- ', res);
        return res;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text h1>Login</Text>
                <FormLabel>Email</FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    keyboardType="email-address"
                    autoFocus
                    autoCapitalize="none"
                    onChangeText={ email => { this.setState({ email }) } }/>
                <FormLabel>Password</FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={ password => { this.setState({ password}) } }/>
                <Button
                    large
                    rightIcon={{name: 'login', type: 'entypo'}}
                    style={styles.submit}
                    onPress={ () => this.login().done() }
                    title="Login" />
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
    input: {
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        width: Dimensions.get('window').width * 0.8
    },
    inputContainer: {
        marginBottom: 30,
    },
    submit: {
        width: 200,
        paddingTop: 30,
        width: Dimensions.get('window').width * 0.9
    }
});
