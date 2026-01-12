import { useEffect, useState } from "react";
import styles from "./Auth.module.scss";
import LoginForm from "@/components/section/auth/LoginForm/LoginForm";
import RegisterForm from "@/components/section/auth/RegisterForm/RegisterForm";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/stores/auth";

export default function Auth() {
    const router = useRouter();
    const authStore = useAuth();
    const [currentActiveTab, setCurrentActiveTab] = useState<
        "login" | "register" | undefined
    >();
    const [pageLoaded, setPageLoaded] = useState(false);

    useEffect(() => {
        if (router.asPath === "/auth/login") {
            setCurrentActiveTab("login");
        } else if (router.asPath === "/auth/register") {
            setCurrentActiveTab("register");
        }
        const timer = setTimeout(() => setPageLoaded(true), 1000);
        return () => clearTimeout(timer);
    }, [router.asPath]);

    useEffect(() => {
        const hasLoggedIn = !!authStore.user;
        if (hasLoggedIn) {
            router.replace("/");
        }
    }, []);
    return (
        <>
            <div className={styles.auth}>
                <div
                    className={`${styles.auth__left} ${
                        styles[
                            "auth__left--" +
                                (currentActiveTab === "login"
                                    ? "fade-out-right"
                                    : "fade-in-right")
                        ]
                    }`}
                >
                    <div
                        className={styles.auth__content}
                        style={{
                            transition: pageLoaded ? "0.5s ease-out" : "",
                        }}
                    >
                        <Link href="/" className={styles.auth__back}>
                            <ArrowLeft size={16} />
                            Back to Homepage
                        </Link>
                        <span className={styles.auth__title}>
                            Create Account
                        </span>
                        <div className={styles.auth__form}>
                            <RegisterForm />
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.auth__right} ${
                        styles[
                            "auth__right--" +
                                (currentActiveTab === "register"
                                    ? "fade-out-left"
                                    : "fade-in-left")
                        ]
                    }`}
                >
                    <div className={styles.auth__content}>
                        <Link href="/" className={styles.auth__back}>
                            <ArrowLeft size={16} />
                            Back to Homepage
                        </Link>
                        <span className={styles.auth__title}>Login</span>
                        <div className={styles.auth__form}>
                            <LoginForm />
                        </div>
                    </div>
                </div>
                <div
                    className={`${styles.auth__background} ${
                        styles["auth__background--" + currentActiveTab]
                    }`}
                    style={{
                        animationDuration: pageLoaded ? "0.5s" : "",
                        transition: pageLoaded ? "0.5s" : "",
                    }}
                >
                    <div className={styles["auth__image-wrapper"]}>
                        <Image
                            src={"/images/register.jpg"}
                            alt="register"
                            className={
                                currentActiveTab === "register"
                                    ? "fade-in"
                                    : "fade-out"
                            }
                            fill
                        />
                        <Image
                            src={"/images/login3.jpg"}
                            alt="login"
                            className={
                                currentActiveTab === "login"
                                    ? "fade-in"
                                    : "fade-out"
                            }
                            fill
                        />
                    </div>
                </div>
                {!pageLoaded && <div className={styles.auth__overlay}></div>}
            </div>
        </>
    );
}
