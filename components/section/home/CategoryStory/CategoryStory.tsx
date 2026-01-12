import { ICategory } from "@/types/category";
import styles from "./CategoryStory.module.scss";
import { IDataList } from "@/types";
import { IStory } from "@/types/story";
import StoryCard from "@/components/ui/StoryCard/StoryCard";

interface ICategoryStory {
    direction: "left" | "right";
    theme: "light" | "dark";
    color: string;
    image: React.ReactNode;
    category: ICategory;
}

export default function HomeCategoryStory(params: ICategoryStory) {
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
        ],
    };

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
                    {params.category.name}
                </span>
                <div className={styles["categoryStory__items-wrapper"]}>
                    {story.list.map((item) => (
                        <StoryCard
                            key={item.id}
                            story={item}
                            variant="no-border"
                            theme={params.theme}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
