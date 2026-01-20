import Image from "next/image";
import styles from "./Navbar.module.scss";
import Button from "@/components/ui/Button/Button";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@/stores/auth";
import { ArrowDown, Book, Bookmark, ChevronDown, User } from "lucide-react";

const activeAnimationPageList = ["/"];

export default function Navbar() {
    const router = useRouter();
    const authStore = useAuth();
    const { user } = authStore;

    const [isAtTop, setIsAtTop] = useState(false);
    const [enableAnimation, setEnableAnimation] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const handleScroll = () => {
        if (window.scrollY === 0) {
            const isAnimationActive = activeAnimationPageList.includes(
                router.pathname,
            );
            if (!isAtTop && isAnimationActive) {
                setIsAtTop(true);
            }
        } else {
            if (isAtTop) {
                setIsAtTop(false);
            }
        }
    };
    const handleLogout = () => {
        authStore.logout();
    };
    useEffect(() => {
        setLoggedIn(!!authStore.user);

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        setTimeout(() => {
            setEnableAnimation(true);
        }, 100);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <nav className={styles.navbar}>
            <div className={`${styles.navbar__container} container`}>
                <div className="">
                    <div
                        className={`${styles.navbar__logo} ${
                            isAtTop ? styles["navbar__logo--scroll-top"] : ""
                        }`}
                        style={{
                            transition: enableAnimation
                                ? "0.5s ease-in-out"
                                : "",
                        }}
                    >
                        <Link href={"/"}>
                            <Image src="/images/logo.svg" alt="logo" fill />
                        </Link>
                    </div>
                </div>
                <div className={styles.navbar__auth}>
                    {!loggedIn && (
                        <>
                            <Link href={"/auth/register"}>
                                <Button text="Register" color="primary" />
                            </Link>
                            <Link href={"/auth/login"}>
                                <Button
                                    text="Login"
                                    color="primary"
                                    variant="fill-outlined"
                                />
                            </Link>
                        </>
                    )}
                    {loggedIn && (
                        // <div className={styles.navbar__profile}>
                        //     <div className={styles["navbar__profile-image"]}>
                        //         <Image
                        //             src={
                        //                 user?.profile_image ??
                        //                 "https://i.pinimg.com/1200x/a6/aa/5d/a6aa5d80551d471078f799e1473c20fb.jpg"
                        //             }
                        //             alt="profile image"
                        //             fill
                        //         />
                        //     </div>
                        //     <div className={styles["navbar__profile-info"]}>
                        //         <span
                        //             className={styles["navbar__profile-name"]}
                        //         >
                        //             {user?.name}
                        //         </span>
                        //         <span
                        //             className={styles["navbar__profile-email"]}
                        //         >
                        //             {user?.email}
                        //         </span>
                        //     </div>
                        //     <div className={styles["navbar__profile-dropdown"]}>
                        //         <ChevronDown size={20} />
                        //     </div>
                        // </div>
                        <ul className={styles["navbar__items-wrapper"]}>
                            <li>
                                <Link href={"/my-story"}>
                                    <Book />
                                    My Story
                                </Link>
                            </li>
                            <li>
                                <Link href={"/profile"}>
                                    <User />
                                    {user?.name}
                                </Link>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
