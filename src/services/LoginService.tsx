import React from "react";
import ServiceApi from './ServiceApi'
import UserModel from "../models/UserModel";

export default {
    login: (user: UserModel) => {
        return ServiceApi.post('/login', JSON.stringify(user));
    } 
}