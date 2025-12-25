import React, { useContext } from "react";

import style from "./header.module.css";
import amazonlogo from "../../../assets/img/amazon.png";
import america2 from "../../../assets/img/america2.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { context } from "../../../Utility/Reducer";
import { auth } from "./../../../Utility/firebase";

function Header() {
  const { state } = useContext(context);

  const navigate = useNavigate();
  return (
    <>
      {/* HEADER */}
      <header className={style.header}>
        <div className={style["header-left"]}>
          <div className={style.logo}>
            <Link to="/">
              <img src={amazonlogo} alt="Amazon Logo" />
            </Link>
          </div>

          <div className={style.deliver}>
            <LocationOnOutlinedIcon />
            <div className={style.deliveryText}>
              <span className={style["small-text"]}>Delivered to</span>
              <span className={style["large-text"]}>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={style["search-bar"]}>
          <select className={style["search-category"]}>
            <option>All</option>
          </select>
          <input type="text" placeholder="Search Product" />
          <button className={style["search-btn"]}>
            <SearchOutlinedIcon />
          </button>
        </div>

        <div className={style["header-right"]}>
          <div className={style.lang}>
            <div className={style.flag}>
              <img src={america2} alt="America Flag" />
            </div>
            <select className={style["lang-select"]}>
              <option>EN</option>
            </select>
          </div>

          <div className={style.signin}>
            <Link to={state[1].user || "/auth"}>
              <span className={style.small}>
                {state[1].user !== null || undefined
                  ? `hello, ${state[1].user.email.split("@")[0]}`
                  : "Sign in"}
              </span>
              <div
                onClick={() => {
                  auth.signOut();
                  navigate("/auth");
                }}
                className={style.account}
              >
                {state[1].user !== null || undefined
                  ? "Sign Out"
                  : "Account & Lists"}
              </div>
            </Link>
          </div>

          <div className={style["returnandorder"]}>
            <Link to="/orders">
              <span className={style.small}>Returns</span>
              <div className={style.orders}>& Orders</div>
            </Link>
          </div>

          <div className={style.cart}>
            <Link to="/cart">
              <ShoppingCartOutlinedIcon />
              <span className={style.cartCount}>{state[0].length}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* NAVBAR */}
      <section className={style.navbar}>
        {/* checkbox toggle for mobile nav  */}
        <input id="nav-toggle" type="checkbox" className={style.navToggle} />

        {/* label acts as the visible hamburger + "All" on mobile and is hidden on wide screens */}
        <label htmlFor="nav-toggle" className={style.navToggleLabel}>
          <MenuIcon />
          <span>All</span>
        </label>

        <ul className={style.navList}>
          <li className={style.tobehidden}>
            <Link to="/">
              <MenuIcon />
              <p>All</p>
            </Link>
          </li>

          <li>
            <Link to="/">Today's Deals</Link>
          </li>
          <li>
            <Link to="/">Customer Service</Link>
          </li>
          <li>
            <Link to="/">Registry</Link>
          </li>
          <li>
            <Link to="/">Gift Cards</Link>
          </li>
          <li>
            <Link to="/">Sell</Link>
          </li>
        </ul>
      </section>

      <Outlet />
    </>
  );
}

export default Header;
