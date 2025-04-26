import { isly } from "isly"
import { Year } from "../../Year"
import type { Week } from "../"
import { Value as _Value } from "./Value"

export class Numeric {
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.weeks != undefined ? { weeks: this.weeks } : {}),
		}
	}
	get year(): Year.Numeric {
		return new Year.Numeric(this.years)
	}
	get normal(): boolean {
		return this.weeks == undefined || (this.weeks >= 0 && this.weeks < this.year.length("weeks"))
	}
	constructor(readonly years: number | undefined, readonly weeks: number | undefined) {}
	normalize(): Numeric {
		let year = this.year
		let weeks = this.weeks
		if (weeks) {
			while (weeks < 0) {
				weeks += year.length("weeks")
				year = year.previous()
			}
			while (weeks > year.length("weeks")) {
				weeks -= year.length("weeks")
				year = year.next()
			}
		}
		return new Numeric(year.years, weeks)
	}
	format(): Week {
		const result = this.normalize()
		return `${(result.years ?? 0).toFixed(0).padStart(4, "0")}-W${((result.weeks ?? 0) + 1)
			.toFixed(0)
			.padStart(2, "0")}` as Week
	}
	next(weeks = 1): Numeric {
		const result = new Numeric(this.years, (this.weeks ?? 0) + weeks)
		return result.normalize()
	}
	previous(weeks = 1): Numeric {
		return this.next(-weeks)
	}
	static now(): Numeric {
		return Numeric.parse(new globalThis.Date())
	}
	static parse(value: globalThis.Date | Numeric.Value | number | Week | string | undefined): Numeric {
		const parsed =
			typeof value == "number"
				? ([undefined, value] as const)
				: typeof value == "string"
				? ([Number.parseInt(value.substring(0, 4)), Number.parseInt(value.substring(6, 8)) - 1] as const)
				: Numeric.Value.is(value)
				? ([value?.years, value?.weeks] as const)
				: value == undefined
				? ([undefined, undefined] as const)
				: Numeric.fromDate(value)
		return new Numeric(parsed[0], parsed[1])
	}
	private static fromDate(date: globalThis.Date): [number, number] {
		const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
		// Set to nearest Thursday: current date + 4 - current day number
		const weekday = d.getUTCDay() || 7 // Sunday is 0 in getUTCDay, but should be 7
		d.setUTCDate(d.getUTCDate() + 4 - weekday)
		const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
		const week = Math.ceil(((d.getTime() - yearStart.getTime()) / 86_400_000 + 1) / 7)
		return [d.getUTCFullYear(), week - 1]
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Week.Numeric").bind()
}
