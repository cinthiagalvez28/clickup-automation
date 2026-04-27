  
# QA-Challenge 

Automation testing project using Playwright and TypeScript.

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
CLICKUP-AUTOMATION/
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
│       ├── spaces.api.ts           # Spaces endpoints logic
│       └── tasks.api.ts            # Tasks endpoints logic
├── tests/                          # Test scripts organized by modules
│   ├── api/
│   │   ├── spaces/
│   │   │   └── spaces.api.spec.ts
│   │   └── tasks/
│   │       └── tasks.api.spec.ts
│   └── ui/
│       ├── cards/
│       │   └── cards.spec.ts
│       └── visual/
│           └── boards.visual.spec.ts
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
BASE_URL=https://app.clickup.com
USERNAME=username
PASSWORD=password
CLICKUP_TOKEN=clickup_token
CLICKUP_API_BASE_URL=https://api.clickup.com/api/v2
CLICKUP_TEAM_ID=clickup_teamid
CLICKUP_LIST_ID=clickup_listid
```

# 📦 Main Dependecies

The following core libraries are required to run and manage this testing framework:
- **@playwright/test**: Core execution framework.
- **eslint** & **eslint-plugin-playwright**: Static code analysis and Playwright best practices.

# 🚀 Running Tests

| Comando | Descripción |
| :--- | :--- |
| `npm run pw` | Motor base. Run all the tests. |
| `test:cards` | Run only cards tests. |
| `test:generate_visual` | Generates the references for visual testing. |
| `test:visual` | Run only the visual tests. |
| `test:api_spaces` | Run only the spaces endpoint tests. |
| `test:api_tasks` | Run only the tasks endpoint tests. |
| `npm run lint` | Execute linter to verify the code quality. 

 ### 📊 Viewing Specific Historical Reports
To run report:
```bash
npx playwright show-report
```