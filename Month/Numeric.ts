import type { Date } from "../Date"
import type { DateTime } from "../DateTime"
import type { Month } from "./"

export class Numeric {
	constructor(readonly years: number, readonly months: number) {}
	static get now(): Numeric {
		return
	}
	static create(
		...value:
			| [date: globalThis.Date]
			| [epoch: number]
			| [date: Date]
			| [date: DateTime]
			| [month: Month]
			| [year: number, month: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12]
	): Numeric {
		
	}
}
