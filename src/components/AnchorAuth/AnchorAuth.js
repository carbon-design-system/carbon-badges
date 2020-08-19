import { AnchorLink, AnchorLinks, Column, Row } from "gatsby-theme-carbon";

import { ArrowRight32 } from "@carbon/icons-react";
import { Button } from "carbon-components-react";
import React from "react";
import { useAuth } from "../../util/hooks/use-auth.js";

const AnchorAuth = () => {
  const { token, login } = useAuth();

  if (!token)
    return (
      <>
        <Row>
          <Column colLg={8}>
            <Button
              kind="primary"
              onClick={() => login()}
              renderIcon={ArrowRight32}
              type="button"
            >
              Log in with GitHub
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <p>
              Don't have a GitHub account?{" "}
              <a href="https://github.com/join">Join GitHub</a>
            </p>
          </Column>
        </Row>
      </>
    );

  return (
    <AnchorLinks>
      <AnchorLink>My badges</AnchorLink>
      <AnchorLink>Badge application</AnchorLink>
      <AnchorLink>Support</AnchorLink>
    </AnchorLinks>
  );
};

export default AnchorAuth;
