
import axios from "axios";

console.log()

let url = `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env['REACT_APP_API_KEY']}&ipAddress=8.8.8.8`;

let headers = {}

export const axiosInstance = axios.create({
    baseURL:url,
    headers:headers
});