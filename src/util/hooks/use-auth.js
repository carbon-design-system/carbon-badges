import React, { createContext, useContext, useEffect, useState } from "react";

import { navigate } from "gatsby";

const isBrowser = typeof window !== "undefined";

const AuthContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const useProvideAuth = () => {
  const [token, setToken] = useState(
    isBrowser ? sessionStorage.getItem("github-auth-token") || "" : ""
  );

  useEffect(() => {
    if (isBrowser) {
      sessionStorage.setItem("github-auth-token", token);
    }
  }, [token]);

  const authorize = (location) => {
    const urlParams = new URLSearchParams(location.search);
    const accessToken = urlParams.get("access_token");
    const redirectTo = isBrowser
      ? sessionStorage.getItem("github-redirect-to") || "/"
      : "/";

    if (accessToken) {
      setToken(accessToken);
    }

    navigate(redirectTo, {
      replace: true,
    });
  };

  const login = () => {
    // TODO pass in location and redirect to `location.pathname`
    if (isBrowser) {
      sessionStorage.setItem("github-redirect-to", "/");
    }

    window.location.href = `/api/github/authorize`;
  };

  const logout = () => {
    setToken("");

    navigate("/", {
      replace: true,
    });
  };

  return {
    authorize,
    token,
    login,
    logout,
  };
};
