import styles from "./Chip.module.scss";

interface IChip {
  text: string;
  isActive?: boolean;
  size?: "base" | "sm";
  disableHoverEffect?: boolean;
}

export default function Chip(params: IChip) {
  return (
    <div
      className={`
        ${styles.chip} 
        ${styles["chip__size--" + (params.size || "base")]}
        ${!params.disableHoverEffect ? styles.chip__hover : ""}
      `}
      data-active={params.isActive}
    >
      {params.text}
    </div>
  );
}
