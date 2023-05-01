import React from "react";
import ApiService from "./ApiService";

export default class FileUploadService extends ApiService {
    
    constructor() {
        super('/fileupload')
    }

    create(object) {
        return this.postWithHeaders(object);
    }
}