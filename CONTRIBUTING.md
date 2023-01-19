# Contribution Guideline

Please make sure your code matching with the ESLint rules and prettier
rules by running the commands `npm run all:lint:check` and `npm run
all:prettier;check`. Otherwise run the
`npm run all:lint:fix` and `npm run all:prettier:fix` commands to fix
automatically fixable issues. Fix other issues manually.

## Project Structure

This project contains two libraries and 3 example projects.

- `packages/google-analytics-embed-react`:- React library
- `packages/google-analytics-embed-types`:- Type definitions library
- `sites/express-backend`:- ExpressJS server which providing the Google
Backend authentication
- `sites/react-backend-auth`:- ReactJS example project which showing the
backend authentication.
- `sites/react-frontend-auth`:- ReactJS example project which showing
the frontend authentication.

Please check the whether both examples working before submitting a PR.

## Releases

When you are releasing a new version, NPM packages are automatically
updating according to your release tag. As an example, if you released a
tag `v0.0.2.react` github will automatically publish the react library
to NPM.
