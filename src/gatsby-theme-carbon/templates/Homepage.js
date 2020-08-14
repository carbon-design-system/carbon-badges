import DefaultTemplate from "gatsby-theme-carbon/src/templates/Default";
import LandingPage from "../../pages/landing";
import React from "react";
import { useAuth } from "../../util/hooks/use-auth.js";

const ShadowedHomepage = (props) => {
  const { token } = useAuth();

  const HomeTitle = () => <span>Badges</span>;

  const customProps = {
    Title: HomeTitle,
  };

  return token ? (
    <DefaultTemplate {...props} {...customProps} />
  ) : (
    <LandingPage />
  );
};

export default ShadowedHomepage;
