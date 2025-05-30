import { isly } from "isly"
import { Date } from "../Date"

export type Month = `${number}-${Date.Month}`

export namespace Month {
	export const { type, is, flawed } = isly
		.string<Month>(value => {
			const match = /^(\d{4})-(\d{2})$/.exec(value)
			return !!match && Date.Year.is(match[1]) && Date.Month.is(match[2])
		}, "YYYY-MM")
		.rename("isoly.Month")
		.describe("ISO 8601 month in the format YYYY-MM.")
		.bind()

	export function now(): Month {
		return from(Date.now())
	}
	export function from(date: Date): Month {
		return date.substring(0, 7) as Month
	}
	export function next(month: Month, months = 1): Month {
		return from(Date.nextMonth(getDay(month, 1), months))
	}
	export function previous(week: Month, months = 1): Month {
		return next(week, -months)
	}
	export function first(month: Month): Date {
		return getDay(month, 0)
	}
	export function last(month: Month): Date {
		return getDay(month, length(month) - 1)
	}
	export function getYear(month: Month): number {
		return Number.parseInt(month.substring(0, 4))
	}
	export function getMonth(month: Month): number {
		return Number.parseInt(month.substring(5, 7))
	}
	export function length(month: Month): 28 | 29 | 30 | 31 {
		return Date.getDay(Date.lastOfMonth(getDay(month, 0))) as 28 | 29 | 30 | 31
	}
	export function getDay(month: Month, day: number): Date {
		return `${month}-${(day + 1).toString().padStart(2, "0")}`
	}
	export function getDays(month: Month): Date[] {
		return [...Array(length(month)).keys()].map(day => getDay(month, day))
	}
}
