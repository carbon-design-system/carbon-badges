import React, { useEffect, useState } from "react";

const isBrowser = typeof window !== "undefined";

const BadgeForm = () => {
  const [emails, setEmails] = useState([]);
  const [token, setToken] = useState(
    isBrowser ? sessionStorage.getItem("github-auth-token") : ""
  );

  const location = {
    pathname: "/",
  };

  useEffect(() => {
    if (isBrowser) {
      sessionStorage.setItem("github-redirect-to", location.pathname);
    }
  }, [location.pathname]);

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

  const handleLogin = () => {
    window.location.href = `/api/github/authorize`;
  };

  const handleLogout = () => {
    if (isBrowser) {
      sessionStorage.setItem("github-auth-token", "");
    }
    setToken("");
  };

  if (token) {
    return (
      <>
        <div>Token: {token}</div>
        <div>Emails:</div>
        <ul>
          {emails.map((email) => (
            <li key={email.email}>{email.email}</li>
          ))}
        </ul>
        <button onClick={handleLogout} type="button">
          Logout
        </button>
      </>
    );
  }

  return (
    <button onClick={handleLogin} type="button">
      Login with GitHub
    </button>
  );
};

export default BadgeForm;
