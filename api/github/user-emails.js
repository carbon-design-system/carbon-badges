import fetch from "node-fetch";

module.exports = async (req, res) => {
  const { access_token: accessToken } = req.query;

  if (!accessToken) {
    return res.status(400).json({
      error: "Did not get expected query string named [access_token].",
    });
  }

  const response = await fetch("https://api.github.com/user/emails", {
    method: "GET",
    headers: {
      authorization: `token ${accessToken}`,
      "content-type": "application/json",
    },
  }).catch((error) => res.json({ error: error.message }));

  const json = await response.json();

  res.status(200).send(json);
};
