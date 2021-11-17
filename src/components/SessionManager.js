import React, { useState, useEffect } from "react";
import Axios from "axios";

Axios.defaults.withCredentials = true;


let user = {
    id: 0,
    creds: "",
}

function fetch(){
    Axios.get("http://localhost:3001/session/fetch", { withCredentials: true }).then(
        (response) => {
            user = response.data.user;
        }
    );
};

function getUser(){
    return user;
}

export default {fetch, getUser};