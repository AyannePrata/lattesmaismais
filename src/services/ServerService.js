import ReadFileService from "../services/ReadFileService";
import AuthenticationApiService from "./AuthenticationApiService";
import StorageService from "./StorageService";

import { showErrorMessage } from "../components/Toastr/Toastr";

export const BASE_HTTP_SERVER = "http://26.95.71.93:8082";

const readFileService = new ReadFileService();
const storage = new StorageService();

export function getAxcessPath(path) {
    return BASE_HTTP_SERVER + path.replace(/\\/g, "/");
}

export const createLinkToRead = async (ownerId, id, extension, mescled = undefined) => {

    let getBy = id + extension;

    if(mescled) {
        getBy = mescled;
    }

    if(storage.getItem(`rec${id}`)) {
        return storage.getItem(`rec${id}`);

    } else {
        const filePathInHttpServer = await readFileService.read(getBy, ownerId)
        .then(response => {
            return getAxcessPath(response.data);
        }).catch(error => {
            showErrorMessage("Falha ao carregar dados de arquivo solicitado");
            console.log(error);
        });
        
        storage.setItem(`rec${id}`, filePathInHttpServer);
        return filePathInHttpServer;
    }

}