import React from "react";
import ApiService from "./ApiService";

export default class ReceiptWithUrlService extends ApiService {
    
    constructor() {
        super('/receipt')
    }

    create(object) {
        return this.post("",object);
    }
}