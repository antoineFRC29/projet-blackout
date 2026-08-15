import logo from "../../assets/logo-blackout.png";
import styles from "./Logo.module.css";

interface LogoProps {
  /** Display height in px — the illustrated sign scales down to fit tighter headers (e.g. the board screen). */
  height?: number;
}

export function Logo({ height = 44 }: LogoProps) {
  return <img src={logo} alt="Blackout" className={styles.logo} style={{ height }} />;
}
