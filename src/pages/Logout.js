import React, { useEffect } from "react";
import session from "../components/SessionManager";

const Logout = () =>{
    session.logOut();
    window.location = "http://localhost:3000/";

    return (
        <></>
    );
}

export default Logout;