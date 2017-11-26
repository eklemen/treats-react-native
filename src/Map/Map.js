import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import axios from 'axios';
import HouseMarker from './components/HouseMarker';
import ButtonBar from './../shared/ButtonBar';
import mockPoints from './fixtures/mockPoints'
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
        const { votes, _id } = house;
        console.log('VOTE================', vote);
        const userId = await AsyncStorage.getItem('userId');
        const userVote = votes.find(v => v.creator === userId);
        if(userVote && userVote.vote === vote){
            const v = vote === 1 ? 'up' : 'down';
            this.setState({
                errorMessage: `You have already ${v}voted this house`
            });
            console.log('state------------', this.state);
        } else {
            try {
                console.log('HERE IS CREATOR  ', _id);
                await Api.putVote(_id, {vote});
                await this._getHouses();
            } catch (err) {
                console.log('handleVote err: ', err);
            }
        }
    };

    logout = async () => {
        const { navigation } = this.props;
        try {
            await Api.logout();
            await AsyncStorage.removeItem('treatsToken');
            navigation.navigate('Login');
        } catch (err) {
            console.log('logout err: ', err);
        }
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
        // console.log('one house ++++++++++++++++++', houses[0]);
        const { latitude, longitude } = coords;
        return (
            <View style={styles.container}>
                <MapView
                    provider={this.props.provider}
                    style={styles.map}
                    initialRegion={{
                        latitude,
                        longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    showsUserLocation={true}
                >
                    {
                        houses && houses.map((house, i) => (
                            <HouseMarker
                                house={house}
                                key={i}
                                handleVote={this._handleVote}
                            />
                        ))
                    }
                </MapView>
                <ButtonBar onPress={this.addMarker}
                           logout={ () => this.logout().done() } />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
