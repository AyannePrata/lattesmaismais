import ApiService, {LOGGED_USER, TOKEN} from "./ApiService";
import StorageService from "./StorageService";
import { ROLE, TIMESTAMP, SOLICITATIONLIST, FORCEGETSOLICITATIONS } from "../components/Menu/LeftMenu";

export default class AuthenticationApiService extends ApiService {

    constructor(){
        super('');
        this.storageService = new StorageService();
    }

    async login(email, password){
        const loginDTO = {
            "email": email,
            "password": password
        };

        try{
            const response = await this.post('/login', loginDTO);

            const user = response.data.user;
            const token = response.data.token;

            this.storageService.setItem(LOGGED_USER, user);
            this.storageService.setItem(TOKEN, token);

            this.registerToken(token);
            return user;
        } catch(error){
            return null;
        }
    }

    isTokenValid(token){
        return this.post('/login/verifytoken', token);
    }

    logout(){
        return(
            this.post('/logout')
            .then(() => {
                this.storageService.removeAllItems();
            })
        )
    }

    getLoggedUser(){
        return this.storageService.getItem(LOGGED_USER);

    }

    getToken(){
        return this.storageService.getItem(TOKEN);
    }

    async isAuthenticated(){
        const user = this.getLoggedUser();
        const token = this.getToken();

        if(!user || !token){
            return false;
        }

        const tokenDTO = {
            "token": token
        };

        const response = await this.isTokenValid(tokenDTO);
        return response.data;
    }
    
}