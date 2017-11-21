import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    AsyncStorage,
    Button,
    TouchableOpacity,
    Text,
} from 'react-native';
import {
    FormLabel,
    FormInput,
} from 'react-native-elements';
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
            const res = await Api.signUp(email, password);
            const { data: { token } } = res;
            await AsyncStorage.setItem('treatsToken', token);
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
                <Text style={styles.title}>Register</Text>
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
                    onChangeText={ password => { this.setState({ password }) } }/>

                <FormLabel>Re-Enter Password</FormLabel>
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
                            <Text>Already have an account? </Text>
                            <Text style={styles.link}>Login here</Text>
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
        marginTop: 50,
    },
    title: {
        fontSize: 32,
        marginBottom: 30,
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
        color: 'cornflowerblue'
    },
});
