import React, { useEffect } from "react";

import style from "./pages.module.scss";
import { useAuth } from "../util/hooks/use-auth.js";

const Logout = () => {
  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, [logout]);

  return <p className={style.copy}>Logging out...</p>;
};

export default Logout;
