import ApiService from "./ApiService";

export default class ValidatorCommentaryService extends ApiService {
    
    constructor() {
        super('/validatorcommentary')
    }

    create(object) {
        return this.post('', object);
    }
}
