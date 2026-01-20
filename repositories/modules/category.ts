import { ApiResponse, FetchPromise } from "@/types/api";
import FetchFactory from "../factory";
import { ICategory } from "@/types";

class CategoryRepository extends FetchFactory {
    getCategory(): FetchPromise<ApiResponse<ICategory[]>> {
        return this.call("/categories", {
            method: "GET",
        });
    }
}

export default CategoryRepository;
