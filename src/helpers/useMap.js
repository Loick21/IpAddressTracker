import axios from "axios";
import {useEffect, useState} from "react";


const useMap = (ip) => {

    const [data, setData] = useState();

    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env['REACT_APP_API_KEY']}`;

    if (ip) url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env['REACT_APP_API_KEY']}&ipAddress=${ip}`;


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
                lng: data.location.lng
            });
        } catch (error) {
        }
    }

    useEffect(() => {
        fetchIpAddress(url);
    }, [url]);

    return data;

}

export default useMap;
