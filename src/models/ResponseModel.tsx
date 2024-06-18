export default class ResponseModel {

    error: boolean;
    message: string;

    constructor(data: any) {
        this.error = data.error;
        this.message = data.message
    }
    
}