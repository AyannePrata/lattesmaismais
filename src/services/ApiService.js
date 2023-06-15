import axios, { AxiosHeaders } from "axios";

import StorageService from "./StorageService";

export const LOGGED_USER = 'loggedUser';
export const TOKEN = 'token';
//TODO remover constante não utilizada(?)
const baseURL = process.env.REACT_APP_API_URL;

export const httpClient = axios.create ({
    baseURL:'http://localhost:8080/api',
    withCredentials: true,
});

export default class ApiService {
    
    constructor(endpoint) {
        this.endpoint = endpoint;

        this.storageService = new StorageService();
        const token = this.storageService.getItem(TOKEN);
        this.registerToken(token);
    }

    registerToken(token){
        if(token){
            httpClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }

    post(url, params) {
        url = this.builderUrl(url);
        return httpClient.post(url, params);
    }

    postWithHeaders(params) {
        return httpClient.post(this.endpoint, params, {
            headers:{
                'Content-type': 'multipart/form-data'
            },
        })
    }
    
    put(url, params) {
        url = this.builderUrl(url);
        return httpClient.put(url, params);
    }
    
    get(url) {
        url = this.builderUrl(url);
        return httpClient.get(url);
    }

    getAll() {
        return httpClient.get(this.endpoint);
    }

    getAllById(url, id) {
        return httpClient.get(this.builderUrl(`${url}/${id}`));
    }

    getWithFilter(url) {
       url = this.builderUrl(url);
       return httpClient.get(url);
    }
    
    delete(url) {
        url = this.builderUrl(url);
        return httpClient.delete(url);
    }

    patch(url, params) {
        url = this.builderUrl(url);
        return httpClient.patch(url, params);
    }

    builderUrl(url) {
        return `${this.endpoint}${url}`;
    }
}