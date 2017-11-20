import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    AsyncStorage,
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
            password: '',
            error: null
        };
        this.login = this.login.bind(this);
    }
    async login() {
        const { email, password } = this.state;
        const { navigation } = this.props;
        try {
            const res = await Api.signIn(email, password);
            const { data: { token } } = res;
            await AsyncStorage.setItem('treatsToken', token);
            navigation.navigate('Map');
        } catch (error) {
            this.setState({error});
        }
    }

    render() {
        const { error } = this.state;
        const errComp = (<Text>Oops, something went wrong...</Text>);
        return (
            <View style={styles.container}>
                <Text h1>Login</Text>
                { error && errComp}
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
                    type="submit"
                    onPress={ () => this.login().done() }
                    title="Login" />
                <Text>New member?</Text>

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
