# 11. Claude Code setup

## Read

- [Angular Agent Skills](https://angular.dev/ai/agent-skills)
- [Angular MCP](https://angular.dev/ai/mcp)
- [Chrome DevTools](https://github.com/ChromeDevTools/chrome-devtools-mcp)
- Contact training supervisor for materials regarding AI

## Practice

1. Install Claude Code and start it in the `contract-mgmt-ui` folder:

```
claude
```

2. Create the project memory with `/init`, then edit the result. `CLAUDE.md` is committed and shared with the team:

| What | Business description |
|------|----------------------|
| Overview | What the app is and which BFF it talks to |
| Structure | The app, where features, services, store and models live |
| Technical rules | The rules of the training README: standalone, OnPush, signals, services for HTTP, i18n for every text, ng-aquila, NgRx only for beneficiaries and insured objects |
| Models | Models are generated from the Swagger file; never edited by hand |
| Quality | ESLint, Prettier, tests for every change, Conventional Commits, no skipped hooks |
| Boundaries | Authentication code (config, auth service, interceptor, guards, directive, header, login page) stays generic and knows nothing about contracts, because it moves into a library in the last chapter |

3. Create `.claude/settings.json` (committed) with the shared project settings:

| What | Business description |
|------|----------------------|
| Allowed commands | Commands that are safe to run without asking: lint, tests, build, format check, model generation |
| Denied | Reading secrets or local config files, and destructive commands such as forced pushes or hard resets |
| Hooks | Optional: run the formatter after Claude edits a file |
| Personal settings | Anything personal goes in `settings.local.json`, which is not committed |

4. Create reusable skills in `.claude/skills/`, one folder per skill with a `SKILL.md` that has a name, a description of when to use it and the steps to follow. Create at least:

| Skill | Business description |
|-------|----------------------|
| New feature component | Creates a standalone OnPush component with signals, ng-aquila, translated texts in English and German, and a test |
| New API service | Creates the service for a BFF resource using only the generated models, with a test |
| Add translation | Adds a key to both language files in the right group and uses it in the template |
| Commit | Reviews the staged changes and writes a Conventional Commit message |

5. Add the Angular CLI MCP server. It lets Claude use the Angular documentation, best practices and project information of your workspace. Share it with the team in `.mcp.json`:

```
claude mcp add --scope project angular-cli -- npx -y @angular/cli mcp
```

6. Add the Chrome DevTools MCP server. It lets Claude open the running app in Chrome, read the console and network, and take screenshots:

```
claude mcp add --scope project chrome-devtools -- npx -y chrome-devtools-mcp@latest
```

7. Check the setup in Claude Code with `/mcp` (both servers connected), `/memory` (`CLAUDE.md` loaded) and `/permissions` (your rules listed).
8. Try it:

| Try | Expected |
|-----|----------|
| Ask for a new standalone page with a translated title | It follows the rules of `CLAUDE.md` and uses your component skill |
| Ask a question about an Angular API | It consults the Angular MCP server |
| Start the app and ask Claude to open it, log in and report console errors | It uses the Chrome DevTools MCP server |
| Ask it to commit | It uses the commit skill and the hooks accept the message |

## Tests

- `CLAUDE.md`, `.claude/settings.json`, the skills and `.mcp.json` are committed; `settings.local.json` is not
- `/mcp` shows `angular-cli` and `chrome-devtools` as connected
- A command from the allowed list runs without a prompt, a denied command is refused
- Each skill is found by its description and produces code that passes lint and tests
- A feature built with Claude passes the same checks as one written by hand

Done when a new teammate who clones the repository gets the same rules, skills and MCP servers with no manual setup, and the checks above pass.