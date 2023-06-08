import ApiService from "./ApiService";

export default class ValidatorCommentaryService extends ApiService {
    
    constructor() {
        super('/readfile')
    }

    read(fileName, userId) {
        return this.get(`?fileName=${fileName}&userId=${userId}`);
    }
}