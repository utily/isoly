# Functions

## Applies
Applies to function declarations and expressions in TypeScript files.

## Rules
explicit typing
: Any function that is declared in one file and used from another MUST include explicit type annotations for all parameters and the return type.
single return
: Functions must never return more than once; when a result variable is used, name it `result`.
