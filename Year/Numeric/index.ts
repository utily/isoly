import { isly } from "isly"
import type { Year } from "Year"
import { Value as _Value } from "./Value"

export class Numeric {
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
		}
	}
	get leapYear(): boolean {
		return this.years != undefined ? this.years % 4 == 0 && (this.years % 100 != 0 || this.years % 400 == 0) : false
	}
	constructor(readonly years: number | undefined) {}
	format(): Year {
		return (this.years ?? 0).toFixed(0).padStart(4, "0") as Year
	}
	length(precision: "weeks"): 52 | 53
	length(precision: "days"): 365 | 366
	length(precision: "weeks" | "days"): 52 | 53 | 365 | 366
	length(precision: "weeks" | "days"): 52 | 53 | 365 | 366 {
		return {
			days: (): 365 | 366 => (!this.leapYear ? 365 : 366),
			weeks: (): 52 | 53 =>
				// Day of the week (0 = Sunday, 6 = Saturday)
				// ISO 8601: If Jan 1st is a Thursday or it's a leap year with Wednesday start → 53 weeks
				new Date(this.years ?? 0, 0, 1).getDay() == (this.leapYear ? 3 : 4) ? 53 : 52,
		}[precision]()
	}
	next(years = 1): Numeric {
		return new Numeric((this.years ?? 0) + years)
	}
	previous(years = 1): Numeric {
		return this.next(-years)
	}
	static now(): Numeric {
		return Numeric.create(new globalThis.Date())
	}
	static create(value: globalThis.Date | Numeric | number): Numeric {
		return new Numeric(
			typeof value == "number" ? value : value instanceof globalThis.Date ? value.getFullYear() : value?.years
		)
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Year.Numeric").bind()
}
