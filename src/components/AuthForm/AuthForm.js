import { Button, SkeletonText } from "carbon-components-react";
import React, { useEffect, useState } from "react";

import { ArrowRight32 } from "@carbon/icons-react";
import PropTypes from "prop-types";
import classNames from "classnames";
import style from "./AuthForm.module.scss";
import { useAuth } from "../../util/hooks/use-auth.js";

const AuthForm = ({ primary = false }) => {
  const [user, setUser] = useState({});
  const { login, logout, token } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/user?access_token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
      });
  }, [token]);

  const cnButton = (kind) => {
    return classNames(style.button, {
      [style.buttonFull]: kind === "secondary",
    });
  };

  const renderButton = (kind = "secondary") => {
    if (token && kind === "primary") return null;

    return (
      <Button
        className={cnButton(kind)}
        kind={kind}
        onClick={() => (token ? logout() : login())}
        renderIcon={token ? null : ArrowRight32}
        size="field"
        type="button"
      >
        {token ? "Log out" : "Log in with GitHub"}
      </Button>
    );
  };

  if (primary) {
    return renderButton("primary");
  }

  if (token) {
    return (
      <div className={style.container}>
        <div className={style.section}>
          {!user.login ? (
            <SkeletonText className={style.skeleton} />
          ) : (
            <p className={style.copy}>Logged in as @{user.login}.</p>
          )}
        </div>
        {renderButton()}
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
      {renderButton()}
    </div>
  );
};

export default AuthForm;

AuthForm.propTypes = {
  primary: PropTypes.bool,
};
