import React, { useEffect } from "react";

import style from "./pages.module.scss";
import { useAuth } from "../util/hooks/use-auth.js";

const Login = () => {
  const { login } = useAuth();

  useEffect(() => {
    login();
  }, [login]);

  return <p className={style.copy}>Logging in...</p>;
};

export default Login;
