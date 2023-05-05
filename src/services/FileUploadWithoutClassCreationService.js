import React from "react";
import ApiService from "./ApiService";

export default class FileUploadWithoutClassCreationService extends ApiService {
    
    constructor() {
        super('/onlyuploadfile')
    }

    create(object) {
        return this.postWithHeaders(object);
    }   
}