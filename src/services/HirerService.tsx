import React from "react";
import ServiceApi from './ServiceApi'
import UserModel from "../models/User";
import { AxiosResponse } from "axios";


export default {

    findAllHirers: async (): Promise<AxiosResponse> => {

        return await ServiceApi.get('/hirer');

    }

}