Statements vs Expressions

Language: TypeScript

Rules:
- Strong preference for expressions over statements when they make code clearer and do not reduce readability.
- Use statements when they improve clarity, reduce complexity, or avoid convoluted expression chains.
- Avoid unnecessary braces and prefer concise arrow functions when appropriate (do not sacrifice readability).

Examples:
- Prefer: const x = condition ? exprA() : exprB()
- Use statements when: multiple side effects, complex control flow, or early returns that improve comprehension.
