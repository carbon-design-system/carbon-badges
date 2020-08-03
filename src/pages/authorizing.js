import React, { useEffect } from "react";

import { useAuth } from "../util/hooks/use-auth.js";

const Authorizing = ({ location }) => {
  const { authorize } = useAuth();

  useEffect(() => {
    authorize(location);
  }, [authorize, location]);

  return (
    <>
      <p style={{ color: "#fff" }}>Authorizing with GitHub, please wait...</p>
    </>
  );
};

export default Authorizing;
