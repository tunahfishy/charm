import { Link, Button } from "@nextui-org/react";
import "./navbar.css";
import { useEffect, useState } from "react";

const Navbar = () => {
  const get_auth_url = async () => {
    fetch("http://localhost:4000/auth/get_auth_url")
      .then((res) => res.text())
      .then((url) => {
        // redirect the user
        window.open(url, "_blank", "noreferrer");
      });
  };
  return (
    <nav className={"navbar"}>
      <div className={"navbar-inner"}>
        <div className={"navbar-content"}>
          <Link href="/">
            <div className={"logo"}>Charm</div>
          </Link>
        </div>
        <div className={"navbar-content"}>
          <button
            onClick={() => {
              get_auth_url();
            }}
          >
            Authorize Google
          </button>
          <Link href="/email">Emails</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
