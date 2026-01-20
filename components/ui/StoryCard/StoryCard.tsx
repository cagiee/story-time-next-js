import { IStory } from "@/types/story";
import Chip from "../Chip/Chip";
import Image from "next/image";
import Link from "next/link";
import styles from "./StoryCard.module.scss";
import { formatRelativeDate } from "@/lib/dateUtils";
import DOMPurify from "dompurify";
import SkeletonWrapper from "../SkeletonWrapper";

interface IStoryCard {
    story?: IStory;
    variant?: "default" | "no-border";
    theme?: "light" | "dark";
    isSkeleton?: boolean;
    key?: number | string;
}

export default function StoryCard(params: IStoryCard) {
    if (params.story) {
        const cleanContentHtml = DOMPurify.sanitize(
            params.story.content_preview,
        );
        return (
            <div
                key={params.story.id}
                className={`${styles.storyCard__items} ${
                    styles[
                        "storyCard__variant--" + (params.variant ?? "default")
                    ]
                } ${styles["storyCard__theme--" + (params.theme ?? "light")]}
                `}
            >
                <div className={styles.storyCard__image}>
                    <Image src={params.story.cover_image} alt="story1" fill />
                </div>
                <Link href="" className={styles["storyCard__items-title"]}>
                    {params.story.title}
                </Link>
                <div
                    className={styles["storyCard__items-description"]}
                    dangerouslySetInnerHTML={{ __html: cleanContentHtml }}
                ></div>
                <div className={styles["storyCard__topbar"]}>
                    <div className={styles["storyCard__user-profile"]}>
                        <Image
                            src={
                                params.story.author.profile_image ||
                                "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg"
                            }
                            alt="story1"
                            fill
                        />
                    </div>
                    <span className={styles["storyCard__user-name"]}>
                        {params.story.author.name}
                    </span>
                    <span className={styles["storyCard__user-date"]}>
                        <Chip
                            text={params.story.category.name}
                            size="sm"
                            disableHoverEffect
                        />
                    </span>
                </div>
            </div>
        );
    } else if (params.isSkeleton) {
        return (
            <div
                key={params.key}
                className={`${styles.storyCard__items} ${
                    styles[
                        "storyCard__variant--" + (params.variant ?? "default")
                    ]
                } ${styles["storyCard__theme--" + (params.theme ?? "light")]}
                `}
            >
                <SkeletonWrapper className={styles.storyCard__image}>
                    <div className={styles.storyCard__image}>
                        <img alt="story1" />
                    </div>
                </SkeletonWrapper>
                <span className={styles["storyCard__items-title"]}>
                    <SkeletonWrapper>Example Story Title</SkeletonWrapper>
                </span>
                <div className={styles["storyCard__items-description"]}>
                    <SkeletonWrapper>
                        <div className="">a</div>
                    </SkeletonWrapper>
                    <br />
                    <SkeletonWrapper>
                        <div className="">a</div>
                    </SkeletonWrapper>
                    <br />
                    <SkeletonWrapper>
                        <div className="">a</div>
                    </SkeletonWrapper>
                </div>
                <div className={styles["storyCard__topbar"]}>
                    <SkeletonWrapper
                        className={styles["storyCard__user-profile"]}
                    >
                        <Image
                            src={
                                "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg"
                            }
                            alt="story1"
                            fill
                        />
                    </SkeletonWrapper>

                    <span className={styles["storyCard__user-name"]}>
                        <SkeletonWrapper>Author name</SkeletonWrapper>
                    </span>
                    <span className={styles["storyCard__user-date"]}>
                        <SkeletonWrapper>
                            <Chip
                                text="Category"
                                size="sm"
                                disableHoverEffect
                            />
                        </SkeletonWrapper>
                    </span>
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}
