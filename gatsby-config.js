module.exports = {
  siteMetadata: {
    title: "Carbon Badges",
    description: "A site to apply for Carbon badges.",
    keywords: "carbon,design,system,badges,tutorial,acclaim",
    lang: "en",
  },
  pathPrefix: ``,
  plugins: [
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Carbon Design System Badges",
        short_name: "Carbon Badges",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#0062ff",
        display: "browser",
      },
    },
    {
      resolve: "gatsby-theme-carbon",
      options: {
        isSearchEnabled: false,
        repository: {
          baseUrl: "https://github.com/carbon-design-system/carbon-badges",
          branch: "master",
        },
      },
    },
  ],
};
