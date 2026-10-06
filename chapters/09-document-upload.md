# 9. Document upload

## Read

## Practice

Implement on the Offer step:

| What | Business description |
|------|----------------------|
| Service calls | Upload a document to a contract and download a document |
| File selection directive | A reusable directive for a file input that reports the chosen file and clears the input |
| Upload | A file picker that accepts only pdf and docx. Documents can only be added while the contract is in Offer |
| Document list | Shows the file names of the contract's documents, each with a download button |
| Sign button | Disabled until the contract has at least 2 documents |
| Visibility | Upload and sign only exist while the contract is in Offer; the document list stays visible afterwards |
| Translations | All new texts in English and German |

Upload a pdf and a docx, download one, and watch the sign button become enabled.

## Tests

- The service uploads a file as a multipart form
- The directive reports the chosen file
- Sign is disabled with one document
- Sign is enabled with two documents

Done when documents can be uploaded and downloaded and signing waits for 2 documents, and the tests are green.
