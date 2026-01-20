import { IGetRequest } from "..";

export interface IGetStory {
    search?: string;
    category_id?: number;
    sort_by?: "newest" | "popular" | "a-z" | "z-a";
    page?: number;
    limit?: number;
}

export type TStorySortByList = "newest" | "popular" | "a-z" | "z-a";

export interface IGetMyStory {
    search?: string;
    category_id?: number;
    sort_by?: TStorySortByList;
    page?: number;
    limit?: number;
}
