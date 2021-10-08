import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import {useEffect, useState} from "react";

const Map = ({nlat,nlng}) => {

    const [coordinate, setCoordinate] = useState({ lng : nlng, lat : nlat  });

    useEffect(()=>{
        setCoordinate(()=>({
            lng:nlng,
            lat:nlat
        }));
        console.log(coordinate);
        console.log(nlat + " " + nlng);
    },[]);

    return (
            <MapContainer center={[coordinate.lat, coordinate.lng]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
    )

}

export default Map;