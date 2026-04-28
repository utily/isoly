import { isly } from "isly"
import { Date } from "../Date"
import { DayOfWeek } from "../DayOfWeek"
import { system } from "../system"
import { Number as WeekNumber } from "./Number"
import { Parts as WeekParts } from "./Parts"

export type Week = `${number}-W${Week.Number}`

export namespace Week {
	export import Number = WeekNumber
	export import Parts = WeekParts
	export const { type, is, flawed } = isly
		.string<Week>(value => {
			const match = /^(\d{4})-W(\d{2})$/.exec(value) ?? []
			return (
				Date.Year.is(match[1])
				&& (WeekNumber.Numeric.parse(match[2]) ?? 54) <= WeekParts.lastWeek(Date.Year.Numeric.parse(match[1])!)
			)
		}, "YYYY-Www")
		.rename("isoly.Week")
		.describe(
			"ISO 8601 week number in the format YYYY-Www (ex: 2025-W04). Week starts on Monday and the week containing the first Wednesday of the year is week 1 of that year."
		)
		.bind()

	export function split(week: Week): [number, Week.Number.Numeric] {
		return week.split("-W").map(system.Number) as [number, Week.Number.Numeric]
	}
	export function parts(week: Week): Parts {
		const [y, w] = split(week)
		return { year: y, week: w }
	}
	export function from(date: Date | Parts): Week {
		const result = Parts.is(date) ? date : WeekParts.from(date)
		return `${result.year.toString().padStart(4, "0")}-W${result.week.toString().padStart(2, "0")}` as Week
	}
	export function now(): Week {
		return from(Week.Parts.now())
	}
	/**
	 * next - Returns the ISO week string for the week that is `weeks` after the given `week`.
	 * pre:
	 *   week: valid ISO 8601 week string (YYYY-Www), Week.is(week) === true
	 *   weeks: integer (default 1)
	 * post:
	 *   - Returns a valid ISO 8601 week string (YYYY-Www) that is `weeks` after `week`
	 */
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
