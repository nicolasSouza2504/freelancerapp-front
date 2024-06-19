import React from "react";
import ServiceApi from './ServiceApi'
import UserModel from "../models/User";
import { AxiosResponse } from "axios";

export default {
    
    login: async (user: UserModel): Promise<AxiosResponse> => {
        return ServiceApi.post('/login', user);
    } 

}