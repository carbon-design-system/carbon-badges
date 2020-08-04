import { Button, SkeletonText } from "carbon-components-react";
import React, { useEffect, useState } from "react";

import { ArrowRight32 } from "@carbon/icons-react";
import style from "./AuthForm.module.scss";
import { useAuth } from "../../util/hooks/use-auth.js";

const AuthForm = () => {
  const [user, setUser] = useState({});
  const { login, logout, token } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/user?access_token=${token}`, {
      method: "GET",
      credentials: "include",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, [token]);

  if (token) {
    return (
      <div className={style.container}>
        <p className={style.copy}>
          {!user.login ? (
            <SkeletonText className={style.skeleton} />
          ) : (
            <span>Logged in as @{user.login}.</span>
          )}
        </p>
        <Button
          className={style.button}
          kind="secondary"
          onClick={() => logout()}
          size="field"
          type="button"
        >
          Log out
        </Button>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <h2 className={style.heading}>Log in</h2>
      <p className={style.copy}>
        Don't have a GitHub account?{" "}
        <a href="https://github.com/join">Join GitHub</a>
      </p>
      <Button
        className={style.button}
        kind="secondary"
        onClick={() => login()}
        renderIcon={ArrowRight32}
        size="field"
        type="button"
      >
        Log in with GitHub
      </Button>
    </div>
  );
};

export default AuthForm;
