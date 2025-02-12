import { isly } from "isly"
import { DateSpan } from "../DateSpan"
import { DayOfWeek } from "../DayOfWeek"
import { Locale } from "../Locale"
import { Day as DateDay } from "./Day"
import { Month as DateMonth } from "./Month"
import { Numeric as DateNumeric } from "./Numeric"
import { Year as DateYear } from "./Year"

export type Date = string

export namespace Date {
	export import Day = DateDay
	export import Month = DateMonth
	export import Numeric = DateNumeric
	export import Year = DateYear

	export const { type, is, flawed } = isly
		.string<Date>((value: string) => {
			const splitted = /^\d{4}-\d{2}-\d{2}$/.test(value) && (value.split("-", 3) as [Year, Month, Day])
			return (
				splitted &&
				Date.Year.type.is(splitted[0]) &&
				Date.Month.type.is(splitted[1]) &&
				Date.Day.type.is(splitted[2]) &&
				Date.Month.length(splitted[1], splitted[0]) >= Date.Day.Numeric.parse(splitted[2])
			)
		}, "YYYY-MM-DD")
		.rename("isoly.Date")
		.describe("Date string in format YYYY-MM-DD.")
		.bind()
	export function normalize(date: Date): Date {
		return Numeric.parse(date).normalize().format()
	}
	export function to(date: Date, type: "number"): number
	export function to(date: Date, type: "system"): globalThis.Date
	export function to(date: Date, type: "number" | "system"): number | globalThis.Date
	export function to(date: Date, type: "number" | "system"): number | globalThis.Date {
		return Numeric.parse(date).to(type)
	}
	export function localize(date: Date, locale?: Locale, timeZone?: string): Date {
		return Numeric.parse(date).localize(locale, timeZone)
	}
	export function invert(date: Date): Date {
		return Numeric.parse(date).invert().format()
	}
	export function next(date: Date, days: number | DateSpan = 1): Date {
		return Numeric.parse(date).next(days).format()
	}
	export function previous(date: Date, days: number | DateSpan = 1): Date {
		return Numeric.parse(date).previous(days).format()
	}
	export function nextMonth(date: Date, months = 1): Date {
		return Numeric.parse(date).nextMonth(months).format()
	}
	export function previousMonth(date: Date, months = 1): Date {
		return Numeric.parse(date).previousMonth(months).format()
	}
	export function nextYear(date: Date, years = 1): Date {
		return Numeric.parse(date).nextYear(years).format()
	}
	export function previousYear(date: Date, years = 1): Date {
		return Numeric.parse(date).previousYear(years).format()
	}
	export function firstOfYear(date: Date): Date {
		return Numeric.parse(date).firstOfYear().format()
	}
	export function lastOfYear(date: Date): Date {
		return Numeric.parse(date).lastOfYear().format()
	}
	export function firstOfMonth(date: Date): Date {
		return Numeric.parse(date).firstOfMonth().format()
	}
	export function lastOfMonth(date: Date): Date {
		return Numeric.parse(date).lastOfMonth().format()
	}
	export function firstOfWeek(date: Date): Date {
		return Numeric.parse(date).firstOfWeek().format()
	}
	export function lastOfWeek(date: Date): Date {
		return Numeric.parse(date).lastOfWeek().format()
	}
	export function getWeek(date: Date): number {
		return Numeric.parse(date).getWeek()
	}
	export function getDayOfWeek(date: Date): DayOfWeek {
		return Numeric.parse(date).getDayOfWeek()
	}
	export function nextBusinessDay(
		date: Date,
		businessDays = 1,
		holidays: Set<Date> = new Set(),
		weekend: DayOfWeek[] = ["saturday", "sunday"]
	): Date {
		return Numeric.parse(date).nextBusinessDay(businessDays, holidays, weekend).format()
	}
	export function isBusinessDay(date: Date): boolean {
		return Numeric.parse(date).isBusinessDay()
	}
	export function create(value: globalThis.Date): Date {
		return Numeric.create(value).format()
	}
	export function now(): Date {
		return Numeric.now().format()
	}
	export function parse(value: Date | string | undefined): Date {
		return Numeric.parse(value).format()
	}
	export const epoch = ["0000-01-01", "9999-12-31"] as const
}
