---
name: coding-style
user-invocable: true
description: "Use when: writing, reviewing, or generating TypeScript code for this repository. Provides repository-specific naming, function, operator, and statement guidance."
---
Usage:

- **Discovery:** The agent will surface this skill when the user's query mentions writing, reviewing, or formatting TypeScript code. Keep `description` keywords aligned with common prompts ("TypeScript", "style", "naming", "functions", "statements").
- **How to invoke:** Ask the assistant to "follow the repository coding-style" or use the slash command `/coding-style` in chat.
- **When to apply:** This skill is scoped to TypeScript files via `applyTo`. Avoid broad `applyTo: "**"` to prevent loading the skill for unrelated files.

Quick Checklist (quality criteria):

- Naming: identifiers follow the `identifiers.md` rules (camelCase for variables, PascalCase for types).
- Functions: prefer small, single-responsibility functions; follow `functions.md` for parameter ordering and return types.
- Operators: prefer explicitness where readability matters; see `operators.md`.
- Statements: consistent control-flow and early returns; see `statements.md`.
