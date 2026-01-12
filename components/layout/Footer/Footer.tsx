import styles from "./Footer.module.scss";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={`${styles.footer__content} container`}>
                <span className={styles.footer__text}>
                    @2025 PT Timedoor Indonesia. All right reserved
                </span>
                <div className={styles.footer__social}>
                    <Facebook />
                    <Instagram />
                    <Youtube />
                </div>
            </div>
        </div>
    );
}
