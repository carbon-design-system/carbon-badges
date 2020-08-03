import BadgeForm from "../../../components/BadgeForm";
import React from "react";
import ResourceLinks from "gatsby-theme-carbon/src/components/LeftNav/ResourceLinks";

const links = [
  {
    title: "GitHub",
    href: "https://github.com/carbon-design-system/gatsby-theme-carbon",
  },
  {
    title: "Carbon",
    href: "https://www.carbondesignsystem.com",
  },
];

const CustomResources = () => {
  return (
    <>
      <BadgeForm />
      <ResourceLinks shouldOpenNewTabs links={links} />
    </>
  );
};

export default CustomResources;
