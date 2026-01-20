import styles from "./Button.module.scss";
import { Loader2, LucideIcon } from "lucide-react";

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outlined" | "fill-outlined" | "tonal";
    color?: "primary" | "surface" | "danger" | "warning" | "success";
    fluid?: boolean;
    loading?: boolean;
    disabled?: boolean;
    text: string;
    prependIcon?: LucideIcon;
}
const Button: React.FC<IButton> = ({
    variant,
    color,
    fluid,
    loading,
    disabled,
    text,
    type,
    prependIcon: Icon,
    ...props
}) => {
    return (
        <button
            className={`${styles.button} ${
                styles["button__variant--" + (variant ?? "default")]
            } ${styles["button__color--" + (color ?? "primary")]} ${
                fluid ? styles["button__fluid"] : ""
            }`}
            {...props}
            type={type ?? "button"}
            disabled={loading || disabled}
        >
            {Icon && !loading && (
                <Icon className={styles.button__icon} size={16} />
            )}
            {loading && (
                <Loader2 className="loading-spinner-animation" size={18} />
            )}
            {text}
        </button>
    );
};

export default Button;
