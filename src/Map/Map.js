import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform,
    TouchableOpacity,
    AsyncStorage,
    Alert,
} from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import HouseMarker from './components/HouseMarker';
import LogoutButton from './components/LogoutButton';
import ButtonBar from './../shared/ButtonBar';
import Api from './../services/ApiService';
const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0009;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
            houses: []
        };
    }
    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
        this._getHouses().done();
    }
    _getHouses = async () => {
        try {
            const houses = await Api.getHouses();
            this.setState({ houses });
        } catch (err) {
            console.log('GET HOUSES ERR: ', err);
        }
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        const location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };
    _getGeocode = async (latlng) => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        const coded = Location.reverseGeocodeAsync(latlng);
        this.setState({ coded });
    };
    addMarker = async () => {
        const {
            location: { coords }
        } = this.state;
        const house = {
            lat: coords.latitude,
            long: coords.longitude
        };
        try {
            await Api.addHouse(house);
            await this._getHouses();
        } catch (err) {
            console.log('addMarker err: ', err);
        }
    };

    _handleVote = async (house, voteCreator, vote) => {
        const { _id } = house;
        // const userId = await AsyncStorage.getItem('userId');
        // const previousVote = votes.find(v => v.creator === userId);
        // if(previousVote && previousVote.vote === vote){
        //     const v = vote === 1 ? 'up' : 'down';
        //     this.setState({
        //         errorMessage: `You have already ${v}voted this house`
        //     });
        //     console.log('state.errorMessage------------', this.state.errorMessage);
        // } else {
        //     try {
        //         await Api.putVote(_id, vote);
        //         await this._getHouses();
        //     } catch (err) {
        //         console.log('handleVote err: ', err);
        //     }
        // }
        // TODO prevent user from re-voting
        try {
            await Api.putVote(_id, vote);
            await this._getHouses();
        } catch (err) {
            console.log('handleVote err: ', err);
        }
    };

    _logout = async () => {
        const { navigation } = this.props;
        try {
            await Api.logout();
            await AsyncStorage.removeItem('treatsToken');
            navigation.navigate('Login');
        } catch (err) {
            console.log('logout err: ', err);
        }
    };
    _showAlert = () => {
        Alert.alert(
            'Do you want to logout?',
            null,
            [
                {text: 'Cancel', style: 'cancel'},
                { text: 'Logout', onPress: () => this.logout().done() },
            ],
        )
    };

    render() {
        let text = 'Waiting...';
        if (this.state.errorMessage) {
            text = this.state.errorMessage;
        }
        if(!this.state.location) {
            return(
                <View style={styles.container}>
                    <Text>{text}</Text>
                </View>
            )
        }
        const { location: {coords}, houses } = this.state;
        const { latitude, longitude } = coords;
        return (
            <View style={styles.container}>
                <LogoutButton showAlert={ this._showAlert } />
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    showsUserLocation={true}>

                    {
                        houses && houses.map((house, i) => (
                            <HouseMarker
                                house={house}
                                key={i}
                                index={i}
                                handleVote={this._handleVote}
                            />
                        ))
                    }
                </MapView>

                <ButtonBar onPress={this.addMarker}
                           logout={ () => this._logout().done() } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'space-between',
        backgroundColor: '#a9a9a9',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 20,
        bottom: 0,
        right: 0,
        left: 0,
    },
});
