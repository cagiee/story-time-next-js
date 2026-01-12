import styles from "./Alert.module.scss";

interface IAlert {
    title?: string;
    message: string;
    type: "danger" | "warning" | "success" | "info";
}

export default function Alert(params: IAlert) {
    // const getTitleFromType = () => {
    //     switch (params.type) {
    //         case "danger":
    //             return "Opps, there's some error!";

    //         default:
    //             break;
    //     }
    // };

    return (
        <>
            <div
                className={`${styles.alert} ${
                    styles["alert__color--" + params.type]
                }`}
            >
                {/* <span className={styles.alert__title}>
                    {params.title ?? getTitleFromType()}
                </span> */}
                <span className={styles.alert__message}>{params.message}</span>
            </div>
        </>
    );
}
