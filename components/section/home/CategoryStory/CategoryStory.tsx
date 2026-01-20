import { ICategory } from "@/types/category";
import styles from "./CategoryStory.module.scss";
import { IDataList, IDataListWithMetaAndQuery } from "@/types";
import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard/StoryCard";
import { toast } from "sonner";
import { useCallback, useEffect, useState } from "react";
import { useRepositories } from "@/contexts";
import { IGetMyStory, IGetStory } from "@/types/modules/story";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ICategoryStory {
    direction: "left" | "right";
    theme: "light" | "dark";
    color: string;
    image: React.ReactNode;
    category?: ICategory;
}

export default function HomeCategoryStory(params: ICategoryStory) {
    // external variables
    const api = useRepositories();

    // state
    const [story, setStory] = useState<
        IDataListWithMetaAndQuery<IStory, IGetStory>
    >({
        list: [],
        meta: {
            current_page: 1,
            per_page: 1,
            total: 0,
            last_page: 1,
        },
        query: {
            limit: 5,
            category_id: params.category?.id,
        },
    });
    const [loading, setLoading] = useState({
        story: true,
    });

    // fetch data
    const fetchStory = useCallback(async () => {
        try {
            setLoading({ ...loading, story: true });

            const { data: response } = await api.story.getStory(story.query);

            setStory((prev) => ({
                ...prev,
                list: response.data,
                meta: response.meta,
            }));
        } catch (error) {
            toast.error("Error get story data");
            console.error(error);
        } finally {
            setLoading({ ...loading, story: false });
        }
    }, [story.query]);

    //  initial fetch
    useEffect(() => {
        fetchStory();
    }, []);

    return (
        <div
            className={`${styles.categoryStory} ${
                styles["categoryStory__theme--" + params.theme]
            } ${styles["categoryStory__direction--" + params.direction]}`}
            style={{ backgroundColor: params.color }}
        >
            <div className={styles.categoryStory__image}>{params.image}</div>
            <div className={`${styles.categoryStory__content} container`}>
                <span className={styles.categoryStory__title}>
                    {params.category?.name}
                </span>
                <div className={styles.categoryStory__swiper}>
                    <Swiper
                        spaceBetween={20}
                        loop
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                    >
                        {story.list.map((item) => (
                            <SwiperSlide>
                                <StoryCard
                                    key={item.id}
                                    story={item}
                                    variant="no-border"
                                    theme={params.theme}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
