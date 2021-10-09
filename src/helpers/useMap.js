import axios from "axios";
import {useEffect, useState} from "react";

// Custom useMap hooks
const useMap = (ip) => {

    const [data, setData] = useState({
        ip: null,
        city: null,
        counrty: null,
        timezone: null,
        IPS: null,
        lat: 10,
        lng: 10,
        loading:true
    });


    // set the url for request
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env['REACT_APP_API_KEY']}`;

    if (ip) url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env['REACT_APP_API_KEY']}&ipAddress=${ip}`;


    // fecth IPify
    const fetchIpAddress = async () => {

        try {
            const {data} = await axios.get(url);
            setData({
                ip: data.ip,
                city: data.location.city,
                country: data.location.country,
                timezone: data.location.timezone,
                ISP: data.isp,
                lat: data.location.lat,
                lng: data.location.lng,
                loading:false
            });
        } catch (error) {
        }
    }

    // When the component is mount
    useEffect(() => {
        fetchIpAddress(url);
    }, [url]);

    return data;

}

export default useMap;
