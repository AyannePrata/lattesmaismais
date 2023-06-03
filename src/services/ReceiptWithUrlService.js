import React from "react";
import ApiService from "./ApiService";

export default class ReceiptWithUrlService extends ApiService {
    
    constructor() {
        super('/receipt')
    }

    create(params) {
        return this.post("",params);
    }

    updateByValidator(params) {
        return this.put("/validator", params);
    }
}