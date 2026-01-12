import { ReactNode } from "react";
import styles from "./Dialog.module.scss";
import Button from "../Button/Button";

interface IDialog {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    description?: string;
    children?: ReactNode;
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    isLoading?: boolean;
    align?: "left" | "right" | "center";
    cancelButtonText?: string;
    confirmButtonText?: string;
}

export default function Dialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    children,
    isLoading,
    showCancelButton,
    cancelButtonText,
    showConfirmButton,
    confirmButtonText,
    align,
}: IDialog) {
    if (!isOpen) {
        return null;
    }
    return (
        <>
            <div className={styles.dialog}>
                <div
                    className={styles.dialog__overlay}
                    onClick={() => onClose()}
                ></div>
                <div
                    className={`${styles.dialog__card} ${
                        styles["dialog__card--" + align]
                    }`}
                >
                    <span className={styles.dialog__title}>{title}</span>
                    {description && (
                        <span className={styles.dialog__description}>
                            {description}
                        </span>
                    )}
                    <div className={styles.dialog__content}>{children}</div>
                    <div className={styles.dialog__action}>
                        {showConfirmButton && (
                            <Button
                                text={confirmButtonText || "Confirm"}
                                loading={isLoading}
                                onClick={() => (onConfirm ? onConfirm() : "")}
                            />
                        )}
                        {showCancelButton && (
                            <Button
                                text={cancelButtonText || "Cancel"}
                                variant="outlined"
                                onClick={() => onClose()}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
