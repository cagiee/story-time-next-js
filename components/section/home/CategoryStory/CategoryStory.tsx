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
        list: [],
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
