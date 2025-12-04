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

3. Create `.env` file from template:
```bash
cp .env.example .env
```

## Running Tests

```bash
npm run example:test
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

- `npm run example:test` - Run example tests
- `npm run lint` - Lint TypeScript files
- `npm run format` - Format code with Prettier

## Environment Variables

Set in `.env`:
- `BASE_URL` - Base URL for tests

## Test Data

Test data is stored in `test-data/dataFromJson.json`

