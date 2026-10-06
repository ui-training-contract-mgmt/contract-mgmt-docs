# 12. Auth library

This is a refactoring chapter: the app is finished, now the generic authentication code moves into a library. All features keep working and all tests stay green.

## Read

## Practice

1. Generate the library with the Angular generator:

```
ng generate library auth --prefix=auth
```

2. Move the generic authentication code from the app into the library. The library must not import anything from the app:

| Moves into the library | Stays in the app |
|------------------------|------------------|
| Runtime config loading and the config service | `app.config.json` itself and the call that loads it before bootstrap |
| Auth service: login, current user, roles, logout (a thin wrapper around angular-oauth2-oidc) | The contract and admin routes and the page opened after login |
| Interceptor | The BFF URL that decides which requests get the token |
| Auth guard and role guard | The admin routes that use the role guard |
| Role directive | Contract and admin pages |
| Login page | The language switch (see the header) |
| Header component (extracted from the app root) | The navigation links and the language switch shown inside it |

3. Make the library generic:

| What | Business description |
|------|----------------------|
| No domain knowledge | No contract, beneficiary or other business names. Roles are plain text, not the app's generated role type |
| Configuration | Everything app-specific is passed in: the BFF URL prefix for the interceptor, the page opened after login, the page for users without the required role |
| Provider function | One function registers the library (config, interceptor and services) so the app needs a single line in its configuration |
| Header | Shows the username and a logout button. The navigation links (contracts, and the admin links shown only to superadmins) and the language switch are supplied by the app through content projection. It is a standalone, OnPush, ng-aquila component with translated texts |
| Texts | The library ships its own translation keys (login, logout, header) and the app merges them into its translation files |
| Public API | The library exports only what the app needs: provider function, guards, directive, header, login page, auth service. Everything else stays internal |
| Dependencies | The library declares Angular, ng-aquila, ngx-translate and `angular-oauth2-oidc` as peer dependencies |

4. Refactor the app:

| Where | What changes |
|-------|--------------|
| Imports | Every file that used the auth service, role directive or guards now imports from the library alias. Find them with a project-wide search |
| App root | Replaces its own header markup with the library header and passes the navigation links and the language switch in |
| Routes | The login route, guards and the admin role guard come from the library |
| App config | The auth providers are replaced by the library's provider function |
| Feature tests | Tests that stubbed the auth service or the role directive (contract page, header, admin) now stub the library versions |
| Moved code | Delete it from the app so there is only one copy, and move its tests with it |

5. Build the library, then run and lint the whole workspace:

```
ng build auth
ng test auth
ng test
npm run lint
```

6. Walk through the whole flow again as `broker` and as `admin`: login, list, create, premium, documents, sign, admin pages, logout. Behaviour must be exactly the same as before the move.

## Tests

- The tests of the moved code now run in the library (`ng test auth`) and the app tests still pass
- The library builds on its own
- The header shows the username and logout, and displays projected navigation links
- The interceptor uses the configured URL prefix and ignores other requests
- The role guard sends users without the role to the configured page
- A search of the library for the words contract, beneficiary and insured object finds nothing

Done when the app uses the auth library for everything authentication related, the library has no knowledge of the contract domain, and the tests are green.
