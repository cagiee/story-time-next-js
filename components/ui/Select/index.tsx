import { ChevronDown, LucideIcon } from "lucide-react";
import styles from "./Select.module.scss";
import { ISelectOption } from "@/types";

interface ISelect extends React.SelectHTMLAttributes<HTMLSelectElement> {
    variant?: "default" | "outlined" | "fill-outlined" | "tonal";
    color?: "primary" | "surface" | "danger" | "warning" | "success";
    fluid?: boolean;
    loading?: boolean;
    disabled?: boolean;
    placeholder?: string;
    prependIcon?: LucideIcon;
    items?: ISelectOption[];
}

export default function Select({
    variant,
    color,
    fluid,
    loading,
    disabled,
    prependIcon: Icon,
    placeholder,
    items,
    ...props
}: ISelect) {
    return (
        <div className={styles.select__wrapper}>
            {Icon && <Icon size={18} className={styles.select__icon} />}
            <select
                name=""
                id=""
                className={`${styles.select} ${Icon && styles["select--has-icon"]}`}
                {...props}
                disabled={disabled || loading}
            >
                {placeholder && (
                    <option
                        value=""
                        selected
                        disabled
                        style={{ display: "none" }}
                    >
                        {placeholder}
                    </option>
                )}
                {items &&
                    items.map((item) => (
                        <option value={item.value}>{item.title}</option>
                    ))}
            </select>
            <ChevronDown className={styles["select__expand-icon"]} size={18} />
        </div>
    );
}
