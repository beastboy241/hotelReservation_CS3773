import React, { useState, useEffect } from "react";
import Axios from "axios";

Axios.defaults.withCredentials = true;



async function set(state){
    await Axios.post("http://localhost:3001/session/login", state, {
        withCredentials: true,
    })
}

function useGetUser(){

    const [user, setUser] = useState([]); 

    const defaultUser = {
        id: 0,
        email: "",
        creds: "u",
        login: false
    }
    
    useEffect(() => {
        Axios.get("http://localhost:3001/session/fetch", { withCredentials: true }).then(
            (response) => {
                if(response.data)
                    setUser(response.data);
                else
                    setUser(defaultUser);
            }
        );
    }, []);

    return user;
}

export default {set, useGetUser};