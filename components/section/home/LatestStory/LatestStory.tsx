import type { IStory } from "@/types/story";
import {
    IDataList,
    IDataListWithMeta,
    IDataListWithMetaAndQuery,
} from "@/types";
import styles from "./LatestStory.module.scss";
import StoryCard from "@/components/ui/StoryCard/StoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useCallback, useEffect, useState } from "react";
import { useRepositories } from "@/contexts";
import { IGetMyStory, IGetStory } from "@/types/modules/story";
import { toast } from "sonner";

export default function HomeLatestStory() {
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
            page: 1,
            sort_by: "newest",
        },
    });
    const [loading, setLoading] = useState({
        story: true,
    });

    // fetch data
    const fetchStory = useCallback(async () => {
        try {
            setLoading({ ...loading, story: true });

            const { data: response } = await api.story.getMyStory(story.query);

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
        <div className={`${styles.latestStory} container`}>
            <h2 className={styles.latestStory__title}>Latest Story</h2>
            {/* <div className={styles["latestStory__items-wrapper"]}> */}
            <Swiper
                modules={[Autoplay]}
                spaceBetween={20}
                loop
                autoplay={{
                    delay: 3000,
                    pauseOnMouseEnter: true,
                }}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
                className={styles["latestStory__swiper"]}
            >
                {story.list.map((item) => (
                    <>
                        <SwiperSlide key={item.id}>
                            <StoryCard story={item} />
                        </SwiperSlide>
                    </>
                ))}
            </Swiper>
            {/* </div> */}
        </div>
    );
}
