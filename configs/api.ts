import axios from "axios";

export const apiPlaceholder = axios.create({
    baseURL: "https://timestory.tmdsite.my.id/api",
});
