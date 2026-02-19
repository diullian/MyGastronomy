import styles from "./footer.module.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.linksContainer}>
        <img src="/imgs/logo.png" alt="" />
        <h2>Important Links!</h2>
        <Link className={styles.link} to={"/"}>
          Home
        </Link>
        <Link className={styles.link} to={"/plates"}>
          Plates
        </Link>
        <Link className={styles.link} to={"/profile"}>
          Profile
        </Link>

        <div>
          Developed by Diullian
          {/* <a href="" target="_blank">See my projects</a> */}
        </div>
      </div>
    </footer>
  );
}
