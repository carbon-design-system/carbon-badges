import { Button, SkeletonText } from "carbon-components-react";
import React, { useEffect, useState } from "react";

import { ArrowRight32 } from "@carbon/icons-react";
import style from "./BadgeForm.module.scss";
import { useAuth } from "../../util/hooks/use-auth.js";

const BadgeForm = () => {
  const [emails, setEmails] = useState([]);
  const { login, token } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/user-emails?access_token=${token}`, {
      method: "GET",
      credentials: "include",
      mode: "no-cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setEmails(data || []);
      });
  }, [token]);

  if (!token) {
    return (
      <div className={style.container}>
        <Button
          className={style.button}
          onClick={() => login()}
          renderIcon={ArrowRight32}
          size="field"
          type="button"
        >
          Log in with GitHub
        </Button>
      </div>
    );
  }

  if (emails.length === 0) {
    return (
      <div className={style.container}>
        <SkeletonText paragraph={true} width="320px" />
      </div>
    );
  }

  return (
    <div className={style.container}>
      <ul>
        {emails.map((email) => (
          <li key={email.email}>{email.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default BadgeForm;
