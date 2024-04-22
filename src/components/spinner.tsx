import { CSSProperties } from "react";
import styles from "./spinner.module.css";

interface ISpinner {
  size?: string;
  borderColor?: string;
  borderTopColor?: string;
}

export default function Spinner({
  size,
  borderColor,
  borderTopColor,
}: ISpinner) {
  const spinnerStyle = {
    "--size": size,
    "--border-color": borderColor,
    "--border-top-color": borderTopColor,
  } as CSSProperties;

  return <div className={styles.spinner} style={spinnerStyle} />;
}
