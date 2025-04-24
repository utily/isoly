import { isly } from "isly"
import { Month } from "Month"
import { Year } from "../../Year"
import type { Date } from ".."
import { Value as _Value } from "./Value"

export class Numeric {
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.months != undefined ? { months: this.months } : {}),
			...(this.days != undefined ? { days: this.days } : {}),
		}
	}
	get length(): 28 | 29 | 30 | 31 {
		const result = this.normalize()
		return ([31, result.year.leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const)[result.months ?? 0]
	}
	get month(): Month.Numeric {
		return new Month.Numeric(this.years, this.months)
	}
	get year(): Year.Numeric {
		return new Year.Numeric(this.years)
	}
	constructor(
		readonly years: number | undefined,
		readonly months: number | undefined,
		readonly days: number | undefined
	) {}
	normalize(): Numeric {
		return this.months == undefined || (this.months >= 0 && this.months < 12)
			? this
			: new Numeric(this.years ?? 0 + (this.months ?? 0) / 12, (((this.months ?? 0) % 12) + 12) % 12, this.days)
	}
	format(): string {
		const result = this.normalize()
		return `${(result.years ?? 0).toFixed(0).padStart(4, "0")}-${((result.months ?? 0) + 1)
			.toFixed(0)
			.padStart(2, "0")}`
	}
	next(days = 1): Numeric {
		const result = new Numeric(this.years, this.months, (this.days ?? 0) + days)
		return result.normalize()
	}
	previous(days = 1): Numeric {
		return this.next(-days)
	}
	static now(): Numeric {
		return Numeric.parse(new globalThis.Date())
	}
	static parse(value: globalThis.Date | Numeric.Value | number | Date | string | undefined): Numeric {
		const parsed =
			typeof value == "number"
				? ([undefined, undefined, value] as const)
				: typeof value == "string"
				? ([
						Number.parseInt(value.substring(0, 4)),
						Number.parseInt(value.substring(5, 7)) - 1,
						Number.parseInt(value.substring(8, 10)) - 1,
				  ] as const)
				: value instanceof globalThis.Date
				? ([value.getFullYear(), value.getMonth(), value.getDate()] as const)
				: ([value?.years, value?.months, value?.days] as const)
		return new Numeric(parsed[0], parsed[1], parsed[2])
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
