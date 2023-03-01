import ApiService from './ApiService';

export default class HomeService extends ApiService {
    
    constructor() {
        super('/uploadcurriculumxml')
    }

    create(object) {
        return this.postWithHeaders(object);
    }
}