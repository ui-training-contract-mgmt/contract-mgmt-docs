# 7. Create a contract

## Read

- [Signal Forms](https://angular.dev/essentials/signal-forms)
- [Signal Forms Control Value Accesor](https://blog.logrocket.com/angular-signal-forms/)
- [Data Resolvers](https://angular.dev/guide/routing/data-resolvers)

## Practice

Implement:

| What | Business description |
|------|----------------------|
| Beneficiaries service | One service for BFF calls on beneficiaries (list, create, delete) |
| Create service call | Creates a contract from name, contract type and beneficiary |
| Create form | Fields: name (required, max 200 characters), contract type (life or non-life), beneficiary (chosen from the existing beneficiaries). The button is disabled until the form is valid |
| After creation | Opens the page of the new contract |
| Contract page | Loads the contract by the id in the address and shows its name |
| Stepper | An ng-aquila stepper with four steps: Draft, Offer, Review, Signed. The selected step always follows the status of the contract from the BFF; earlier steps show as completed |
| Routes | The "new" page must not be mixed up with a contract id |
| Translations | All new texts in English and German |

Create a contract and check that it appears in the list as Draft and opens on the first step.

## Tests

- The service creates a contract with name, type and beneficiary
- The form is invalid until all three fields are filled

Done when a new Draft contract can be created and the stepper shows its stage, and the tests are green.
