import { auth } from "../config/firebase";

type RequestOptions = {
    method: string;
    headers: any;
    body?: any | undefined
}

const useFetchWrapper = () => {
    const authHeader = () => {
        const token = auth?.currentUser?.getIdToken();
        return { authorization: `Bearer ${token}` }
    }

    const request = (method: string) => {
        return (url: RequestInfo, body: any = null) => {
            const requestOptions: RequestOptions = {
                method,
                headers: authHeader()
            };

            if (body) {
                requestOptions.headers.Accept = "application/json";
                requestOptions.headers["Content-Type"] = "application/json";
                requestOptions.body = JSON.stringify(body);
            }
            return fetch(url, requestOptions);
        };
    }

    return {
        get: request("GET"),
        post: request("POST"),
    };
}
export { useFetchWrapper };