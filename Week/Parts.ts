import { isly } from "isly"
import { Date } from "../Date"
import { DayOfWeek } from "../DayOfWeek"
import { Number } from "./Number"

export interface Parts {
	year: number
	week: Number.Numeric
}

export namespace Parts {
	export const type = isly.object<Parts>({ year: isly.number(), week: Number.Numeric.type }, "isoly.Week.Parts")
	export const is = type.is
	export const flaw = type.flaw

	export function from(date: Date): Parts {
		const parsed = new globalThis.Date(date)
		parsed.setUTCDate(parsed.getUTCDate() + 4 - (parsed.getUTCDay() || 7))
		const start = new globalThis.Date(globalThis.Date.UTC(parsed.getUTCFullYear(), 0, 1))
		const week = Math.ceil(((parsed.getTime() - start.getTime()) / 86400000 + 1) / 7) as Number.Numeric
		return { year: parsed.getUTCFullYear(), week }
	}
	export function now(): Parts {
		return from(Date.now())
	}
	export function next(week: Parts, weeks = 1): Parts {
		return from(Date.next(first(week), weeks * 7))
	}
	export function previous(week: Parts, weeks = 1): Parts {
		return next(week, -weeks)
	}
	export function first(week: Parts): Date {
		const year = week.year.toString().padStart(4, "0")
		const result = new globalThis.Date(`${year}-01-01`)
		const jan4th = new globalThis.Date(`${year}-01-04`)
		const jan4thDay = (jan4th.getUTCDay() + 6) % 7
		const ordinalDate = 1 + (week.week - 1) * 7 - jan4thDay + 3
		result.setUTCDate(ordinalDate)
		return Date.create(result)
	}
	export function last(week: Parts): Date {
		return getDate(week, 7)
	}
	export function getDate(week: Parts, day: DayOfWeek | DayOfWeek.Numeric): Date {
		return Date.next(first(week), (DayOfWeek.Numeric.is(day) ? day : DayOfWeek.toNumeric(day)) - 1)
	}
	export function getDays(week: Parts): Date[] {
		const monday = first(week)
		return [...Array(7).keys()].map(day => Date.next(monday, day))
	}
	export function lastWeek(year: number): 52 | 53 {
		return previous({ year: year + 1, week: 1 }).week as 52 | 53
	}
}
