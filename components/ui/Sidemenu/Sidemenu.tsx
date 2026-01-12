import styles from "./Sidemenu.module.scss";
import Button from "../Button/Button";
import Link from "next/link";
import { Book, Bookmark, Lock, User } from "lucide-react";

export default function Sidemenu() {
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
                    <Link href={"/profile"}>
                        <li>
                            <Lock size={18} />
                            Change Password
                        </li>
                    </Link>
                    <Link href={"/profile"}>
                        <li>
                            <Book size={18} />
                            My Story
                        </li>
                    </Link>
                    <Link href={"/profile"}>
                        <li>
                            <Bookmark size={18} />
                            Saved Story
                        </li>
                    </Link>
                </ul>
                <div className={styles.sidemenu__action}>
                    <Button
                        text="Logout"
                        variant="outlined"
                        color="danger"
                        fluid
                    />
                </div>
            </div>
        </>
    );
}
