import axios, { AxiosInstance } from "axios";
import { IncomingMessage } from "http";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

const parseCookie = (
    cookies: Partial<{ [key: string]: string | string[] }>
) => {
    if (!cookies) return "";
    return Object.entries(cookies)
        .map(([key, value]) => {
            const stringValue = Array.isArray(value) ? value[0] : value;
            return `${key}=${encodeURIComponent(stringValue || "")}`;
        })
        .join("; ");
};

export const createSsrInstance = (
    instance: AxiosInstance,
    req: IncomingMessage & {
        cookies: NextApiRequestCookies;
    }
) => {
    const newInstance = axios.create(instance.defaults);

    (instance.interceptors.request as any).handlers.forEach((handler: any) => {
        if (handler) {
            newInstance.interceptors.request.use(
                handler.fulfilled,
                handler.rejected
            );
        }
    });

    (instance.interceptors.response as any).handlers.forEach((handler: any) => {
        if (handler) {
            newInstance.interceptors.response.use(
                handler.fulfilled,
                handler.rejected
            );
        }
    });

    newInstance.defaults.headers["Cookie"] = parseCookie(req.cookies);
    return newInstance;
};
