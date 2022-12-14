import ApiService from './ApiService';

export default class SchedulingService extends ApiService {
    
    constructor() {
        super('/solicitedsheduling')
    }

    create(object) {
        return this.post('', object);
    }

    delete(id) {
        return super.delete(`/${id}`);
    }

    find(id) {
        return this.get(`/${id}`);
    }
    
}