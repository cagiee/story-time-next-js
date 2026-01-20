import styles from "./SkeletonWrapper.module.scss";

interface ISkeletonWrapper extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function SkeletonWrapper({
    children,
    ...props
}: ISkeletonWrapper) {
    return (
        <div className={`${styles.skeletonWrapper} ${props.className}`}>
            {children}
        </div>
    );
}
