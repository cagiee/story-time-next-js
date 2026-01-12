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
        list: [
            {
                id: "1",
                author: {
                    id: "1",
                    name: "Cagie",
                    profile_image:
                        "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg",
                },
                category: {
                    id: "1",
                    name: "Horror",
                    slug: "horror",
                },
                content_preview:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minima vitae, ex commodi ad repellendus dicta. Quaerat voluptatibus molestiae non in architecto, itaque ut aspernatur adipisci, repellendus eveniet eligendi neque!",
                cover_image:
                    "https://images.pexels.com/photos/5435430/pexels-photo-5435430.jpeg",
                created_at: "2025-10-31",
                slug: "lorem-ipsum",
                title: "Lorem Ipsum 1",
            },
            {
                id: "2",
                author: {
                    id: "1",
                    name: "Cagie",
                    profile_image:
                        "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg",
                },
                category: {
                    id: "1",
                    name: "Horror",
                    slug: "horror",
                },
                content_preview:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minima vitae, ex commodi ad repellendus dicta. Quaerat voluptatibus molestiae non in architecto, itaque ut aspernatur adipisci, repellendus eveniet eligendi neque!",
                cover_image:
                    "https://images.pexels.com/photos/5435430/pexels-photo-5435430.jpeg",
                created_at: "2025-10-31",
                slug: "lorem-ipsum",
                title: "Lorem Ipsum 2",
            },
            {
                id: "3",
                author: {
                    id: "1",
                    name: "Cagie",
                    profile_image:
                        "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg",
                },
                category: {
                    id: "1",
                    name: "Horror",
                    slug: "horror",
                },
                content_preview:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minima vitae, ex commodi ad repellendus dicta. Quaerat voluptatibus molestiae non in architecto, itaque ut aspernatur adipisci, repellendus eveniet eligendi neque!",
                cover_image:
                    "https://images.pexels.com/photos/5435430/pexels-photo-5435430.jpeg",
                created_at: "2025-10-31",
                slug: "lorem-ipsum",
                title: "Lorem Ipsum 3",
            },
            {
                id: "4",
                author: {
                    id: "1",
                    name: "Cagie",
                    profile_image:
                        "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg",
                },
                category: {
                    id: "1",
                    name: "Horror",
                    slug: "horror",
                },
                content_preview:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minima vitae, ex commodi ad repellendus dicta. Quaerat voluptatibus molestiae non in architecto, itaque ut aspernatur adipisci, repellendus eveniet eligendi neque!",
                cover_image:
                    "https://images.pexels.com/photos/5435430/pexels-photo-5435430.jpeg",
                created_at: "2025-10-31",
                slug: "lorem-ipsum",
                title: "Lorem Ipsum 4",
            },
            {
                id: "5",
                author: {
                    id: "1",
                    name: "Cagie",
                    profile_image:
                        "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg",
                },
                category: {
                    id: "1",
                    name: "Horror",
                    slug: "horror",
                },
                content_preview:
                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde minima vitae, ex commodi ad repellendus dicta. Quaerat voluptatibus molestiae non in architecto, itaque ut aspernatur adipisci, repellendus eveniet eligendi neque!",
                cover_image:
                    "https://images.pexels.com/photos/5435430/pexels-photo-5435430.jpeg",
                created_at: "2025-10-31",
                slug: "lorem-ipsum",
                title: "Lorem Ipsum 5",
            },
        ],
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
