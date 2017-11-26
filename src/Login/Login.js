import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    AsyncStorage,
    TouchableOpacity,
    Text,
} from 'react-native';
import {
    FormLabel,
    FormInput,
} from 'react-native-elements';
import axios from 'axios';
import Api from './../services/ApiService';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        };
    }
    _login = async () => {
        const { email, password } = this.state;
        const { navigation } = this.props;
        try {
            const data = await Api.signIn(email, password);
            await AsyncStorage.setItem('treatsToken', data.token);
            await AsyncStorage.setItem('userId', data.user_id);
            navigation.navigate('Map');
        } catch (error) {
            this.setState({error});
        }
    };

    render() {
        const { navigation } = this.props;
        const { error } = this.state;
        const errComp = (<Text>Oops, something went wrong...</Text>);
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                { error && errComp}
                <FormLabel>Email</FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={ email => { this.setState({ email }) } }/>
                <FormLabel>Password</FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={ password => { this.setState({ password}) } }/>
                <TouchableOpacity
                    style={styles.bubble}
                    onPress={ () => this._login().done() }>
                    <Text>Login</Text>
                </TouchableOpacity>
                <View style={styles.newMember}>
                    <TouchableOpacity onPress={ () => navigation.navigate('Register') }>
                        <View>
                            <Text>New member? </Text>
                            <Text style={styles.link}>Create Account</Text>
                        </View>
                    </TouchableOpacity>
                </View>


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
    title: {
        fontSize: 32,
        marginBottom: 20,
    },
    input: {
        marginHorizontal: 20,
        textAlign: 'center',
        width: Dimensions.get('window').width * 0.8
    },
    inputContainer: {
        marginBottom: 20,
    },
    newMember: {
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        fontSize: 14,
        color: 'cornflowerblue'
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 12,
        borderRadius: 20,
        width: Dimensions.get('window').width * 0.6,
        paddingHorizontal: 12,
        alignItems: 'center',
        marginHorizontal: 10,
    },
});
