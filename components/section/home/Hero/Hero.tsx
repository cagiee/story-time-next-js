import Image from "next/image";
import styles from "./Hero.module.scss";
import Textfield from "@/components/ui/Textfield/Textfield";
import Chip from "@/components/ui/Chip/Chip";
import { useState, useEffect } from "react";
import type { ICategory } from "@/types/category";
import { IDataList } from "@/types";
import { Search } from "lucide-react";

export default function HomeHero() {
    const [isAtTop, setIsAtTop] = useState(true);
    const handleScroll = () => {
        if (window.scrollY === 0) {
            if (!isAtTop) {
                setIsAtTop(true);
            }
        } else {
            if (isAtTop) {
                setIsAtTop(false);
            }
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isAtTop]);

    const category: IDataList<ICategory> = {
        list: [
            {
                id: 0,
                name: "All",
                slug: "",
                created_at: "",
                updated_at: "",
            },
            {
                id: 1,
                name: "Horror",
                slug: "horror",
                created_at: "",
                updated_at: "",
            },
            {
                id: 2,
                name: "Comedy",
                slug: "comedy",
                created_at: "",
                updated_at: "",
            },
            {
                id: 3,
                name: "Romance",
                slug: "romance",
                created_at: "",
                updated_at: "",
            },
            {
                id: 4,
                name: "Fantasy",
                slug: "fantasy",
                created_at: "",
                updated_at: "",
            },
            {
                id: 5,
                name: "Slice of life",
                slug: "slice-of-life",
                created_at: "",
                updated_at: "",
            },
            {
                id: 6,
                name: "Adventure",
                slug: "adventure",
                created_at: "",
                updated_at: "",
            },
            {
                id: 7,
                name: "Mystery",
                slug: "mystery",
                created_at: "",
                updated_at: "",
            },
        ],
    };

    return (
        <header className={styles.hero}>
            <div className={`${styles.hero__content}`}>
                <div className={`${styles.hero__text} container`}>
                    <div className={styles["hero__title-wrapper"]}>
                        <h1 className={styles.hero__title}>
                            Hi, Its&nbsp;
                            <br />
                            <span>Storytime</span>
                        </h1>
                        <div
                            className={`
                ${styles.hero__logo} 
                ${isAtTop ? styles["hero__logo--scroll-top"] : ""}
              `}
                        >
                            <Image
                                src="/images/logo-outlined.svg"
                                alt="Logo outlined"
                                loading="eager"
                                fill
                            />
                        </div>
                    </div>
                    <p className={styles.hero__description}>
                        The world's most-loved social storytelling platform.
                        Story time connects a global community of 90 million
                        readers and writers through the power of story.
                    </p>
                    <Textfield
                        placeholder="Search story"
                        icon={Search}
                        type="text"
                    />
                    <div className={styles.hero__categories}>
                        <span className={styles["hero__category-label"]}>
                            Search by category
                        </span>
                        <span
                            className={styles["hero__category-items-wrapper"]}
                        >
                            {category.list.map((item) => (
                                <Chip
                                    key={item.id}
                                    text={item.name}
                                    isActive={item.id === 0}
                                />
                            ))}
                        </span>
                    </div>
                </div>
                <div className={styles.hero__image}>
                    <Image
                        src="/images/hero2.jpg"
                        alt="Hero"
                        loading="eager"
                        fill
                    />
                </div>
            </div>
        </header>
    );
}
