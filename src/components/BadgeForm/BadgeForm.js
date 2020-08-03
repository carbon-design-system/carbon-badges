import React, { useEffect, useState } from "react";

import { useAuth } from "../../util/hooks/use-auth.js";

const BadgeForm = () => {
  const [emails, setEmails] = useState([]);
  const { login, logout, token } = useAuth();

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

  if (token) {
    return (
      <>
        <div>Emails:</div>
        <ul>
          {emails.map((email) => (
            <li key={email.email}>{email.email}</li>
          ))}
        </ul>
        <button onClick={() => logout()} type="button">
          Log out
        </button>
      </>
    );
  }

  return (
    <button onClick={() => login()} type="button">
      Log in with GitHub
    </button>
  );
};

export default BadgeForm;
