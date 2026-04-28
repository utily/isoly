Functions

Language: TypeScript

Rules:
- Any function that is declared in one file and used from another MUST include explicit type annotations for all parameters and the return type.
- For purely local helper functions (not exported and not used across files), using contextual typing is allowed, but explicit types are still encouraged when it improves clarity.
- Exported functions should document and type their public surface precisely; prefer named parameter objects for functions with more than two parameters.
- Functions should have only one return point; when a result variable is used, name it `result`.

Rationale:
Requiring full typing across module boundaries reduces accidental type leakage and improves discoverability for callers and tooling.
