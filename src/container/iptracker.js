import "../assets/css/ipTracker.css";
import IconArrow from "../assets/images/icon-arrow.svg";
import Map from "../components/map";

import {useState, useEffect} from "react";

import {axiosInstance} from "../helpers/axiosInstance";

import axios from "axios";

const Iptracker = () => {

    const [location,setLocation] = useState({
        ip:"192.212.174.101",
        city:null,
        country:null,
        timezone:null,
        ISP:null,
        lat:10,
        lng:10
    });

    useEffect(()=>{

        fetchIpAddress();
        console.log(location);

    },[]);

    const [error, setError] = useState(null);

    const onChange = (event) => setLocation({...location,[event.target.name]:event.target.value})

    const fetchIpAddress = async ()=> {

        const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env['REACT_APP_API_KEY']}&ipAddress=${location.ip}`;

        try{
            const response = await axios.get(url);
            setLocation({
                ip:response.data.ip,
                city:response.data.location.city,
                country:response.data.location.country,
                timezone:response.data.location.timezone,
                ISP:response.data.isp,
                lat:response.data.location.lat,
                lng:response.data.location.lng
            });
        }
        catch (error){
        }
    }

    const validateIp = () =>{
         const pattern =  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
         if(!pattern.test(location.ip)){
            setError("invalid ip address");
            return false;
         }
         setError(null);
        return true;
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(validateIp()){
            fetchIpAddress();
        }

    }

    return (
        <section id={"ipTracker"}>
            <div className={"ipTracker-banner"}>
                <h2 className={'ipTracker-title'}>IP Address Tracker</h2>
                <form onSubmit={(event)=>onSubmit(event)} >
                    {
                        error ?
                            <p className={"error"}> Invalid ip address  </p>
                            :
                            null
                    }
                    <div className={"ipTracker-form-container"}>
                        <input name={"ip"} type={"text"} onChange={(event)=>onChange(event)} className={"ipTracker-input"} placeholder={"192.212 174 101"} required/>
                        <button type={"submit"} className={"ipTracker-btn-submit"}><img src={IconArrow}/></button>
                    </div>
                </form>
                <div className={"ipTracker-info"}>
                    <div className={"ipTracker-location-info"}>
                        <div className={"ipTracker-block"}>
                            <p className={"ipTracker-block-title"}>ip address</p>
                            <p className={"ipTracker-block-info"}>{location.ip}</p>
                        </div>
                        <div className={"ipTracker-block"}>
                            <p className={"ipTracker-block-title"}>location</p>
                            <p className={"ipTracker-block-info"}>{location.city}, {location.country}</p>
                        </div>
                        <div className={"ipTracker-block"}>
                            <p className={"ipTracker-block-title"}>timezone</p>
                            <p className={"ipTracker-block-info"}>UTC{location.timezone}</p>
                        </div>
                        <div className={"ipTracker-block"}>
                            <p className={"ipTracker-block-title"}>isp</p>
                            <p className={"ipTracker-block-info"}>{location.ISP}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Map nlat={location.lat} nlng={location.lng}/>
        </section>
    );
}

export default Iptracker;