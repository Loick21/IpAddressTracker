import {TileLayer, MapContainer as LeafletMap, useMap} from "react-leaflet";
import {Marker, Popup} from "react-leaflet";
import {useEffect, useState} from "react";
import {Icon} from "leaflet";
import icon from '../assets/images/icon-location.svg'

const MapComponent = ({data}) => {

    const [coordinate, setCoordinate] = useState({lng: -118.09462, lat: 34.04915});

    useEffect(() => {
        if (data) setCoordinate(() => ({lng: data.lng, lat: data.lat}));
    }, [data]);

    const locationIcon = new Icon({
        iconUrl: icon,
        iconSize: [30, 40],
    });

    const ChangeMap = ({center, zoom}) => {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        <div id={"map"}>
            <LeafletMap center={[coordinate.lat, coordinate.lng]} zoom={13} scrollWheelZoom={true}>
                <ChangeMap center={[coordinate.lat,coordinate.lng]} zoom={13}> </ChangeMap>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coordinate.lat, coordinate.lng]} icon={locationIcon}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </LeafletMap>
        </div>
    )

}

export default MapComponent;

