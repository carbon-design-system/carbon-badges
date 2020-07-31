# Carbon Badges

## Development

1. `yarn vercel:login` - First log in to Vercel so you can develop Vercel Serverless Functions locally by replicating the Vercel production environment with your localhost.

1. `yarn vercel` - Select the `Carbon Design System` scope and link to `carbon-design-system/carbon-badges`. This triggers a build, but just a preview deployment so production is unaffected.

1. `yarn vercel:env:pull` to have the Vercel CLI create your development `.env` file.

1. `yarn vercel:dev` - Runs `yarn dev` alongside Vercel functions.
