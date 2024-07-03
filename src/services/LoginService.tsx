import React from "react";
import ServiceApi from './ServiceApi'
import UserModel from "../models/User";
import { AxiosResponse } from "axios";
import { Session, isSession } from "../models/Session";
import StorageService from "./StorageService";


export default {

    login: async (user: UserModel): Promise<AxiosResponse> => {

        let response: AxiosResponse<Session> = await ServiceApi.post('/login', user);

        if (isSession(response.data)) {

            let session: Session = response.data;

            StorageService.setItem("auth-token", session.authToken);

            return response;

        } else {
            return response;
        }

    }

}