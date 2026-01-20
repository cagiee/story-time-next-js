import Button from "@/components/ui/Button/Button";
import styles from "./MyStory.module.scss";
import { ArrowDown, Boxes, Plus, Search, SortDesc } from "lucide-react";
import StoryCard from "@/components/ui/StoryCard/StoryCard";
import { IDataListWithMetaAndQuery, ISelectOption } from "@/types";
import { IStory } from "@/types/story";
import Textfield from "@/components/ui/Textfield/Textfield";
import Select from "@/components/ui/Select";
import { useCallback, useEffect, useState } from "react";
import { useRepositories } from "@/contexts";
import { IGetMyStory, TStorySortByList } from "@/types/modules/story";
import { useNumber } from "@/hooks/useNumber";
import { useDebounce } from "@/hooks/useDebounce";
import Image from "next/image";
import { toast } from "sonner";

export default function MyStory() {
    // external variables
    const api = useRepositories();
    const { numberFormat } = useNumber();

    // states
    const [story, setStory] = useState<
        IDataListWithMetaAndQuery<IStory, IGetMyStory>
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
        },
    });
    const [loading, setLoading] = useState({
        story: true,
        category: false,
    });
    const [sortByOptionList, setSortByOptionList] = useState<ISelectOption[]>(
        [],
    );
    const [filterCategoryOptionList, setFilterCategoryOptionList] = useState<
        ISelectOption[]
    >([]);
    const [search, setSearch] = useState("");

    // debounce
    const debouncedSearch = useDebounce(search, 500);

    // fetch data
    const fetchMyStory = useCallback(
        async (queryOverride?: IGetMyStory, resetList = false) => {
            try {
                resetList && setStory({ ...story, list: [] });
                setLoading({ ...loading, story: true });

                const finalQuery = {
                    ...story.query,
                    ...queryOverride,
                };

                const { data: response } = await api.story.getMyStory({
                    ...finalQuery,
                    category_id:
                        finalQuery.category_id !== -1
                            ? finalQuery.category_id
                            : undefined,
                    page: !resetList ? finalQuery.page : 1,
                });

                setStory((prev) => ({
                    list: [...prev.list, ...response.data],
                    meta: response.meta,
                    query: {
                        ...finalQuery,
                        category_id: finalQuery.category_id ?? -1,
                    },
                }));
            } catch (error) {
                toast.error("Error get story data");
                console.error(error);
            } finally {
                setLoading({ ...loading, story: false });
            }
        },
        [story.query],
    );
    const fetchCategory = useCallback(async () => {
        try {
            setLoading({ ...loading, category: true });

            const { data: response } = await api.category.getCategory();

            setFilterCategoryOptionList([
                {
                    title: "All Category",
                    value: "all",
                },
                ...response.data.map((item) => {
                    return {
                        title: item.name,
                        value: item.id,
                    };
                }),
            ]);
        } catch (error) {
            toast.error("Error fetch category");
            console.error(error);
        } finally {
            setLoading({ ...loading, category: false });
        }
    }, []);

    // functions
    const loadMore = () => {
        if (story.query.page) {
            fetchMyStory({
                page: story.meta.current_page + 1,
            });
        }
    };
    const setStoryQuery = (index: string, value: string | number) => {
        setStory({ ...story, query: { ...story.query, [index]: value } });
    };

    // watchers
    useEffect(() => {
        setStory({ ...story, list: [] });
        setLoading({ ...loading, story: true });
    }, [search]);
    useEffect(() => {
        fetchMyStory(
            {
                search: debouncedSearch,
            },
            true,
        );
    }, [debouncedSearch]);

    // initial fetch
    useEffect(() => {
        setSortByOptionList([
            {
                title: "Created At",
                value: "created_at",
            },
            {
                title: "Popular",
                value: "popular",
            },
            {
                title: "A-Z",
                value: "a-z",
            },
            {
                title: "Z-A",
                value: "z-a",
            },
        ]);
        setFilterCategoryOptionList([
            {
                title: "All Category",
                value: "all",
            },
        ]);
        fetchCategory();
    }, []);

    return (
        <>
            <div className={styles.myStory}>
                <div className={styles["myStory__title-wrapper"]}>
                    <h1 className={styles.myStory__title}>My Story</h1>
                </div>
                <div>
                    <hr className="divider" />
                </div>
                <div className="">
                    <div className={styles.myStory__topbar}>
                        <a href="/my-story">
                            <Button
                                type="button"
                                text="Create New Story"
                                prependIcon={Plus}
                            />
                        </a>
                        <div className={styles.myStory__filter}>
                            <Textfield
                                type="text"
                                icon={Search}
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Select
                                prependIcon={SortDesc}
                                items={sortByOptionList}
                                value={story.query.sort_by}
                                onChange={(e) => {
                                    const sort_by = e.target
                                        .value as TStorySortByList;
                                    fetchMyStory({ sort_by }, true);
                                }}
                                loading={loading.story}
                            />
                            <Select
                                prependIcon={Boxes}
                                items={filterCategoryOptionList}
                                value={story.query.category_id}
                                onChange={(e) => {
                                    setStoryQuery("category", e.target.value);
                                    const category_id =
                                        e.target.value !== "all"
                                            ? parseInt(e.target.value)
                                            : undefined;
                                    fetchMyStory({ category_id }, true);
                                }}
                                loading={loading.story || loading.category}
                            />
                        </div>
                    </div>
                    <p style={{ height: "1em" }}>
                        {!loading.story && story.meta.total > 0 && (
                            <>
                                Total of {numberFormat(story.meta.total)}{" "}
                                {story.meta.total > 1 ? "stories" : "story"}{" "}
                                found
                            </>
                        )}
                    </p>
                </div>
                <div className={styles["myStory__items-wrapper"]}>
                    {story.meta.total > 0 &&
                        story.list.map((item) => {
                            return <StoryCard story={item} />;
                        })}
                    {loading.story &&
                        Array.from({ length: 12 }).map((_, i) => (
                            <StoryCard key={i} isSkeleton />
                        ))}
                </div>
                {!loading.story && story.meta.total === 0 && (
                    <div className={styles["myStory__nodata-wrapper"]}>
                        <div className={styles.myStory__nodata}>
                            <Image
                                src="/images/nodata.svg"
                                fill
                                alt="no data"
                            />
                        </div>
                        <div className={styles["myStory__nodata-text"]}>
                            <span className={styles["myStory__nodata-title"]}>
                                No Story Found
                            </span>
                            {!story.query.search && (
                                <>
                                    <span
                                        className={
                                            styles[
                                                "myStory__nodata-description"
                                            ]
                                        }
                                    >
                                        Your creative journey starts here. Write
                                        your first chapter and share it with the
                                        world.
                                    </span>
                                    <div
                                        className={
                                            styles["myStory__nodata-button"]
                                        }
                                    >
                                        <Button
                                            text="New Story"
                                            prependIcon={Plus}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
                {story.meta.last_page !== story.meta.current_page && (
                    <div className={styles["myStory__loadmore"]}>
                        <Button
                            text="Load More"
                            prependIcon={ArrowDown}
                            loading={loading.story}
                            onClick={() => loadMore()}
                        />
                    </div>
                )}
            </div>
        </>
    );
}
