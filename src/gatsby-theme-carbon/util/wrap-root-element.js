import { ProvideAuth } from "../../util/hooks/use-auth";
import React from "react";
import WrapRootElement from "gatsby-theme-carbon/src/util/wrap-root-element";

function ShadowedWrap(props) {
  return (
    <ProvideAuth>
      <WrapRootElement {...props} />
    </ProvideAuth>
  );
}

export default ShadowedWrap;
