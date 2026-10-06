# Contract Management – Frontend Training

Build an Angular 21 frontend for the contract management BFF, one feature per chapter.

```mermaid
flowchart LR
    UI[Angular 21 app<br/>ng-aquila] -->|Bearer JWT| BFF[BFF<br/>NestJS :3000/api/v1]
    UI -->|login redirect| KC[Keycloak :8081]
    BFF --> DB[(Postgres)]
    BFF -->|verifies JWT| KC
```

## Chapters

| # | Chapter | You build |
|---|---------|-----------|
| 0 | [Business knowledge](chapters/00-business-knowledge.md) | Roles, contract flow and BFF endpoints |
| 1 | [Setup prerequisites](chapters/01-setup-prerequisites.md) | WSL, Podman, Node, the running BFF and the UI project with ESLint, Prettier and git hooks |
| 2 | [Setup Angular and ng-aquila](chapters/02-setup-ng-aquila.md) | Empty app with ng-aquila theme |
| 3 | [Generate the models](chapters/03-generate-models.md) | TypeScript models generated from the BFF Swagger file |
| 4 | [Internationalization](chapters/04-i18n.md) | English and German texts, language switch |
| 5 | [Login](chapters/05-login.md) | Keycloak login, token in localStorage |
| 6 | [Contract list](chapters/06-contract-list.md) | Homepage with search |
| 7 | [Create a contract](chapters/07-create-contract.md) | Draft form and contract page with stepper |
| 8 | [Premium calculation](chapters/08-premium-calculation.md) | Draft step: premium and move to offer |
| 9 | [Document upload](chapters/09-document-upload.md) | Offer step: documents |
| 10 | [Sign the contract](chapters/10-sign-contract.md) | Signed step, errors, read-only contract |
| 11 | [Admin resources](chapters/11-admin-resources-ngrx.md) | Beneficiaries and insured objects with NgRx |
| 12 | [Auth library](chapters/12-auth-library.md) | Refactor: generic auth logic and header moved into a library |
| 13 | [Claude Code setup](chapters/13-claude-code-setup.md) | CLAUDE.md, settings, skills and MCP servers |

## Technical rules

| Rule | Meaning |
|------|---------|
| Standalone | No NgModules |
| OnPush | Every component uses OnPush change detection |
| Signals | UI state in signals |
| HttpClient | One service per BFF resource; components never call HttpClient |
| Services, interceptor, directives | Logic in services, cross-cutting in the interceptor, reusable UI behaviour in directives |
| i18n | All texts translated with ngx-translate, English and German |
| ng-aquila | UI components come from ng-aquila |
| NgRx | Only beneficiaries and insured objects. Contracts do not use NgRx |
| Code quality | ESLint (added with the Angular generator) and Prettier on every file |
| Git hooks | Use and enforce git hooks, managed with [husky](https://typicode.github.io/husky/): staged files are linted and formatted before every commit, and commit messages must follow Conventional Commits. Never skip the hooks |
| Tests | Every chapter ends with tests |

## Prerequisites

| Need | Version |
|------|---------|
| Windows | With WSL |
| Podman | Installed inside WSL |
| Node.js | v24 or newer, installed on Windows |
| JDK | Java 11 or newer, installed on Windows, for the OpenAPI Generator |
| Git | Current |

## How to work

- One app, `contract-mgmt-ui`, grows chapter by chapter
- Each chapter has Read, Practice and Tests
- Do not move on while the tests are red
