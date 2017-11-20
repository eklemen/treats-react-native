import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform
} from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
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
            houses: [...mockPoints]
        };
    }
    componentWillMount() {
        Api.getUsers();
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

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
    addMarker = () => {
        const {
            location: {coords, timestamp},
            houses
        } = this.state;
        const latlng = {
            latitude: coords.latitude,
            longitude: coords.longitude
        };
        const geoCode = this._getGeocode(latlng);
        const house = {
            coords: latlng,
            geoCode,
            timestamp: timestamp,
            votes: {
                up: 1,
                down: 0
            }
        };
        this.setState({ houses: [...houses, house] });
    };

    handleVote = (id, isUpvote) => {
        // TODO: check if user has already voted
        const {houses} = this.state;
        const updatedArray = [...houses];
        const item = updatedArray.find(house => (
            house.timestamp === id
        ));
        isUpvote
            ? item.votes.up += 1
            : item.votes.down += 1;
        this.setState({ houses: [...updatedArray] });
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
                        houses.map((house, i) => (
                            <HouseMarker
                                house={house}
                                key={i}
                                handleVote={this.handleVote}
                            />
                        ))
                    }
                </MapView>
                <ButtonBar onPress={this.addMarker} />
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
