import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
//import session from "../components/SessionManager";

import Axios from "axios";

Axios.defaults.withCredentials = true;

const Logout = () =>{
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:3001/session/logout", {withCredentials: true}).then(
            setRedirect(true)
        );
    })

    if(redirect){
        window.location.reload();
        return <Redirect to="/" />;
    }

    return (
        <></>
    );
}

export default Logout;