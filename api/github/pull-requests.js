require("dotenv").config();

import badgeConfig from "../../config/badges";
import fetch from "node-fetch";

module.exports = async (req, res) => {
  const { access_token: accessToken, tutorial } = req.query;

  if (!accessToken) {
    return res.status(401).json({
      error: "Did not get expected query string named [access_token].",
    });
  }

  if (!tutorial || !badgeConfig.badges[tutorial]) {
    return res.status(400).json({
      error: "Did not get valid query string named [tutorial].",
    });
  }

  const userResponse = await fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      authorization: `token ${accessToken}`,
      "content-type": "application/json",
    },
  }).catch((error) => res.status(401).json({ error: error.message }));

  const { login: user } = await userResponse.json();

  const query = `repo:${badgeConfig.badges[tutorial].githubRepo}+author:${user}+type:pr`;

  const prResponse = await fetch(
    `https://api.github.com/search/issues?q=${query}`,
    {
      method: "GET",
      headers: {
        authorization: `token ${accessToken}`,
        "content-type": "application/json",
      },
    }
  ).catch((error) => res.status(400).json({ error: error.message }));

  const json = await prResponse.json();

  res.status(200).send(json);
};
