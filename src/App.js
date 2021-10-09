import './App.css';

import Iptracker from "./container/iptracker";
import MapComponent from "./components/mapComponent";
import {useState} from "react";
import useMap from "./helpers/useMap";

function App() {

    const [ip,setIp] = useState('');

    const data = useMap(ip);
    console.log(data);

    return (
        <>
            <Iptracker data={data} setIp={setIp} />
            <MapComponent data={data}  />
        </>
    );
}
export default App;
