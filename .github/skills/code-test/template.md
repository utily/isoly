# Template

## Applies
Applies to all test files: `*.spec.ts`.

## Template
```
import { isoly } from "../index"

describe("", () => {
	it.each([
		{ argument: "test", expected: "t" }
		] satisfies { argument: "test", expected: string }[])("test($argument) == $expected", ({ argument, expected }) => 
		expect(a.substring(0, 1)).toEqual(expected)
	)
})

```

## Rules
top-level import
: Only import the top level of the library and use an import path ending in `/index` so that the unbuilt version is used for debugging.
