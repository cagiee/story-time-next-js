import type { IStory } from "@/types/story";
import { IDataList } from "@/types";
import styles from "./LatestStory.module.scss";
import StoryCard from "@/components/ui/StoryCard/StoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HomeLatestStory() {
    const story: IDataList<IStory> = {
        list: [],
    };

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
