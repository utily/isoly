# Standing Instructions for GitHub Copilot

- Follow the project's coding standards and style guides.
- Use TypeScript for all new code.
- Use descriptive variable and function names.
- Avoid using any deprecated APIs or libraries.
- Use the projects linting rules, don't suggest code breaking them.
- Always have a namespace when creating a type, even if empty
- For all exported `type` and `interface` declarations provide `type`, `is` and `flaw` definitions.

# Coding Standards

- Functions only return in one place.
- Use the name `result` for what the function returns even when it is modified on the last line.
- Never use abbreviations except "UI", "Id", "max", "min".
- Prefer fewer lines of code over shorter lines.
- Prefer expressions over statements.
- Never use unnecessary braces.
- Rely on type system and only use `===` and `!==` when strictly necessary.
- In tests, always import the top level export from the packages index file like this: `import { isoly } from "../index"` with adjustments for path.
- In tests, prefer using `it.each` where possible.
- Don't use braces in lambda function when not required.
- Prefer single word identifier names.
- Only use single letter identifiers if usage is kept within a maximum of 3 lines.
- Make test descriptions short, use function names and single words describing test.
