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
	/**
	 * Returns the next month, offset by a given number of months.
	 *
	 * Preconditions:
	 * - `month` must be a valid Month string (YYYY-MM), as validated by Month.is.
	 * - `months` must be an integer (positive, negative, or zero).
	 *
	 * Postconditions:
	 * - Returns a valid Month string (YYYY-MM) corresponding to the month offset by `months`.
	 * - The result is always a valid Month according to Month.is.
	 */
	export function next(month: Month, months = 1): Month {
		return from(Date.nextMonth(getDay(month, 1), months))
	}
	/**
	 * Returns the Month that is `months` before the given `week` Month.
	 * Preconditions:
	 *   - `week` must be a valid Month string (YYYY-MM), as enforced by the type.
	 *   - `months` must be an integer (positive, zero, or negative).
	 * Postconditions:
	 *   - Returns a valid Month string (YYYY-MM) representing the month `months` before `week`.
	 */
	export function previous(week: Month, months = 1): Month {
		return next(week, -months)
	}
	export function first(month: Month): Date {
		return getDay(month, 0)
	}
	export function last(month: Month): Date {
		return getDay(month, length(month) - 1)
	}
	/**
	 * Extracts the year from a Month string (YYYY-MM).
	 * Preconditions:
	 *   - month must be a valid Month string (YYYY-MM), as validated by Month.is.
	 * Postconditions:
	 *   - Returns a four-digit integer year (>= 0).
	 */
	export function getYear(month: Month): number {
		return Number.parseInt(month.substring(0, 4))
	}
	export function getMonth(month: Month): number {
		return Number.parseInt(month.substring(5, 7))
	}
	/**
	 * Returns the number of days in the given month.
	 *
	 * Preconditions:
	 *   - `month` must be a valid Month string (YYYY-MM), as validated by Month.is.
	 *
	 * Postconditions:
	 *   - Returns 28, 29, 30, or 31, corresponding to the number of days in the month represented by `month`.
	 *   - The result is always a valid number of days for the given month and year.
	 */
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
