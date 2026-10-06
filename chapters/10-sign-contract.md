# 10. Sign the contract

## Read

## Practice

Implement:

| What | Business description |
|------|----------------------|
| Sign | The sign button moves the contract to Signed; the stepper shows the last step |
| Signed step | A message that the contract is signed and can no longer be changed |
| Read-only | In Signed no action is shown: no calculate, no upload, no sign |
| Error messages | When the BFF refuses an action, show its message above the stepper in an ng-aquila message. A successful action clears it |
| Delete | A delete button only for superadmins (use the role directive). After deleting, return to the contract list |
| Service call | Delete a contract |
| Translations | All new texts in English and German |

Test as `broker` (no delete button) and as `admin`. To see an error message, temporarily enable the sign button with only one document.

## Tests

- A refused action shows the BFF message
- A signed contract shows no action buttons and no upload
- The delete button is hidden for a broker

Done when a contract can be taken from Draft to Signed, errors are visible, and the tests are green.
