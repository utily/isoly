import { DayOfWeek } from "DayOfWeek"
import { isly } from "isly"
import { Date } from "../Date"
import { Number as WeekNumber } from "./Number"
import { Parts as WeekParts } from "./Parts"

export type Week = `${number}-W${Week.Number}`

export namespace Week {
	export import Number = WeekNumber
	export import Parts = WeekParts
	export const type = isly.named(
		"Week",
		isly.string<Week>(value => {
			const match = /^(\d{4})-W(\d{2})$/.exec(value) ?? []
			return (
				Date.Year.is(match[1]) &&
				(WeekNumber.Numeric.parse(match[2]) ?? 54) <= WeekParts.lastWeek(globalThis.Number.parseInt(match[1]))
			)
		}, "YYYY-Www")
	)
	export const is = type.is
	export const flaw = type.flaw

	export function split(week: Week): [number, Week.Number.Numeric] {
		return week.split("-W").map(globalThis.Number) as [number, Week.Number.Numeric]
	}
	export function parts(week: Week): Parts {
		const [y, w] = week.split("-W").map(globalThis.Number) as [number, Week.Number.Numeric]
		return { year: y, week: w }
	}
	export function from(date: Date | Parts): Week {
		const result = Parts.is(date) ? date : WeekParts.from(date)
		return `${result.year.toString().padStart(4, "0")}-W${result.week.toString().padStart(2, "0")}` as Week
	}
	export function now(): Week {
		return from(Week.Parts.now())
	}
	export function next(week: Week, weeks = 1): Week {
		return from(Week.Parts.next(parts(week), weeks))
	}
	export function previous(week: Week, weeks = 1): Week {
		return next(week, -weeks)
	}
	export function first(week: Week): Date {
		return Week.Parts.first(parts(week))
	}
	export function last(week: Week): Date {
		return getDate(week, 7)
	}
	export function getYear(week: Week): number {
		return parts(week).year
	}
	export function getWeek(week: Week): number {
		return parts(week).week
	}
	export function getDate(week: Week, day: DayOfWeek | DayOfWeek.Numeric): Date {
		return Parts.getDate(parts(week), day)
	}
	export function getDays(week: Week): Date[] {
		return Parts.getDays(parts(week))
	}
}
