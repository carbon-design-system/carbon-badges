import React, { useEffect, useState } from "react";

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
      <>
        {user.login && <div>Logged in as @{user.login}</div>}
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

export default AuthForm;
