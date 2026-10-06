# 3. Generate the models from Swagger

## Read

## Practice

1. Check that Java 11 or newer is installed (the OpenAPI Generator runs on Java):

```
java -version
```

2. Copy the OpenAPI file of the BFF into the UI project. It is `openapi.json` in the root of the BFF repository (regenerate it with `npm run openapi:export` in `contract-mgmt-api` if you changed the BFF):

```
mkdir openapi
copy ..\contract-mgmt-bff\openapi.json openapi\openapi.json
```

3. Install the [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator) CLI from OpenAPITools:

```
npm i -D @openapitools/openapi-generator-cli --legacy-peer-deps
```

4. Implement:

| What | Business description |
|------|----------------------|
| Generation script | A script `scripts/generate-models.mjs` in the UI project. It removes the previous output, then runs the OpenAPI Generator on `openapi/openapi.json` with the `typescript-angular` generator, writing into a `generated` folder under the models folder |
| Generator options | Models only: no API services (HTTP stays in our own services) and no supporting files. File names in kebab-case, string enums |
| npm script | `generate:models` runs the script, so everyone regenerates the same way |
| Generated folder | Never edited by hand and regenerated whenever the BFF changes. It is excluded from ESLint and Prettier so the hooks do not touch it |
| Model names | A small hand-written file re-exports the generated models under simple names: Contract, Beneficiary, Insured object, Contract document and the create, update and transition inputs |
| Value lists | The generator creates one enum per model field. Re-export them under clear names (contract type, contract status, beneficiary job, document file type) and derive the lists of values for the dropdowns of later chapters |
| User role | `broker` and `superadmin` are not part of the API schema (they come from the token), so define them by hand |
| Usage | From now on all services and components import models from the hand-written file only |

5. Run it and look at the result:

```
npm run generate:models
```

## Tests

- The generation script runs without errors and creates a model for each BFF schema
- Running it twice gives the same result
- The models compile: a contract can be built with a beneficiary, documents and insured objects
- A contract without a required field does not compile
- The calculated premium of a contract is a number or null

Done when the models are generated from Swagger by the script in `scripts/`, nothing else defines them, and the tests are green.
