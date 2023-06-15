import ApiService from './ApiService';

export default class PdfService extends ApiService {
    
    constructor() {
        super('/export');
    }

    generate(curriculumId, ownerId) {
        return this.get(`?curriculumId=${curriculumId}&ownerId=${ownerId}`);
    }
}