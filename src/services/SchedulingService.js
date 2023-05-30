import ApiService from './ApiService';

export default class SchedulingService extends ApiService {
    
    constructor() {
        super('/solicitedscheduling')
    }

    create(object) {
        return this.post('', object);
    }

    delete(id) {
        return this.delete(`/${id}`);
    }

    findById(id) {
        return this.get(`/${id}`);
    }

    findAll(){
        return this.getAll();
    }

    findAllByUserId(id, isValidator) {
        return this.get(`/findallbyuserid?id=${id}&isValidator=${isValidator}`);
    }

    update(object) {
        return this.put('', object);
    }
}