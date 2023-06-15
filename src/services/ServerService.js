export const BASE_HTTP_SERVER = "http://26.95.71.93:8082";

export function getAxcessPath(path) {
    return BASE_HTTP_SERVER + path.replace(/\\/g, "/");
}