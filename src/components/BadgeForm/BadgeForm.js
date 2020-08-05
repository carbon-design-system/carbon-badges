import { Column, Row } from "gatsby-theme-carbon";
import { H2, Li, Ul } from "gatsby-theme-carbon/src/components/markdown";
import React, { useEffect, useState } from "react";

import { SkeletonText } from "carbon-components-react";
import { useAuth } from "../../util/hooks/use-auth.js";

const BadgeForm = () => {
  const [emails, setEmails] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    fetch(`/api/github/user-emails?access_token=${token}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setEmails(data || []);
      });
  }, [token]);

  if (!token) return null;

  return (
    <>
      <Row>
        <Column>
          <H2>Badge application</H2>
        </Column>
      </Row>
      <Row>
        <Column>
          {emails.length === 0 ? (
            <SkeletonText paragraph={true} width="320px" />
          ) : (
            <Ul>
              {emails.map((email) => (
                <Li key={email.email}>{email.email}</Li>
              ))}
            </Ul>
          )}
        </Column>
      </Row>
    </>
  );
};

export default BadgeForm;
