import { isly } from "isly"
import { typedly } from "typedly"
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
	get normalized(): boolean {
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
	next(changes: Numeric.Value | number = { months: 1 }): Numeric {
		return this.set(
			typedly.Object.map<Numeric.Value, Numeric.Value>(
				typeof changes == "number" ? { months: changes } : changes,
				([key, value]) => [
					key,
					this[key] == undefined && value == undefined ? undefined : (this[key] ?? 0) + (value ?? 0),
				]
			)
		)
	}
	previous(changes: Numeric.Value | number = { months: 1 }): Numeric {
		return this.set(
			typedly.Object.map<Numeric.Value, Numeric.Value>(
				typeof changes == "number" ? { months: changes } : changes,
				([key, value]) => [
					key,
					this[key] == undefined && value == undefined ? undefined : (this[key] ?? 0) - (value ?? 0),
				]
			)
		)
	}
	set(changes: Numeric.Value | number | undefined): Numeric {
		return Numeric.create({
			...this.value,
			...(typeof changes == "number" ? { months: changes } : changes),
		})
	}
	static now(): Numeric {
		return Numeric.create(new globalThis.Date(Date.now()))
	}
	static create(value: globalThis.Date | Numeric.Value | number): Numeric {
		return value instanceof globalThis.Date
			? new Numeric(value.getFullYear(), value.getMonth())
			: Numeric.Value.is(value)
			? new Numeric(value.years, value.months)
			: new Numeric(undefined, value)
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Month.Numeric").bind()
}
