require("dotenv").config();

const baseUrl = "https://github.com";
const authorizePath = "/login/oauth/authorize";
const scope = "user:email";
const allowSignup = "false";

module.exports = (req, res) => {
  if (!process.env.GITHUB_CLIENT_ID) {
    return res.json({ error: "GITHUB_CLIENT_ID is not set in environment." });
  }

  const authorizationUrl = `${baseUrl}${authorizePath}?client_id=${process.env.GITHUB_CLIENT_ID}&scope=${scope}&allow_signup=${allowSignup}`;

  res.setHeader("location", authorizationUrl);
  res.status(302).send("");
};
