import CategoryStory from "@/components/section/home/CategoryStory/CategoryStory";
import Hero from "@/components/section/home/Hero/Hero";
import LatestStory from "@/components/section/home/LatestStory/LatestStory";
import { useRepositories } from "@/contexts";
import { ICategory } from "@/types/category";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export default function Home() {
    // external variables
    const api = useRepositories();

    // state
    const [category, setCategory] = useState({
        horor: undefined as ICategory | undefined,
        comedy: undefined as ICategory | undefined,
        romance: undefined as ICategory | undefined,
    });

    const fetchCategory = useCallback(async () => {
        try {
            const { data: response } = await api.category.getCategory();

            const horor = response.data.find((item) => item.name === "Horror");
            const comedy = response.data.find((item) => item.name === "Comedy");
            const romance = response.data.find(
                (item) => item.name === "Romance",
            );

            setCategory({
                horor,
                comedy,
                romance,
            });
        } catch (error) {
            toast.error("Failed to get category");
        }
    }, []);

    useEffect(() => {
        fetchCategory();
    }, []);

    return (
        <>
            <Hero />
            <LatestStory />
            {category.horor && (
                <CategoryStory
                    direction="right"
                    color="#000000"
                    theme="dark"
                    image={<Image src="/images/horror.jpg" fill alt="a" />}
                    category={category.horor}
                />
            )}
            {category.comedy && (
                <CategoryStory
                    direction="left"
                    color="#ffffff"
                    theme="light"
                    image={
                        <Image
                            src="/images/comedy2.png"
                            fill
                            alt="a"
                            objectFit="contain"
                        />
                    }
                    category={category.comedy}
                />
            )}
            {category.romance && (
                <CategoryStory
                    direction="right"
                    color="#000000"
                    theme="dark"
                    image={<Image src="/images/romance4.jpg" fill alt="a" />}
                    category={category.romance}
                />
            )}
        </>
    );
}
