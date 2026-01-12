import { forwardRef, useState } from "react";
import styles from "./Textfield.module.scss";
import { Eye, EyeClosed, LucideIcon } from "lucide-react";

interface ITextfield extends React.InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string;
    label?: string;
    icon?: LucideIcon;
    fluid?: boolean;
    type: "text" | "password" | "email";
    errorMessage?: string;
}

const Textfield = forwardRef<HTMLInputElement, ITextfield>(
    (
        { placeholder, label, icon: Icon, fluid, type, errorMessage, ...props },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <div className={Icon ? styles.textfield : ""}>
                {label && (
                    <label className={styles.textfield__label}>{label}</label>
                )}
                <div className={styles["textfield__input-wrapper"]}>
                    {Icon && <Icon className={styles.textfield__icon} />}
                    {type === "password" && !showPassword && (
                        <Eye
                            className={styles.textfield__eye}
                            onClick={() => setShowPassword(true)}
                        />
                    )}
                    {type === "password" && showPassword && (
                        <EyeClosed
                            className={styles.textfield__eye}
                            onClick={() => setShowPassword(false)}
                        />
                    )}
                    <input
                        className={`${styles.textfield__input} ${
                            errorMessage
                                ? styles["textfield__input--error"]
                                : ""
                        } ${fluid ? styles["textfield__input--fluid"] : ""}`}
                        data-has-icon={!!Icon}
                        type={
                            type === "password" && showPassword ? "text" : type
                        }
                        placeholder={placeholder}
                        ref={ref}
                        {...props}
                    />
                </div>
                {errorMessage && (
                    <span className={styles.textfield__message}>
                        {errorMessage}
                    </span>
                )}
            </div>
        );
    }
);
export default Textfield;
