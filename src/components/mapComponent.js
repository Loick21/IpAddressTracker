import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import {useEffect, useState} from "react";
import {Icon} from "leaflet";
import icon from '../assets/images/icon-location.svg'

const MapComponent = ({data}) => {

    // State of the coordinate
    const [coordinate, setCoordinate] = useState({lng: -118.09462, lat: 34.04915});

    //When the component is created
    useEffect(() => {
        if (data) setCoordinate(() => ({lng: data.lng, lat: data.lat}));
    }, [data]);

    //Map icon
    const locationIcon = new Icon({
        iconUrl: icon,
        iconSize: [30, 40],
    });

    // Return the mapView
    return (
        <div id={"map"}>
            <Map center={[coordinate.lat, coordinate.lng]} zoom={13} scrollWheelZoom={false}>
                {/*<ChangeMap center={[coordinate.lat,coordinate.lng]} zoom={20}> </ChangeMap>*/}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={[coordinate.lat, coordinate.lng]} icon={locationIcon}>
                    <Popup>
                        {data.city}; {data.country}
                        <p>lat : {data.lat}</p>
                        <p>lng: {data.lng}</p>
                    </Popup>
                </Marker>
            </Map>
        </div>
    )

}

export default MapComponent;

