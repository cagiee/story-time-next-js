import { IStory } from "@/types/story";
import Chip from "../Chip/Chip";
import Image from "next/image";
import Link from "next/link";
import styles from "./StoryCard.module.scss";
import { formatRelativeDate } from "@/lib/dateUtils";

interface IStoryCard {
    story: IStory;
    variant?: "default" | "no-border";
    theme?: "light" | "dark";
}

export default function StoryCard(params: IStoryCard) {
    return (
        <div
            key={params.story.id}
            className={`${styles.storyCard__items} ${
                styles["storyCard__variant--" + (params.variant ?? "default")]
            } ${styles["storyCard__theme--" + (params.theme ?? "light")]}
            `}
        >
            <div className={styles["storyCard__topbar"]}>
                <div className={styles["storyCard__user-profile"]}>
                    <Image
                        src={params.story.author.profile_image}
                        alt="story1"
                        fill
                    />
                </div>
                <span className={styles["storyCard__user-name"]}>
                    {params.story.author.name}
                </span>
                <span className={styles["storyCard__user-date"]}>
                    {formatRelativeDate(params.story.created_at)}
                </span>
            </div>
            <div className={styles.storyCard__image}>
                <Image src={params.story.cover_image} alt="story1" fill />
            </div>
            <Link href="" className={styles["storyCard__items-title"]}>
                {params.story.title}
            </Link>
            <div className={styles["storyCard__items-description"]}>
                {params.story.content_preview}
            </div>
            <span className={styles["storyCard__items-categories"]}>
                <Chip
                    text={params.story.category.name}
                    size="sm"
                    disableHoverEffect
                />
            </span>
        </div>
    );
}
