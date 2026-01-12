import Button from "@/components/ui/Button/Button";
import Textfield from "@/components/ui/Textfield/Textfield";
import { Lock, Mail } from "lucide-react";
import styles from "./LoginForm.module.scss";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRepositories } from "@/contexts";
import Alert from "@/components/ui/Alert/Alert";
import { useAuth } from "@/stores/auth";
import { useRouter } from "next/router";

interface IFormLogin {
    email: string;
    password: string;
}

export default function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const api = useRepositories();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormLogin>();
    const router = useRouter();
    const authStore = useAuth();

    const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
        try {
            setLoading(true);
            setFormErrorMessage("");
            const { data: response } = await api.auth.login({
                body: {
                    email: data.email,
                    password: data.password,
                },
            });
            authStore.setToken(response.data.token);
            authStore.setUser(response.data.user);

            router.replace("/profile");
        } catch (error: any) {
            setFormErrorMessage(
                JSON.parse(error?.request?.responseText)?.message
            );
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formErrorMessage && (
                <Alert type="danger" message={formErrorMessage} />
            )}
            <Textfield
                type="email"
                icon={Mail}
                placeholder="Enter your email address"
                label="Email"
                {...register("email", {
                    required: "Email is required.",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                    },
                })}
                errorMessage={errors.email?.message}
                fluid
                autoComplete={"off"}
                disabled={loading}
            />
            <Textfield
                type="password"
                icon={Lock}
                placeholder="Enter your password"
                label="Password"
                {...register("password", {
                    required: "Password is required.",
                })}
                fluid
                errorMessage={errors.password?.message}
                disabled={loading}
            />
            <div className={styles.loginForm__button}>
                <Button
                    type="submit"
                    text="Login"
                    color="primary"
                    loading={loading}
                />
            </div>
            <div className={styles.loginForm__text}>
                Don't have an account?
                {!loading && <Link href={"/auth/register"}>Register</Link>}
                {loading && <span>Register</span>}
            </div>
        </form>
    );
}
