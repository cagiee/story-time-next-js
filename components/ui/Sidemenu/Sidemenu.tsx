import styles from "./Sidemenu.module.scss";
import Button from "../Button/Button";
import Link from "next/link";
import { Book, Bookmark, Lock, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/stores/auth";
import Dialog from "../Dialog/Dialog";

export default function Sidemenu() {
    // External variables
    const authStore = useAuth();

    // States
    const [showConfirmLogoutDialog, setShowConfirmLogoutDialog] =
        useState(false);

    // Functions
    const logoutAction = () => {
        authStore.logout();
        setShowConfirmLogoutDialog(false);
    };

    return (
        <>
            <div className={styles.sidemenu}>
                <div className={styles.sidemenu__heading}>Menu</div>
                <ul className={styles["sidemenu__items-wrapper"]}>
                    <Link href={"/profile"}>
                        <li>
                            <User size={18} />
                            Profile
                        </li>
                    </Link>
                    <Link href={"/change-password"}>
                        <li>
                            <Lock size={18} />
                            Change Password
                        </li>
                    </Link>
                    <Link href={"/my-story"}>
                        <li>
                            <Book size={18} />
                            My Story
                        </li>
                    </Link>
                </ul>
                <div className={styles.sidemenu__action}>
                    <Button
                        text="Logout"
                        variant="outlined"
                        color="danger"
                        fluid
                        onClick={() => setShowConfirmLogoutDialog(true)}
                    />
                </div>
            </div>
            <Dialog
                isOpen={showConfirmLogoutDialog}
                onClose={() => setShowConfirmLogoutDialog(false)}
                title="Logout"
                description="Are you sure you want to logout of your account?"
                align="center"
                showConfirmButton
                confirmButtonText="Logout"
                onConfirm={() => logoutAction()}
                confirmButtonColor="danger"
                showCancelButton
            />
        </>
    );
}
