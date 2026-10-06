# 2. Setup Angular and ng-aquila

## Read

- [NgAquila](https://github.com/allianz/ng-aquila)
- [NgAquila Getting Started](https://allianz.github.io/ng-aquila/guides/getting-started)

## Practice

1. Open the `contract-mgmt-ui` project created in chapter 1.

2. Install the libraries:

```
npm i @aposin/ng-aquila @angular/cdk@21 @angular/animations@21 --legacy-peer-deps
```

3. Register the ng-aquila theme and the normalize stylesheet (both in `node_modules/@aposin/ng-aquila`) in the styles of `angular.json`.

4. Implement:

| What | Business description |
|------|----------------------|
| Environment settings | One place for the BFF URL (the Keycloak settings follow in the login chapter) |
| First page | A title and an ng-aquila button |
| Conventions | Standalone components, OnPush, signals; the HTTP client is provided for the whole app |

5. Run the app and check the page in the browser.

## Tests

- The first page shows the title and the button
- The tests run green

Done when the page shows a styled ng-aquila button and the tests are green.
