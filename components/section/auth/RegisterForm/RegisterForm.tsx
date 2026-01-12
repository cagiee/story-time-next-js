import Button from "@/components/ui/Button/Button";
import Textfield from "@/components/ui/Textfield/Textfield";
import { Lock, Mail, User } from "lucide-react";
import styles from "./RegisterForm.module.scss";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRepositories } from "@/contexts";
import { useAuth } from "@/stores/auth";
import { useRouter } from "next/router";
import Alert from "@/components/ui/Alert/Alert";

interface IFormRegister {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [formErrorMessage, setFormErrorMessage] = useState("");
    const api = useRepositories();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormRegister>();
    const router = useRouter();
    const authStore = useAuth();
    const password = watch("password");

    const onSubmit: SubmitHandler<IFormRegister> = async (data) => {
        try {
            setLoading(true);
            const { data: response } = await api.auth.register({
                body: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    password_confirmation: data.confirmPassword,
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
                type="text"
                icon={User}
                placeholder="Enter your name"
                label="Name"
                fluid
                {...register("name", {
                    required: "Name is required.",
                })}
                errorMessage={errors.name?.message}
            />
            <Textfield
                type="email"
                icon={Mail}
                placeholder="Enter your email address"
                label="Email"
                fluid
                {...register("email", {
                    required: "Email is required.",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                    },
                })}
                errorMessage={errors.email?.message}
            />
            <div className={styles["registerForm__2Column"]}>
                <Textfield
                    type="password"
                    icon={Lock}
                    placeholder="Enter your password"
                    label="Password"
                    fluid
                    {...register("password", {
                        required: "Password is required.",
                        deps: ["confirmPassword"],
                        minLength: {
                            value: 8,
                            message: "Password at least 8 character",
                        },
                        maxLength: {
                            value: 16,
                            message: "Password must not exceed 16 characters",
                        },
                    })}
                    errorMessage={errors.password?.message}
                />
                <Textfield
                    type="password"
                    icon={Lock}
                    placeholder="Confirm your password"
                    label="Confirm Password"
                    fluid
                    errorMessage={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                        required: "Confirm Password is required.",
                        validate: (value) =>
                            value === password || "The password do not match",
                    })}
                />
            </div>
            <div className={styles.registerForm__button}>
                <Button
                    type="submit"
                    text="Create Account"
                    color="primary"
                    loading={loading}
                />
            </div>
            <div className={styles.registerForm__text}>
                Already have an account?
                <Link href={"/auth/login"}>Login</Link>
            </div>
        </form>
    );
}
