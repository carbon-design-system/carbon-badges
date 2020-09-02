import { useEffect, useState } from "react";

import { useNavItems as themeUseNavItems } from "gatsby-theme-carbon/src/util/NavItems";
import { useAuth } from "../../util/hooks/use-auth.js";

export function useNavItems() {
  const [user, setUser] = useState({});
  const navItems = themeUseNavItems();
  const { token } = useAuth();

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

  if (token) {
    return navItems.concat({
      title: user.login ? `Log out @${user.login}` : "Log out",
      pages: [{ path: "/logout" }],
    });
  }

  return navItems.concat({
    title: "Log in",
    pages: [{ path: "/login" }],
  });
}
