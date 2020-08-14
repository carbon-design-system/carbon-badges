import React from "react";
import ResourceLinks from "gatsby-theme-carbon/src/components/LeftNav/ResourceLinks";

const links = [
  {
    title: "Carbon",
    href: "https://www.carbondesignsystem.com",
  },
  {
    title: "GitHub",
    href: "https://github.com/carbon-design-system/gatsby-theme-carbon",
  },
];

const CustomResources = () => {
  return <ResourceLinks shouldOpenNewTabs links={links} />;
};

export default CustomResources;
