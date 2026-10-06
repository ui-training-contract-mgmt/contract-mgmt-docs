# 8. Premium calculation

## Read

- nothing new here, but keep in mind to use signal form logic here

## Practice

Implement on the Draft step:

| What | Business description |
|------|----------------------|
| Service calls | Calculate the premium of a contract and move a contract to a target stage |
| Premium display | Shows the premium, or a dash while it is not calculated. The user can never type a premium |
| Calculate button | Asks the BFF to calculate the premium and shows the contract returned |
| Move to offer button | Disabled until a premium exists. Moves the contract to Offer and the stepper follows |
| Visibility | The Draft actions only exist while the contract is in Draft |
| Fresh data | After every action the page shows the contract the BFF returned |
| Translations | All new texts in English and German |

Create a contract, calculate the premium, then move it to Offer.

## Tests

- The service sends the target stage for a transition
- The move to offer button is disabled without a premium
- The move to offer button is enabled with a premium
- Calculating shows the premium returned by the BFF

Done when the move to offer is only possible with a premium and the tests are green.
