import { IGetMyStory, IGetStory } from "@/types/modules/story";
import FetchFactory from "../factory";
import { ApiResponse, FetchPromise } from "@/types/api";
import { IStory } from "@/types/story";

class StoryRepository extends FetchFactory {
    getStory(params: IGetStory = {}): FetchPromise<ApiResponse<IStory[]>> {
        return this.call("/stories", {
            method: "GET",
            options: {
                params,
            },
        });
    }
    getMyStory(params: IGetMyStory = {}): FetchPromise<ApiResponse<IStory[]>> {
        return this.call("/stories", {
            method: "GET",
            options: {
                params,
            },
        });
    }
}

export default StoryRepository;
