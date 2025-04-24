import { isly } from "isly"
import { Year } from "../../Year"
import type { Month } from ".."
import { Value as _Value } from "./Value"

export class Numeric {
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.months != undefined ? { months: this.months } : {}),
		}
	}
	get length(): 28 | 29 | 30 | 31 {
		const result = this.normalize()
		return ([31, result.year.leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] as const)[result.months ?? 0]
	}
	get year(): Year.Numeric {
		return new Year.Numeric(this.years)
	}
	get normal(): boolean {
		return this.months == undefined || (this.months >= 0 && this.months < 12)
	}
	constructor(readonly years: number | undefined, readonly months: number | undefined) {}
	normalize(): Numeric {
		return this.months
			? new Numeric((this.years ?? 0) + Math.floor(this.months / 12), ((this.months % 12) + 12) % 12)
			: this
	}
	format(): Month {
		const result = this.normalize()
		return `${(result.years ?? 0).toFixed(0).padStart(4, "0")}-${((result.months ?? 0) + 1)
			.toFixed(0)
			.padStart(2, "0")}` as Month
	}
	next(months = 1): Numeric {
		const result = new Numeric(this.years, (this.months ?? 0) + months)
		return result.normalize()
	}
	previous(months = 1): Numeric {
		return this.next(-months)
	}
	static now(): Numeric {
		return Numeric.parse(new Date())
	}
	static parse(value: globalThis.Date | Numeric.Value | number | Month | string | undefined): Numeric {
		const parsed =
			typeof value == "number"
				? ([undefined, value] as const)
				: typeof value == "string"
				? ([Number.parseInt(value.substring(0, 4)), Number.parseInt(value.substring(5, 7)) - 1] as const)
				: Numeric.Value.is(value)
				? ([value?.years, value?.months] as const)
				: value == undefined
				? ([undefined, undefined] as const)
				: ([value.getFullYear(), value.getMonth()] as const)
		return new Numeric(parsed[0], parsed[1])
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Month.Numeric").bind()
}
