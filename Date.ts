import { DateSpan } from "./DateSpan"
import { Locale } from "./Locale"

export type Date = string

export namespace Date {
	export function is(value: any | Date): value is Date {
		return (
			typeof value == "string" &&
			value.length == 10 &&
			new globalThis.Date(value).toString() != "Invalid Date" &&
			create(new globalThis.Date(value)) == value
		)
	}
	export function parse(value: Date, time?: string): globalThis.Date {
		return new globalThis.Date(value + (time ?? "T12:00:00.000Z"))
	}
	export function create(value: globalThis.Date): Date {
		return value.toISOString().substring(0, 10)
	}
	export function now(): Date {
		return create(new globalThis.Date())
	}
	export function localize(value: Date | globalThis.Date, locale?: Locale, timezone?: string): Date {
		return (is(value) ? parse(value) : value)
			.toLocaleString(locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale, {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				timeZone: timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
			})
			.substring(0, 10)
	}
	export function next(date: Date, days: number | DateSpan = 1): Date {
		let result: Date
		if (typeof days == "number") {
			const r = parse(date)
			r.setDate(r.getDate() + days)
			result = Date.create(r)
		} else {
			result = date
			if (days.years)
				result = nextYear(result, days.years)
			if (days.months)
				result = nextMonth(result, days.months)
			if (days.days)
				result = next(result, days.days)
		}
		return result
	}
	export function previous(date: Date, days: number | DateSpan = 1): Date {
		let result: Date
		if (typeof days == "number") {
			const r = parse(date)
			r.setDate(r.getDate() - days)
			result = Date.create(r)
		} else {
			result = date
			if (days.years)
				result = previousYear(result, days.years)
			if (days.months)
				result = previousMonth(result, days.months)
			if (days.days)
				result = previous(result, days.days)
		}
		return result
	}
	export function nextMonth(date: Date, months = 1): Date {
		const result = parse(date)
		result.setMonth(result.getMonth() + months)
		return Date.create(result)
	}
	export function previousMonth(date: Date, months = 1): Date {
		return nextMonth(date, -months)
	}
	export function nextYear(date: Date, years = 1): Date {
		const result = parse(date)
		result.setFullYear(result.getFullYear() + years)
		return Date.create(result)
	}
	export function previousYear(date: Date, years = 1): Date {
		return nextYear(date, -years)
	}
	export function firstOfMonth(date: Date): Date {
		const result = parse(date)
		result.setDate(1)
		return Date.create(result)
	}
	export function lastOfMonth(date: Date): Date {
		const result = parse(date)
		result.setMonth(result.getMonth() + 1)
		result.setDate(0)
		return Date.create(result)
	}
	export function firstOfWeek(date: Date): Date {
		const result = parse(date)
		const relativeDay = result.getDate() - result.getDay() + 1
		result.setDate(relativeDay)
		return Date.create(result)
	}
	export function lastOfWeek(date: Date): Date {
		const result = parse(date)
		const relativeDay = result.getDate() - result.getDay() + 7
		result.setDate(relativeDay)
		return Date.create(result)
	}
	export function getYear(time: Date): number {
		return Number.parseInt(time.substring(0, 4))
	}
	export function getMonth(time: Date): number {
		return Number.parseInt(time.substring(5, 7))
	}
	export function getDay(time: Date): number {
		return Number.parseInt(time.substring(8, 10))
	}
	export function getWeekDay(time: Date): number {
		return new globalThis.Date(time).getDay()
	}
}
