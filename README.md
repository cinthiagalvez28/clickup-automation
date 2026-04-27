  
# QA-Challenge 

Automation testing project using Playwright, JavaScript, and GitHub Actions.

# 🛠️ Tech Stack

* [Playwright](https://playwright.dev/) - Automation framework.
* [TypeScript](https://www.typescriptlang.org/) - Programming language.

# 📋 Pre-Requisites

- Visual Studio Code 
- Node.js (Latest LTS version recommended)
- npm
- Playwright
- Installed browsers (by running: `npx playwright install`)

# 📁 Project Structure

```bash
TODOIST-AUTOMATION/
├── .github/                        # GitHub specific configurations
├── auth/                           # Authentication and session management
│   ├── auth.json                   # Stored session state (cookies/local storage - it is generated each execution)
│   └── auth.setup.ts               # Logic to reuse or create a new session)
├── constants/                      # Static values and test data configuration
│   └── TestData.ts
├── pages/                          # Page Object Model (POM) implementation
│   ├── component/                  # Reusable components (UI fragments)
│   │   └── SideBar.ts
│   ├── BoardPage.ts                # Board page logic
│   ├── ClickUpPage.ts              # ClickUp page logic
│   └── LoginPage.ts                # Login page logic
├── services/                       # Page Object Model (POM) implementation
│   └── clickup/                    # Reusable components (UI fragments)
│       └── SideBar.ts
│           ├── spaces.api.ts       # Board page logic
│           └── tasks.api.ts        # ClickUp page logic
├── tests/                          # Test scripts organized by modules
│   ├── api/
│   │   ├── spaces/
│   │   │   └── spaces.api.spec.js
│   │   └── tasks/
│   │       └── tasks.api.spec.js
│   └── ui/
│       ├── cards/
│       │   └── cards.spec.js
│       └── visual/
│           └── boards.visual.spec.js
├── .env                            # Environment variables (Credentials, URLs)
├── .gitignore                      # Files and folders excluded from Git
├── eslint.config.mjs               # Linter rules configuration
├── package-lock.json               # Project dependencies and scripts
├── package.json                    # Project dependencies and scripts
├── playwright.config.ts            # Playwright global configuration
└── README.md                       # Project documentation
```

# ⚙️ Project Setup

1. Clone this repository.
2. Go to the repository folder.
3. Install dependencies.
```bash 
npm install 
```
4. To run this project, you will need to create a `.env` file in the root directory and add the following environment variables:
```bash
BASE_URL= https://www.saucedemo.com/

USERNAME= replace_username

PASSWORD= replace_password
```

# 📦 Main Dependecies

The following core libraries are required to run and manage this testing framework:
- **@playwright/test**: Core execution framework.
- **eslint** & **eslint-plugin-playwright**: Static code analysis and Playwright best practices.
- **allure-playwright** & **allure-commandline**: Detailed HTML test reporting.
- **faker.js**: Library that generates fake data for testing scenarios.

# 🚀 Running Tests

| Comando | Descripción |
| :--- | :--- |
| `npm run pw` | Motor base. |
| `npm run test:smoke` | Run the most critical test scenarios. |
| `npm run test:regression` | Run all the tests. |
| `npm run test:login` | Run only Login tests. |
| `npm run test:logout` | Run only Logout tests. |
| `npm run test:products` | Run only Products tests. |
| `npm run test:shopping_cart` | Run only Shopping Cart tests. |
| `npm run test:your_information` | Run only Checkout: Your Information tests. |
| `npm run test:overview` | Run only Checkout: Overview tests. |
| `npm run test:checkout` | Run only Checkout: Complete tests. |
| `npm run test:ui_states` | Run only UI_state tests. |
| `npm run report` | Generate and open the last Allure report. |
| `npm run lint` | Execute linter to verify the code quality. 

 ### 📊 Viewing Specific Historical Reports
If you need to view a specific historical report, locate the folder name within the `allure-reports` directory and run the following command:
```bash
npx allure open allure-reports/report_2026-04-20T15-33-07-659Z
```