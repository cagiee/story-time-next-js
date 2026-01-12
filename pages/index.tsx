import CategoryStory from "@/components/section/home/CategoryStory/CategoryStory";
import Hero from "@/components/section/home/Hero/Hero";
import LatestStory from "@/components/section/home/LatestStory/LatestStory";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Hero />
            <LatestStory />
            <CategoryStory
                direction="right"
                color="#000000"
                theme="dark"
                image={<Image src="/images/horror.jpg" fill alt="a" />}
                category={{
                    id: 1,
                    name: "Horror",
                    slug: "horror",
                    created_at: "",
                    updated_at: "",
                }}
            />
            <CategoryStory
                direction="left"
                color="#ffffff"
                theme="light"
                image={<Image src="/images/comedy.png" fill alt="a" />}
                category={{
                    id: 1,
                    name: "Comedy",
                    slug: "comedy",
                    created_at: "",
                    updated_at: "",
                }}
            />
            <CategoryStory
                direction="right"
                color="#000000"
                theme="dark"
                image={<Image src="/images/romance4.jpg" fill alt="a" />}
                category={{
                    id: 1,
                    name: "Romance",
                    slug: "romance",
                    created_at: "",
                    updated_at: "",
                }}
            />
        </>
    );
}
