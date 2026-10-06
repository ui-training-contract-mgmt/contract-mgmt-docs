# 1. Setup prerequisites

## Read

- [WSL Install](https://learn.microsoft.com/en-us/windows/wsl/install)
- [Git Hooks](https://typicode.github.io/husky/)
- [Podman](https://podman.io/docs/installation)
- [OpenJDK](https://openjdk.org/install/)
- [Prettier](https://prettier.io/)
- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

## Practice

| Tool | Where it runs | Used for |
|------|---------------|----------|
| WSL | Windows | Linux environment for Podman |
| Podman and podman-compose | Inside WSL | Postgres and Keycloak containers |
| Node.js v24 or newer | Windows | The BFF and the Angular app |
| JDK, Java 11 or newer | Windows | Running the OpenAPI Generator (chapter 3) |
| Git | Windows | Cloning the repositories |
| ESLint (`angular-eslint`) | UI project | Static code checks |
| Prettier | UI project | Consistent formatting |
| Git hooks (husky, lint-staged, commitlint) | UI project | Enforce checks and conventional commits on every commit |

1. Install WSL (PowerShell as administrator), restart and open the Linux distribution once to create your user:

```
wsl --install
```

2. Install Podman inside WSL (Ubuntu example):

```
sudo apt update
sudo apt install -y podman podman-compose
```

3. Install Node.js v24 or newer and [OpenJDK](https://openjdk.org/install/) (Java 11 or newer) on Windows and check them:

```
node -v
java -version
```

4. Clone the BFF on Windows:

```
git clone git@github.com:ui-training-contract-mgmt/contract-mgmt-bff.git
cd contract-mgmt-bff
```

5. Start Postgres and Keycloak. Open WSL, go to the `docker` folder of the clone (Windows drives are under `/mnt/c/...`) and start the containers:

```
cd /mnt/c/<path-to>/contract-mgmt-bff/docker
podman-compose up -d
```

6. Prepare the API on Windows:

```
cd contract-mgmt-api
cp .env.example .env
npm install
```

7. Seed Keycloak (realm, roles, frontend client, demo users). Keycloak must be up first:

```
npm run keycloak:seed
```

8. Start the API. Migrations and mock data run on startup:

```
npm run start:dev
```

9. Check that everything runs:

| What | Where |
|------|-------|
| BFF | `http://localhost:3000/api/v1` |
| Swagger | `http://localhost:3000/api` |
| Keycloak console | `http://localhost:8081` (`admin` / `admin`) |

Demo users: `broker` / `broker`, `admin` / `admin` (superadmin).

10. Optional: run `npm run login:ui`, open `http://localhost:4200`, log in as `broker` and call the endpoints from the page.

11. Create the Angular app. It is created now so the tooling below can be set up before any code is written. `ng new` also initialises its git repository:

```
cd ../..
npx @angular/cli@21 new contract-mgmt-ui --style=scss --ssr=false
cd contract-mgmt-ui
```

12. Set up ESLint with the Angular generator. Do not configure ESLint by hand: the `ng add` command installs the packages, creates the ESLint configuration and adds the `lint` target, which is also what `ng lint` suggests in a project without a linter. Then run it:

```
ng add angular-eslint@21
npm run lint
```

13. Add Prettier:

```
npm i -D prettier eslint-config-prettier
```

| What | Business description |
|------|----------------------|
| Prettier config | One shared configuration file for the project (single quotes, trailing commas) |
| Scripts | A `format` script that rewrites files and a `format:check` script that only reports |
| ESLint | Formatting rules are left to Prettier so the two never disagree |

14. Add the git hooks:

```
npm i -D husky lint-staged @commitlint/cli @commitlint/config-conventional
npx husky init
```

| Hook | Business description |
|------|----------------------|
| pre-commit | Runs ESLint (with fixes) and Prettier on the staged files only. The commit is stopped when a problem remains |
| commit-msg | Checks the message against Conventional Commits (`type(scope): subject`, for example `feat(login): add login page`). Allowed types: feat, fix, docs, style, refactor, test, chore, build, ci, perf, revert. Other messages are rejected |
| Installation | The hooks are installed by a `prepare` script, so every `npm install` activates them for the whole team. The hook files are committed |

From now on every commit of the training goes through the hooks. Never skip them with `--no-verify`.

## Tests

- Swagger lists the contract, beneficiary and insured object endpoints
- The Keycloak console shows the realm `contract-mgmt` with the roles `broker` and `superadmin`
- Optional: the e2e tests in `contract-mgmt-api-e2e` pass (see its README)
- `npm run lint` and `npm run format:check` pass in the UI project
- A commit with the message `stuff` is rejected by the hooks
- A commit with the message `chore: setup tooling` is accepted
- A staged file with a formatting or lint problem is fixed or blocks the commit

Done when the BFF answers, the demo users can log in, and the hooks enforce lint, formatting and conventional commits.
