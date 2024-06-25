import React from "react";
import ServiceApi from './ServiceApi'
import UserModel from "../models/User";
import { AxiosResponse } from "axios";
import User from "../models/User";

export default {
    
    register: async (user: UserModel): Promise<AxiosResponse> => {
        return ServiceApi.post<User>('/register', user);
    } 

}