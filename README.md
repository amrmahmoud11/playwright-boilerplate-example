# Playwright Boilerplate Example

A simple Playwright test automation project with TypeScript and the Page Object Model pattern.

## Setup

1. Clone the repository:
```bash
git clone https://github.com/amrmahmoud11/playwright-boilerplate-example.git
cd playwright-boilerplate-example
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Create `.env` file from template:
```bash
cp .env.example .env
```

## Running Tests

```bash
# Run all tests
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# View test report
npm run report
```

## Project Structure

```
src/
├── helpers/
│   ├── common.ts       # Common helper functions
│   ├── config.ts       # Configuration
│   └── logger.ts       # Logging
├── pages/
│   ├── BasePage.ts     # Base page class
│   └── examples/
│       └── ExamplePage.ts
└── tests/
    └── Example/
        └── Example.test.ts
```

## Scripts

- `npm test` - Run all tests
- `npm run test:ui` - Run UI tests (Example.test.ts)
- `npm run test:api` - Run API tests (Api.test.ts)
- `npm run test:headed` - Run tests with visible browser
- `npm run test:debug` - Run tests in debug mode
- `npm run report` - Show HTML test report
- `npm run lint` - Lint TypeScript files
- `npm run format` - Format code with Prettier

## Environment Variables

Set in `.env`:
- `BASE_URL` - Base URL for tests

## Test Data

Test data is stored in `test-data/dataFromJson.json`

## CI/CD

This project uses GitHub Actions for continuous testing. The workflow:
- Runs on push/PR to `main` branch
- Executes UI tests on Ubuntu
- Uploads test reports as artifacts (30-day retention)

See [.github/workflows/playwright.yml](.github/workflows/playwright.yml) for configuration.

