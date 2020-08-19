require("dotenv").config();

import badgeConfig from "../../config/badges";
import fetch from "node-fetch";

module.exports = async (req, res) => {
  const { access_token: accessToken } = req.query;

  const {
    badge: { id: badge }, // angular, react, or vue
    email,
    questionHowDescribe,
    questionLikeBest,
    questionHowImprove,
    questionSuggestion,
    questionFreeform,
  } = req.body;

  if (!accessToken) {
    return res.status(400).json({
      error: "Did not get expected query string named [access_token].",
    });
  }

  if (!badge || !email) {
    return res.status(401).json({
      error: "Did not get expected body [badge] and [email].",
    });
  }

  // get GitHub user to 1) validate token and 2) get first and last name
  const user = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      authorization: `token ${accessToken}`,
      "content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => res.status(401).json({ error: error.message }));

  if (!user || !user.name) {
    return res.status(401).json({
      error: "Could not retrieve GitHub user's name.",
    });
  }

  const badgesResponse = await fetch(
    `https://api.youracclaim.com/v1/organizations/${process.env.ACCLAIM_ORGANIZATION}/badges`,
    {
      method: "POST",
      headers: {
        authorization: `Basic ${Buffer.from(
          `${process.env.ACCLAIM_TOKEN}:`
        ).toString("base64")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        recipient_email: email,
        badge_template_id: badgeConfig[badge].acclaimTemplate,
        issued_to_first_name: user.name.trim().split(" ")[0],
        issued_to_last_name: user.name.trim().split(" ").reverse()[0],
        issued_at: new Date().toISOString(),
      }),
    }
  ).then((response) => response.json());

  if (badgesResponse.data && badgesResponse.data["accept_badge_url"]) {
    // TODO post to survey gizmo
  }

  res.status(200).send(badgesResponse);
};
