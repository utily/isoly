import { isly } from "isly"
import { DateSpan } from "../DateSpan"
import type { DayOfWeek } from "../DayOfWeek"
import { Locale } from "../Locale"
import type { Date } from "./index"

export class Numeric {
	get values(): Numeric.Values {
		return {
			...(this.years ? { years: this.years } : {}),
			...(this.months ? { months: this.months - 1 } : {}),
			...(this.days ? { days: this.days - 1 } : {}),
		}
	}
	constructor(
		readonly years: number | undefined,
		readonly months: number | undefined,
		readonly days: number | undefined
	) {}
	add(change: Partial<Pick<Numeric, "years" | "months" | "days">>): Numeric {
		return new Numeric(
			...((["years", "months", "days"] as const).map(p =>
				this[p] == undefined && change[p] == undefined ? undefined : (this[p] ?? 0) + (change[p] ?? 0)
			) as [number | undefined, number | undefined, number | undefined])
		)
	}
	toJSON(): Partial<Pick<Numeric, "years" | "months" | "days">> {
		return this.values
	}
	format(): Date {
		return this.to("system").toISOString().substring(0, 10)
	}
	normalize(): Numeric {
		return Numeric.create(this.to("system"))
	}
	to(type: "number"): number
	to(type: "system"): globalThis.Date
	to(type: "number" | "system"): number | globalThis.Date
	to(type: "number" | "system"): number | globalThis.Date {
		return type == "number"
			? globalThis.Date.UTC(this.years ?? 0, this.months ?? 0, (this.days ?? 0) + 1, 12)
			: new globalThis.Date(this.to("number"))
	}
	localize(locale?: Locale, timeZone?: string): Date {
		return (
			this.to("system")
				.toLocaleString(locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					timeZone: timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
				})
				.substring(0, 10)
				// See DateTime:localize for note.
				.replaceAll(" ", " ")
		)
	}
	invert(): Numeric {
		return new Numeric(9999 - (this.years ?? 0), 12 - (this.months ?? 0), 31 - (this.days ?? 0))
	}
	next(days: number | DateSpan = 1): Numeric {
		let result: Numeric
		if (typeof days == "number") {
			const r = this.to("system")
			r.setDate(r.getDate() + days)
			result = Numeric.create(r)
		} else {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			result = this
			if (days.years)
				result = result.nextYear(days.years)
			if (days.months)
				result = result.nextMonth(days.months)
			if (days.days)
				result = result.next(days.days)
		}
		return result
	}
	previous(days: number | DateSpan = 1): Numeric {
		let result: Numeric
		if (typeof days == "number") {
			const r = this.to("system")
			r.setDate(r.getDate() - days)
			result = Numeric.create(r)
		} else {
			// eslint-disable-next-line @typescript-eslint/no-this-alias
			result = this
			if (days.years)
				result = result.previousYear(days.years)
			if (days.months)
				result = result.previousMonth(days.months)
			if (days.days)
				result = result.previous(days.days)
		}
		return result
	}
	nextMonth(months = 1): Numeric {
		const result = this.to("system")
		result.setMonth(result.getMonth() + months)
		return Numeric.create(result)
	}
	previousMonth(months = 1): Numeric {
		return this.nextMonth(-months)
	}
	nextYear(years = 1): Numeric {
		const result = this.to("system")
		result.setFullYear(result.getFullYear() + years)
		return Numeric.create(result)
	}
	previousYear(years = 1): Numeric {
		return this.nextYear(-years)
	}
	firstOfYear(): Numeric {
		const result = this.to("system")
		result.setMonth(0)
		result.setDate(1)
		return Numeric.create(result)
	}
	lastOfYear(): Numeric {
		const result = this.to("system")
		result.setFullYear(result.getFullYear() + 1)
		result.setMonth(0)
		result.setDate(0)
		return Numeric.create(result)
	}
	firstOfMonth(): Numeric {
		const result = this.to("system")
		result.setDate(1)
		return Numeric.create(result)
	}
	lastOfMonth(): Numeric {
		const result = this.to("system")
		result.setMonth(result.getMonth() + 1)
		result.setDate(0)
		return Numeric.create(result)
	}
	firstOfWeek(): Numeric {
		const result = this.to("system")
		const relativeDay = result.getDate() - (result.getDay() || 7) + 1
		result.setDate(relativeDay)
		return Numeric.create(result)
	}
	lastOfWeek(): Numeric {
		const result = this.to("system")
		const relativeDay = result.getDate() - result.getDay() + 7
		result.setDate(relativeDay)
		return Numeric.create(result)
	}
	getWeek(): number {
		const parsed = this.to("system")
		parsed.setHours(0, 0, 0, 0)
		parsed.setDate(parsed.getDate() + 3 - ((parsed.getDay() + 6) % 7))
		const week1 = new globalThis.Date(parsed.getFullYear(), 0, 4)
		return 1 + Math.round(((parsed.getTime() - week1.getTime()) / 86_400_000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
	}
	getDayOfWeek(): DayOfWeek {
		return (["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"] as const)[
			this.to("system").getUTCDay()
		]
	}
	nextBusinessDay(
		businessDays = 1,
		holidays: Set<Date> = new Set(),
		weekend: DayOfWeek[] = ["saturday", "sunday"]
	): Numeric {
		const isBusinessDay = this.isBusinessDay(holidays, weekend)
		return businessDays <= 0 && isBusinessDay
			? this
			: this.next().nextBusinessDay(businessDays + (isBusinessDay ? -1 : 0), holidays, weekend)
	}
	isBusinessDay(holidays: Set<Date> = new Set(), weekend: DayOfWeek[] = ["saturday", "sunday"]): boolean {
		return !(weekend.includes(this.getDayOfWeek()) || holidays.has(this.format()))
	}
	static create(value: globalThis.Date | Numeric.Values): Numeric {
		return value instanceof globalThis.Date
			? Numeric.create({ years: value.getFullYear(), months: value.getUTCMonth() - 1, days: value.getUTCDate() - 1 })
			: new Numeric(value.years, value.months, value.days)
	}
	static now(): Numeric {
		return Numeric.create(new globalThis.Date())
	}
	static parse(value: Date | string | undefined): Numeric {
		const [year, month, day] =
			value
				?.split("-", 3)
				.map(v => Number.parseInt(v))
				.map(v => (Number.isSafeInteger(v) ? v : undefined)) ?? []
		return new Numeric(year, month != undefined ? month - 1 : undefined, day ? day - 1 : undefined)
	}
	static get epoch(): [Numeric, Numeric] {
		return [new Numeric(0, 0, 0), new Numeric(9999, 12, 31)]
	}
}
export namespace Numeric {
	export const { type, is, flawed } = isly.instance(Numeric, "isoly.Date.Numeric").bind()
	export type Values = Partial<Pick<Numeric, "years" | "months" | "days">>
	export namespace Values {
		export const { type, is, flawed } = isly
			.object<Pick<Numeric, "years" | "months" | "days">>(
				{ years: isly.number().optional(), months: isly.number().optional(), days: isly.number().optional() },
				"isoly.Date.Numeric"
			)
			.bind()
	}
}
