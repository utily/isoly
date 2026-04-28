export class Numeric {
	private constructor(readonly value: number) {
	}
	static from(year: string | Numeric | number): Numeric | undefined {
		let result: Numeric | undefined = undefined
		if (year instanceof Numeric) {
			result = year
		} else if (typeof year === "string") {
			if (/^[0-9]{4}$/.test(year)) {
				result = new Numeric(Number.parseInt(year))
			}
		} else if (typeof year == "number" && Number.isInteger(year) && year >= 0 && year <= 9999) {
			result = new Numeric(year)
		}
		return result
	}
	toString(): string {
		const result = this.value.toString().padStart(4, "0")
		return result
	}

	toObject(): string {
		const result = this.toString()
		return result
	}
	equals(other: string | Numeric | number): boolean {
		let result = false
		const otherNumeric = Numeric.from(other)
		if (otherNumeric && this.value == otherNumeric.value) {
			result = true
		}
		return result
	}
	static now(): Numeric {
		const result = new Numeric(new globalThis.Date().getFullYear())
		return result
	}
	static parse(value: string): Numeric | undefined {
		const result = Numeric.from(value)
		return result
	}
	static isLeapYear(year: string | Numeric | number): boolean {
		const y = year instanceof Numeric ? year.value : typeof year === "string" ? Number.parseInt(year) : year
		return (typeof y == "number" && y % 4 == 0 && (y % 100 != 0 || y % 400 == 0))
	}
}
