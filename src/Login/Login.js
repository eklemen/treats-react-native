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
import { LinearGradient } from 'expo';
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
        const errComp = (
            <Text style={ styles.label }>
                Oops, something went wrong...
            </Text>
        );
        return (
            <LinearGradient
                colors={['#F7971E', '#FFD200']}
                start={[0.3, 0.1]}
                end={[0.7, 0.5]}
                style={styles.container}>
                <Text style={styles.title}>Login</Text>
                { error && errComp}
                <FormLabel labelStyle={styles.label}>Email</FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={ email => { this.setState({ email }) } }/>
                <FormLabel labelStyle={styles.label}>Password</FormLabel>
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
                        <View style={styles.linkContainer}>
                            <Text style={styles.label}>New member? </Text>
                            <Text style={styles.link}>Create Account</Text>
                        </View>
                    </TouchableOpacity>
                </View>


            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height,
    },
    title: {
        fontSize: 32,
        marginBottom: 20,
        backgroundColor: 'transparent',
    },
    label: {
        backgroundColor: 'transparent',
        color: '#3a3a3a',
    },
    input: {
        marginHorizontal: 20,
        textAlign: 'center',
        borderColor: 'blue',
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
        backgroundColor: 'transparent',
        color: '#0050d1',
        fontWeight: 'bold',
    },
    linkContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

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
