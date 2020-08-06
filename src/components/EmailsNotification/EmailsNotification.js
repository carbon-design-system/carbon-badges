import React, { useEffect, useState } from "react";

import { InlineNotification } from "gatsby-theme-carbon";
import { useAuth } from "../../util/hooks/use-auth.js";

const EmailsNotification = () => {
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

  if (!token || emails.length === 0) return null;

  const emailArray = emails
    .filter((email) => email.verified)
    .map((email) => email.email);

  return (
    <InlineNotification>
      Using GitHub verified email addresses{" "}
      <strong>{emailArray.join(", ")}</strong>. If you'd like to use additional
      email addresses with Carbon badges, please{" "}
      <a
        href="https://docs.github.com/en/github/getting-started-with-github/verifying-your-email-address"
        rel="noreferrer"
        target="_blank"
      >
        verify them with GitHub
      </a>{" "}
      and then return to this page.
    </InlineNotification>
  );
};

export default EmailsNotification;
