import { Year } from "./index"

export class Numeric {
	readonly value: number
	get length(): 365 | 366 {
		const y = this.value
		return y % 4 == 0 && (y % 100 != 0 || y % 400 == 0) ? 366 : 365
	}
	private constructor(year: number) {
		this.value = year
	}
	next(years = 1): Numeric {
		return new Numeric(this.value + years)
	}
	previous(years = 1): Numeric {
		return this.next(-years)
	}
	toString(): Year {
		return this.value.toString().padStart(4, "0") as Year
	}
	toObject(): Year {
		return this.toString()
	}
	static parse(year: Year): Numeric
	static parse(year: Year | string): Numeric | undefined
	static parse(year: Year | string): Numeric | undefined {
		return /^\d{4}$/.test(year) ? new Numeric(Number.parseInt(year)) : undefined
	}
}
export namespace Numeric {}
