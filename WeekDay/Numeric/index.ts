import { isly } from "isly"
import { Year } from "../../Year"
import type { WeekDay } from "../"
import { Value } from "./Value"

export class Numeric {
	get value(): Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.weeks != undefined ? { weeks: this.weeks } : {}),
			...(this.days != undefined ? { days: this.days } : {}),
		}
	}
	constructor(
		readonly years: number | undefined,
		readonly weeks: number | undefined,
		readonly days: number | undefined
	) {}
	normalize(): Numeric & Required<Value> {
		let days = this.days ?? 0
		let weeks = this.weeks ?? 0
		let years = this.years ?? 0
		if (days < 0) {
			weeks -= Math.ceil(-days / 7)
			days = 7 + (-days % 7)
		} else if (days >= 7) {
			weeks += Math.trunc(days / 7)
			days %= 7
		}
		while (weeks < 0) {
			years--
			weeks += Year.length(years, "weeks")
		}
		while (weeks >= Year.length(years, "weeks")) {
			years++
			weeks -= Year.length(years, "weeks")
		}
		return new Numeric(years, weeks, days) as Numeric & Required<Value>
	}
	format(): WeekDay {
		const result = this.normalize()
		return `${result.years.toFixed(0).padStart(4, "0")}-W${result.weeks.toFixed(0).padStart(2, "0")}-${result.days
			.toFixed(0)
			.padStart(1, "0")}` as WeekDay
	}
	static parse(value: Numeric): Numeric
	static parse(value: WeekDay): Numeric
	static parse(value: string | undefined): Numeric | undefined
	static parse(days: number): Numeric
	static parse(value: Numeric | WeekDay | undefined): Numeric
	static parse(value: Numeric | number | string | undefined): Numeric | undefined {
		const result = Numeric.is(value)
			? value
			: typeof value == "number"
			? new Numeric(0, 0, value)
			: typeof value == "string"
			? (() => {
					const match = value.match(/^(\d{4})-W(\d{2})-(\d{1})$/)
					return match
						? new Numeric(Number.parseInt(match[1]), Number.parseInt(match[2]), Number.parseInt(match[3]))
						: undefined
			  })()
			: undefined
		return result
	}
}
export namespace Numeric {
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.WeekDay.Numeric").bind()
}
