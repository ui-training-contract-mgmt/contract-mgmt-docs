# 5. Login

## Read

- [Angular OAuth2 OIDC](https://github.com/manfredsteyer/angular-oauth2-oidc)
- [Angular Interceptor](https://angular.dev/guide/http/interceptors)
- [Angular Guard](https://angular.dev/guide/routing/route-guards)
- [Angular Standalone](https://angular.dev/reference/migrations/standalone)
- [Angular Inject](https://angular.dev/reference/migrations/inject-function)
- [Angular TakeUntilDestroyed](https://angular.dev/ecosystem/rxjs-interop/take-until-destroyed)

## Practice

1. Install the OAuth2/OIDC library. The major version must match Angular:

```
npm i angular-oauth2-oidc@21 --legacy-peer-deps
```

2. The values for `angular-oauth2-oidc` and `app.config.json` (local setup, Keycloak seeded in chapter 1). The property names are the ones of the library's `AuthConfig`, so the file can be passed to the library as it is:

| Setting | Local value | Meaning |
|---------|-------------|---------|
| `issuer` | `http://localhost:8081/realms/contract-mgmt` | Keycloak base URL plus realm. The library derives the discovery document from it: `<issuer>/.well-known/openid-configuration` |
| `clientId` | `contract-mgmt-frontend` | Public client created by the Keycloak seed |
| `responseType` | `code` | Authorization code flow. PKCE is used automatically with it |
| `scope` | `openid profile` | `openid` makes it an OIDC login, `profile` adds the username to the token |
| `redirectUri` | `http://localhost:4200/` | Where Keycloak sends the user back after login: the app itself. The seeded client allows `http://localhost:4200/*` |
| `postLogoutRedirectUri` | `http://localhost:4200/` | Where Keycloak sends the user back after logout |
| `requireHttps` | `false` | Allows `http` for local development. Must be `true` in production |
| `showDebugInformation` | `false` | Set to `true` to see the library's login steps in the browser console |

Taken from the discovery document, not configured by hand:

| Endpoint | URL |
|----------|-----|
| Authorization | `<issuer>/protocol/openid-connect/auth` |
| Token | `<issuer>/protocol/openid-connect/token` |
| Logout | `<issuer>/protocol/openid-connect/logout` |
| JWKS (signing keys) | `<issuer>/protocol/openid-connect/certs` |

Read from the access token by the auth service:

| Information | Claim |
|-------------|-------|
| Username | `preferred_username` |
| Roles | `realm_access.roles` (`broker`, `superadmin`) |

3. Implement:

| What | Business description |
|------|----------------------|
| Runtime configuration file | `public/app.config.json` holds the authorization settings: issuer (Keycloak base URL plus realm), client id, scope, redirect path, post-logout redirect path and whether HTTPS is required (off for local development). Nothing of this is hard-coded in the code or the build |
| Config loading | The file is fetched before the app is bootstrapped. Only after it is loaded the app starts, with the settings available to the whole app. If the file cannot be loaded, show a clear error instead of starting |
| Library setup | Register `angular-oauth2-oidc` for the whole app. Configure it from the loaded settings with the authorization code flow (PKCE is used with it), client `contract-mgmt-frontend`, the JWKS validation handler to verify token signatures, and `localStorage` as the token storage |
| Discovery | The endpoints (authorization, token, logout and the JWKS keys) are not configured by hand: the library loads them from the discovery document of the issuer |
| Startup | After the config is loaded, the app loads the discovery document and lets the library finish a login if Keycloak has just redirected back with a code. The redirect target is the app itself, so no callback page is needed. After a successful login the user lands on the contract list |
| Token refresh | The library renews the access token automatically before it expires |
| Auth service | A thin service around the library: whether the user is logged in (as a signal), username, roles read from the access token, login, logout |
| Login page | A page with one button that starts the login |
| Logout | Calls the library's `logOut()` method (no hand-written token removal or redirect). The library clears the stored tokens and sends the user to the Keycloak logout endpoint, using the post-logout redirect URI from the settings, so the Keycloak session ends too |
| Interceptor | Adds the access token to every BFF request, but not to other requests. When the BFF answers 401 the user goes to the login page |
| Route protection | Anonymous users are sent to the login page. A second guard restricts routes to one role and sends other users to the contract list |
| Role directive | Shows an element only for users with a given role (for example superadmin) |
| Header | When logged in: link to contracts, username, the language switch from the i18n chapter and logout |

4. Change a value in `app.config.json` (for example the client id), reload without rebuilding, and see that the login uses it.
5. Log in as `broker` and as `admin` and compare the roles you see.

## Tests

- The config is loaded from the file before the app starts, and a missing file gives an error
- The auth service reports logged in, username and roles from an access token (the library is replaced by a stub)
- The auth service reports logged out when the library has no valid token
- The auth service logout calls `logOut()` of the library
- The interceptor adds the token to BFF requests only
- A 401 answer goes to the login page
- The directive hides an element for a broker and shows it for a superadmin
- The header is hidden when logged out and shows the username when logged in

Done when the Keycloak settings come only from `app.config.json`, anonymous users cannot reach the app, login and logout work through angular-oauth2-oidc, and the tests are green.

## What you will see

| Step | What appears |
|------|--------------|
| Open `http://localhost:4200` logged out | The login page: the title and one login button. No header is shown |
| Click the login button | The Keycloak login form. Sign in as `broker` / `broker` or `admin` / `admin` |
| After the login | The homepage (the contract list, still a placeholder in this chapter) with a header: link to contracts, your username, the language switch and a logout button |
| Click logout | The header disappears and you are back on the login page; opening the app again asks for the login |
| Open the app as `admin` and as `broker` | The same page and header with a different username; the roles differ (the admin link for superadmins follows in the admin chapter) |
