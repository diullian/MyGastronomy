import styles from "./navbar.module.css";
import { LuMenu, LuShoppingCart, LuUser } from "react-icons/lu";
import { Drawer } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarItems}>
        <Link to={"/"}>
          <img src="/logo.png" className={styles.logo} />
        </Link>

        <div className={styles.navbarLinksContainer}>
          <Link to={"/"} className={styles.navbarLink}>
            Home
          </Link>
          <Link to={"/plates"} className={styles.navbarLink}>
            Plates
          </Link>

          <Link to={"/cart"}>
            <LuShoppingCart className={styles.navbarLink}></LuShoppingCart>
          </Link>
          <Link to={"/profile"}>
            <LuUser className={styles.navbarLink}></LuUser>
          </Link>
        </div>
      </div>

      <div className={styles.mobileNavbarItems}>
        <Link to={"/"}>
          <img className={styles.logo} src="/logo.png" alt="" />
        </Link>
        <div className={styles.mobileNavbarBtns}>
          <Link to={"/cart"}>
            <LuShoppingCart className={styles.navbarLink}></LuShoppingCart>
          </Link>
          <LuMenu
            className={styles.navbarLink}
            onClick={handleOpenMenu}
          ></LuMenu>
        </div>
      </div>
      <Drawer anchor="right" open={openMenu} onClose={handleOpenMenu}>
        <div className={styles.drawer}>
          <Link to={"/"}>
            <a href="" className={styles.navbarLink}>
              Home
            </a>
          </Link>
          <Link to={"/plates"}>
            <a href="" className={styles.navbarLink}>
              Plates
            </a>
          </Link>
          <Link to={"/profile"}>
            <a href="" className={styles.navbarLink}>
              Profile
            </a>
          </Link>
        </div>
      </Drawer>
    </nav>
  );
}
