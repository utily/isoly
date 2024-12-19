import { isly } from "isly"
import { DateSpan } from "./DateSpan"
import { Locale } from "./Locale"

export type Date = string

export namespace Date {
	export const type = isly.named(
		"isoly.Date",
		isly.string<Date>( // Should work for all leap years from 1800 to 2499
			/^(((18|19|20|21|22|23|24)[0-9]{2}-(0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|(18|19|20|21|22|23|24)[0-9]{2}-(0[469]|11)-(0[1-9]|[12][0-9]|30)|(18|19|20|21|22|23|24)[0-9]{2}-(02)-(0[1-9]|1[0-9]|2[0-8])|(((18|19|20|21|22|23|24)(04|08|[2468][048]|[13579][26]))|2000|2400)-(02)-29)$/
		)
	)
	export const is = type.is
	export const flaw = type.flaw

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
		return (
			(is(value) ? parse(value) : value)
				.toLocaleString(locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale, {
					year: "numeric",
					month: "2-digit",
					day: "2-digit",
					timeZone: timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
				})
				.substring(0, 10)
				// See DateTime:localize for note.
				.replaceAll(" ", " ")
		)
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
	export function firstOfYear(date: Date): Date {
		const result = parse(date)
		result.setMonth(0)
		result.setDate(1)
		return Date.create(result)
	}
	export function lastOfYear(date: Date): Date {
		const result = parse(date)
		result.setFullYear(result.getFullYear() + 1)
		result.setMonth(0)
		result.setDate(0)
		return Date.create(result)
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
		const relativeDay = result.getDate() - (result.getDay() || 7) + 1
		result.setDate(relativeDay)
		return Date.create(result)
	}
	export function lastOfWeek(date: Date): Date {
		const result = parse(date)
		const relativeDay = result.getDate() - result.getDay() + 7
		result.setDate(relativeDay)
		return Date.create(result)
	}
	export function getYear(date: Date, options?: { digits?: 2 | 4 }): number {
		return options?.digits != 2 ? Number.parseInt(date.substring(0, 4)) : +getYear(date).toString().slice(-2)
	}
	export function getMonth(date: Date): number {
		return Number.parseInt(date.substring(5, 7))
	}
	export function getWeek(date: Date): number {
		const parsed = new globalThis.Date(date)
		parsed.setHours(0, 0, 0, 0)
		parsed.setDate(parsed.getDate() + 3 - ((parsed.getDay() + 6) % 7))
		const week1 = new globalThis.Date(parsed.getFullYear(), 0, 4)
		return 1 + Math.round(((parsed.getTime() - week1.getTime()) / 86_400_000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
	}
	export function getDay(date: Date): number {
		return Number.parseInt(date.substring(8, 10))
	}
	export function getWeekDay(date: Date): number
	export function getWeekDay(date: Date, locale: Locale, options?: { format?: "long" | "short" | "narrow" }): string
	export function getWeekDay(
		date: Date,
		locale?: Locale,
		options?: { format?: "long" | "short" | "narrow" }
	): number | string {
		const format = options?.format ?? "long"
		return locale
			? new globalThis.Date(date).toLocaleDateString(locale, { weekday: format })
			: new globalThis.Date(date).getDay()
	}
	export function nextWeekday(date: Date, days: number | DateSpan = 1, holidays: Date[] = []): Date {
		const holidaySet = new Set(holidays)
		let result = next(date, days)
		let weekday = getWeekDay(result)
		while (weekday == 6 || weekday == 0 || holidaySet.has(result)) {
			result = next(result, weekday == 6 ? 2 : 1)
			weekday = getWeekDay(result)
		}
		return result
	}
	export function nextBusinessDay(date: Date, bankingDays = 1, bankingHolidays: Date[] | Set<Date> = []): Date {
		const holidaySet = new Set(bankingHolidays)
		if (bankingDays <= 0 && isBusinessDay(date, holidaySet))
			return date
		const tomorrow = next(date)
		const tomorrowIsBusinessDay = isBusinessDay(tomorrow, holidaySet)
		return nextBusinessDay(tomorrow, tomorrowIsBusinessDay ? bankingDays - 1 : bankingDays, holidaySet)
	}
	function isBusinessDay(date: Date, holidaySet: Set<Date> = new Set()) {
		const weekday = getWeekDay(date)
		return !(weekday == 6 || weekday == 0 || holidaySet.has(date))
	}
	export function span(date: Date, relative: Date): DateSpan {
		return {
			years: getYear(date) - getYear(relative),
			months: getMonth(date) - getMonth(relative),
			days: getDay(date) - getDay(relative),
		}
	}
	export const epochStart = "0000-01-01" as const
	export const epochEnd = "9999-12-31" as const
	export function invert(date: Date): Date {
		return `${(9999 - getYear(date)).toFixed(0).padStart(4, "0")}-${(13 - getMonth(date))
			.toFixed(0)
			.padStart(2, "0")}-${(32 - getDay(date)).toFixed(0).padStart(2, "0")}`
	}
}
