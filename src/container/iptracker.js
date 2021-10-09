import "../assets/css/ipTracker.css";
import IconArrow from "../assets/images/icon-arrow.svg";

import {useState, useEffect} from "react";

// This component is the container of our application
const Iptracker = ({data, setIp}) => {

    // Initial state of the container
    const [location, setLocation] = useState({
        ip: null,
        city: null,
        country: null,
        timezone: null,
        ISP: null,
        lat: 10,
        lng: 10,
        loading: true
    });


    // State of error
    const [error, setError] = useState(null);

    // When the component is mount
    useEffect(() => {
        setLocation({...data});
    }, [data]);


    // When the input change
    const onChange = (event) => setLocation({...location, [event.target.name]: event.target.value, loading: true});

    // When submitting the form
    const onSubmit = (event) => {
        event.preventDefault();
        if (validateIp()) {
            setIp(location.ip);
        }
    }

    // Validator of the ip address
    const validateIp = () => {
        const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        if (!pattern.test(location.ip)) {
            setError("invalid ip address");
            return false;
        }
        setError(null);
        return true;
    }


    return (
        <section id={"ipTracker"}>
            <div className={"ipTracker-banner"}>
                <h2 className={'ipTracker-title'}>IP Address Tracker</h2>
                <form onSubmit={(event) => onSubmit(event)}>
                    {
                        error ?
                            <p className={"error"}> Invalid ip address </p>
                            :
                            null
                    }
                    <div className={"ipTracker-form-container"}>
                        <input name={"ip"} type={"text"} onChange={(event) => onChange(event)}
                               className={"ipTracker-input"} placeholder={"Search for any IP address or domain "}
                               required/>
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
                            {
                                (!location.loading) ?
                                    (<>
                                        <p className={"ipTracker-block-info"}>{location.city}, {location.country}</p>
                                    </>) :
                                    <div>
                                        <div className={"first-skeleton-loading"}></div>
                                        <div className={"second-skeleton-loading"}></div>
                                    </div>
                            }

                        </div>
                        <div className={"ipTracker-block"}>
                            <p className={"ipTracker-block-title"}>timezone</p>
                            {
                                (!location.loading) ?
                                    (
                                        <>
                                            <p className={"ipTracker-block-info"}>UTC{location.timezone}</p>
                                        </>
                                    ) :
                                    <div>
                                        <div className={"first-skeleton-loading"}></div>
                                        <div className={"second-skeleton-loading"}></div>
                                    </div>
                            }

                        </div>
                        <div className={"ipTracker-block"}>
                            <p className={"ipTracker-block-title"}>isp</p>
                            {
                                (!location.loading) ?
                                    (<p className={"ipTracker-block-info"}>{location.ISP}</p>) :
                                    <div>
                                        <div className={"first-skeleton-loading"}></div>
                                        <div className={"second-skeleton-loading"}></div>
                                    </div>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Iptracker;