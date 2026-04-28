---
name: conditions
user-invocable: true
description: >
  Analyze a function or method and add preconditions (input validation, type checks, invariants) and postconditions (output validation, guarantees, invariants) based on its types and intended functionality. Ensures robust, self-documenting code with clear contract boundaries.
---

# Skill: Add Preconditions and Postconditions

## Purpose

Automate the process of adding preconditions and postconditions, that adhere to the given template, to functions or methods by analyzing their type signatures and intended functionality. This improves code safety, clarity, and maintainability.

## Workflow

1. **Identify Target Function**
   - Select the function or method to enhance.
   - Review its type signature and documentation/comments.
2. **Analyze Types and Intent**
   - Infer expected input and output constraints from types and comments.
   - Consider edge cases, nullability, and domain-specific rules.
3. **Add Preconditions**
   - Generate comment with precoditions based on analysis in line with template below.
4. **Add Postconditions**
   - Generate comment with postconditions based on analysis in line with template below.
   - Add guarantees and side effects.

## Template

```typescript
/**
 * foo - A function that performs some operation based on its inputs and returns a result.
 * pre:
 *   arg1: arg1 > 0 && arg1 == integer
 *   arg2: any Type2
 * post:
 *   - arg1 position of arg2
 */
function foo(arg1: number, arg2: Type2): ReturnType {
```

## Completion Criteria

- Preconditions and postconditions are present and enforce all relevant constraints.
- Code is self-documenting and robust against invalid usage.
- Postcondition should normally mention all arguments.

## Example Prompts

- "Add preconditions and postconditions to this function."
- "What are the pre/postconditions for this function?"
