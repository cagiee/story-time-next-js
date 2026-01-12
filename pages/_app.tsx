import { PT_Serif, Manrope } from "next/font/google";
import { AppProps } from "next/app";
import Head from "next/head";
import { Toaster } from "sonner";
import DefaultLayout from "@/layouts/default";
import BlankLayout from "@/layouts/blank";
import "../styles/main.scss";
import { useRouter } from "next/router";
import { RepositoryProvider } from "@/contexts";
import { useEffect } from "react";
import { useAuthCheck } from "@/hooks/useAuthCheck";
import AuthenticatedLayout from "@/layouts/authenticated";

const manrope = Manrope({
    variable: "--font-manrope",
    subsets: ["latin"],
});

const ptSerif = PT_Serif({
    weight: "400",
    variable: "--font-ptSerif",
    subsets: ["latin"],
});

const blankLayoutPageList = ["/auth/login", "/auth/register"];
const authenticatedLayoutPageList = ["/profile", "/change-password"];

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const { checkAuth } = useAuthCheck();

    const isBlankLayout = blankLayoutPageList.some(
        (path) => router.asPath === path
    );
    const isAuthenticatedLayout = authenticatedLayoutPageList.some(
        (path) => router.asPath === path
    );

    useEffect(() => {
        checkAuth();
    }, []);

    let Layout = undefined;
    if (isBlankLayout) {
        Layout = BlankLayout;
    } else if (isAuthenticatedLayout) {
        Layout = AuthenticatedLayout;
    } else {
        Layout = DefaultLayout;
    }
    return (
        <RepositoryProvider>
            <Head>
                <title>Story Time</title>
                <meta
                    name="description"
                    content="A website filled with ordinary stories."
                />
            </Head>
            <main className={`${manrope.variable} ${ptSerif.variable}`}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
                <Toaster position="top-right" richColors />
            </main>
        </RepositoryProvider>
    );
}
