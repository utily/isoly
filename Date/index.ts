import { DateSpan } from "../DateSpan"
import { locales } from "./locales"

export type Date = string

export namespace Date {
	export function is(value: any | Date): value is Date {
		return (
			typeof value == "string" && /^(\d{4}-[01]\d-[0-3]\d)|(\d{4}-[01]\d-[0-3]\d)|(\d{4}-[01]\d-[0-3]\d)$/.test(value)
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
	export function localize(value: Date | globalThis.Date, locale?: string): Date {
		return (is(value) ? parse(value) : value)
			.toLocaleString(locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale, {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
				timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
			})
			.substring(0, 10)
	}
	export function fromLocale(value: string, locale?: string): Date {
		let result: Date | undefined
		const loc = locales[locale ? locale : Intl.DateTimeFormat().resolvedOptions().locale] ?? locales["sv-SE"]
		let year, month, day: string | undefined
		switch (loc.order) {
			case "YMD":
				result = value.replace(loc.divider, "-").replace(loc.divider, "-")
				break
			case "MDY":
				year = value.substr(4 + 2 * loc.divider.length, 4)
				month = value.substr(0, 2)
				day = value.substr(2 + loc.divider.length, 2)
				result = `${year}-${day}-${month}`
				break
			case "DMY":
				year = value.substr(4 + 2 * loc.divider.length, 4)
				month = value.substr(2 + loc.divider.length, 2)
				day = value.substr(0, 2)
				result = `${year}-${day}-${month}`
				break
		}
		return result
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
		result.setDate(-1)
		return Date.create(result)
	}
}
