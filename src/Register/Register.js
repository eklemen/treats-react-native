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

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            rePassword: '',
            error: null
        };
    }
    _signUp = async () => {
        const { email, password, rePassword } = this.state;
        const { navigation } = this.props;
        if(password !== rePassword) {
            return this.setState({ error: 'Passwords do not match.' });
        }
        try {
            const data = await Api.signUp(email, password);
            await AsyncStorage.setItem('treatsToken', data.token);
            await AsyncStorage.setItem('userId', data.user_id);
            navigation.navigate('Map');
        } catch (error) {
            this.setState({ error: 'Oops something went wrong...' });
        }
    };

    render() {
        const { navigation } = this.props;
        const { error } = this.state;
        const errComp = (<Text>{ error }</Text>);
        return (
            <LinearGradient
                colors={['#F7971E', '#FFD200']}
                start={[0.7, 0.5]}
                end={[0.1, 0.1]}
                style={styles.container}>
                <Text style={styles.title}>Register</Text>
                { error && errComp}
                <FormLabel labelStyle={styles.label}>
                    Email
                </FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    keyboardType="email-address"
                    autoFocus
                    autoCapitalize="none"
                    onChangeText={ email => { this.setState({ email }) } }/>

                <FormLabel labelStyle={styles.label}>
                    Password
                </FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={ password => { this.setState({ password }) } }/>

                <FormLabel labelStyle={styles.label}>
                    Re-Enter Password
                </FormLabel>
                <FormInput
                    inputStyle={ styles.input }
                    containerStyle={ styles.inputContainer }
                    secureTextEntry
                    autoCapitalize="none"
                    onChangeText={ rePassword => { this.setState({ rePassword }) } }/>
                <TouchableOpacity
                    style={styles.bubble}
                    onPress={ () => this._signUp().done() }>
                    <Text>Sign Up!</Text>
                </TouchableOpacity>
                <View style={styles.newMember}>
                    <TouchableOpacity onPress={ () => navigation.navigate('Login') }>
                        <View>
                            <Text style={styles.label}>Already have an account? </Text>
                            <Text style={styles.link}>Login here</Text>
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
        backgroundColor: 'transparent',
        marginBottom: 30,
    },
    label: {
        backgroundColor: 'transparent',
        color: '#3a3a3a',
    },
    input: {
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
        width: Dimensions.get('window').width * 0.8
    },
    inputContainer: {
        marginBottom: 20,
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
    newMember: {
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {
        fontSize: 14,
        color: '#0050d1',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
