import React from "react";
import ServiceApi from './ServiceApi'
import { AxiosResponse } from "axios";
import Hirer from "../models/Hirer";


export default {

    findAllHirers: async (): Promise<AxiosResponse> => {
        return await ServiceApi.get('/hirer');
    },

    save: async (hirer: Hirer): Promise<AxiosResponse> => {
        return await ServiceApi.post('/hirer', hirer);
    },

    remove: async (id: number | undefined): Promise<AxiosResponse> => {
        return await ServiceApi.delete('/hirer/' + id)
    }

}