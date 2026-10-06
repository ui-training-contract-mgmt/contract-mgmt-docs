# 11. Admin resources with NgRx

## Read

## Practice

1. Install NgRx:

```
npm i @ngrx/store@21 @ngrx/effects@21
```

2. Implement for beneficiaries:

| What | Business description |
|------|----------------------|
| Actions | Load, load success, create, create success, delete, delete success, failure |
| Reducer | Keeps the beneficiary list, a loaded flag and the last error. Success actions update the list |
| Effects | Load, create and delete call the beneficiaries service and answer with a success or failure action |
| Store setup | Register the store, the beneficiaries state and the effects for the whole app |
| Admin page | A form (first name, last name, email, job) and a list with a delete button. Only reads the store and dispatches actions |
| Navigation | A link to the page, shown only to superadmins. The route is also protected with the role guard |
| Contract form | The beneficiary dropdown now reads the store instead of calling the service directly |

3. Repeat the same for insured objects (exercise):

| What | Business description |
|------|----------------------|
| Fields | Name, value (greater than 0) and at least one contract type |
| Service | List, create and delete insured objects |
| Page | Same layout as beneficiaries, showing the contract types of each object |
| Try it | Add an insured object for life insurance, then calculate the premium of a life contract again: the premium changes |

4. Contracts do not use NgRx; they keep their services and signals.

Test as `admin`: add and delete beneficiaries and insured objects. As `broker` the link is hidden and the route redirects to the list.

## Tests

- Reducer: load success stores the list, create success adds, delete success removes, failure keeps the error message
- Effects: a successful service answer gives the success action, a failing service gives the failure action
- Do not use marble tests; feed the effect an action with `of(...)` and read the result with `firstValueFrom`
- Repeat the reducer and effect tests for insured objects
- The contract form still validates after switching to the store

Done when admins can manage both resources through the store, brokers cannot, and the tests are green.
