import ApiService from './ApiService';

export default class VersionsService extends ApiService {
    
    constructor() {
        super('/curriculum')
    }

    create(object) {
        return this.post('', object);
    }

    delete(id) {
        return super.delete(`/${id}`);
    }

    findById(id) {
        return this.get(`/${id}`);
    }
    findAll(){
        return this.getAll();
    }
}