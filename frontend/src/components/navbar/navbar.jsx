import styles from "./navbar.module.css";
import { LuMenu, LuShoppingCart, LuUser } from "react-icons/lu";
import { Drawer } from "@mui/material";
import { useState } from "react";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navbarItems}>
        <img src="/logo.png" className={styles.logo} />
        <div className={styles.navbarLinksContainer}>
          <a href="" className={styles.navbarLink}>
            Home
          </a>
          <a href="" className={styles.navbarLink}>
            Plates
          </a>

          <LuShoppingCart className={styles.navbarLink}></LuShoppingCart>
          <LuUser className={styles.navbarLink}></LuUser>
        </div>
      </div>

      <div className={styles.mobileNavbarItems}>
        <img className={styles.logo} src="/logo.png" alt="" />
        <div className={styles.mobileNavbarBtns}>
          <LuShoppingCart className={styles.navbarLink}></LuShoppingCart>
          <LuMenu
            className={styles.navbarLink}
            onClick={handleOpenMenu}
          ></LuMenu>
        </div>
      </div>
      <Drawer anchor="right" open={openMenu} onClose={handleOpenMenu}>
        <div className={styles.drawer}>
          <a href="" className={styles.navbarLink}>
            Home
          </a>
          <a href="" className={styles.navbarLink}>
            Plates
          </a>
          <a href="" className={styles.navbarLink}>
            Profile
          </a>
        </div>
      </Drawer>
    </nav>
  );
}
