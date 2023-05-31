import ApiService from './ApiService';

export default class VersionsService extends ApiService {
    
    constructor() {
        super('/curriculum')
    }

    create(object) {
        return this.post('', object);
    }

    update(object) {
        return this.put('/update', object);
    }

    delete(id) {
        return super.delete(`/delete/${id}`);
    }

    findById(id) {
        return this.get(`/${id}`);
    }

    findByRequesterIdAndVersionName(id, version) {
        return this.get(`/ownerandversion?ownerId=${id}&version=${version}`);
    }

    findAll(){
        return this.getAll();
    }

    findAllByUserId(id){
        return this.getAllById("/findall", id);
    }

}