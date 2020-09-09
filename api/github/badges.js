require("dotenv").config();

import Bottleneck from "bottleneck";
import badgeConfig from "../../config/badges";
import fetch from "node-fetch";

const limiter = new Bottleneck({
  minTime: 333,
});

module.exports = async (req, res) => {
  const { access_token: accessToken } = req.query;

  if (!accessToken) {
    return res.status(400).json({
      error: "Did not get expected query string named [access_token].",
    });
  }

  const emailsResponse = await fetch("https://api.github.com/user/emails", {
    method: "GET",
    headers: {
      authorization: `token ${accessToken}`,
      "content-type": "application/json",
    },
  }).catch((error) => res.status(401).json({ error: error.message }));

  const emails = await emailsResponse.json();

  let verifiedEmails = emails
    .filter((email) => email.verified)
    .map((email) => email.email);

  if (!verifiedEmails || !verifiedEmails.length) {
    res.status(400).json({ error: "Bad request." });
  }

  const acclaimTemplates = Object.keys(badgeConfig.badges).map(
    (name) => badgeConfig.badges[name].acclaimTemplate
  );

  const allBadges = await limiter.schedule(() => {
    const acclaimRequests = verifiedEmails.map((email) => {
      return fetch(
        `https://api.youracclaim.com/v1/organizations/${
          process.env.ACCLAIM_ORGANIZATION
        }/badges?filter=badge_template_id::${acclaimTemplates.join(
          ","
        )}|recipient_email::${email}`,
        {
          method: "GET",
          headers: {
            authorization: `Basic ${Buffer.from(
              `${process.env.ACCLAIM_TOKEN}:`
            ).toString("base64")}`,
            "content-type": "application/json",
          },
        }
      ).then((response) => response.json());
    });

    return Promise.all(acclaimRequests);
  });

  res.status(200).send(allBadges);
};
