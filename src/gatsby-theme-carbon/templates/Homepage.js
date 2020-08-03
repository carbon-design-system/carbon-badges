import DefaultTemplate from "gatsby-theme-carbon/src/templates/Default";
import React from "react";

const HomeTitle = () => <span>Badges</span>;

const customProps = {
  Title: HomeTitle,
};

function ShadowedHomepage(props) {
  return <DefaultTemplate {...props} {...customProps} />;
}

export default ShadowedHomepage;
