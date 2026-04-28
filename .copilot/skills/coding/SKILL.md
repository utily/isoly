Skill: /coding

Scope: TypeScript code style and guidance for this repository.

Subjects:
- identifiers
- functions
- operators
- statements

Overview:
This skill encodes the user's preferences for TypeScript code style. Each subject lives in its own file under this folder. These are guidelines for Copilot and reviewers; they do not replace linters or formatters (e.g., Biome) where applicable.

Key rules (summary):
- Prefer single-word identifiers; two-word identifiers allowed when clarity requires them.
- Any function declared in one file and used from another MUST have full parameter and return type annotations.
- Operators and their spacing/usage are handled by Biome — no additional rules here.
- Prefer expressions over statements where sensible; use statements when clearer or required.

Location: .copilot/skills/coding
