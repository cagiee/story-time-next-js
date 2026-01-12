import Button from "@/components/ui/Button/Button";
import styles from "./ChangePassword.module.scss";
import Textfield from "@/components/ui/Textfield/Textfield";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRepositories } from "@/contexts";
import { toast } from "sonner";

interface IFormChangePassword {
    current_password: string;
    new_password: string;
    new_password_confirmation: string;
}

export default function ChangePassword() {
    const api = useRepositories();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isLoading },
        reset,
    } = useForm<IFormChangePassword>({
        mode: "onChange",
    });
    const newPassword = watch("new_password");

    const onSubmit: SubmitHandler<IFormChangePassword> = async (data) => {
        try {
            const { status } = await api.profile.changePassword({
                body: {
                    old_password: data.current_password,
                    new_password: data.new_password,
                    new_password_confirmation: data.new_password_confirmation,
                },
            });

            if (status === 200) {
                toast.success("Password changed successfully");
                reset();
            }
        } catch (error: any) {
            console.error(error);
            toast.error(error.response.data.message);
        }
    };

    return (
        <>
            <form
                className={styles.changePassword}
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className={styles["changePassword__title-wrapper"]}>
                    <h1 className={styles.changePassword__title}>
                        Change Password
                    </h1>
                    <Button type="submit" text="Save Changes" />
                </div>
                <div>
                    <hr className="divider" />
                </div>

                <Textfield
                    type="password"
                    placeholder="Enter your current password"
                    label="Current Password *"
                    {...register("current_password", {
                        required: "Current Password is required",
                    })}
                    errorMessage={errors.current_password?.message}
                />
                <Textfield
                    type="password"
                    placeholder="Enter your new password"
                    label="New Password *"
                    {...register("new_password", {
                        required: "New Password is required",
                        deps: ["new_password_confirmation"],
                        minLength: {
                            value: 8,
                            message: "Password at least 8 characters",
                        },
                        maxLength: {
                            value: 16,
                            message: "Password must not exceed 16 characters",
                        },
                    })}
                    errorMessage={errors.new_password?.message}
                />
                <Textfield
                    type="password"
                    placeholder="Confirm your new password"
                    label="Confirm Password *"
                    {...register("new_password_confirmation", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                            value === newPassword ||
                            "The password doesn't match",
                    })}
                    errorMessage={errors.new_password_confirmation?.message}
                />
            </form>
        </>
    );
}
