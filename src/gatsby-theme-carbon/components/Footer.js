import Footer from "gatsby-theme-carbon/src/components/Footer";
import React from "react";

const Content = ({ buildTime }) => (
  <>
    <p>
      Last updated {buildTime}
      <br />
      Copyright © {new Date().getFullYear()} IBM
    </p>
  </>
);

const links = {
  firstCol: [
    {
      href: "https://www.carbondesignsystem.com/how-to-contribute/overview",
      linkText: "Contribute",
    },
    { href: "https://www.ibm.com/privacy", linkText: "Privacy" },
    { href: "https://www.ibm.com/legal", linkText: "Terms of use" },
    { href: "https://www.ibm.com/", linkText: "IBM.com" },
  ],
  secondCol: [
    { href: "https://medium.com/carbondesign", linkText: "Medium" },
    { href: "https://twitter.com/_carbondesign", linkText: "Twitter" },
  ],
};

const CustomFooter = () => <Footer links={links} Content={Content} />;

export default CustomFooter;
