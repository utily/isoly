import { isly } from "isly"
import { HalfYear } from "../../../HalfYear"
import { Month } from "../../../Month"
import { Quarter } from "../../../Quarter"
import { Week } from "../../../Week"
import { Year } from "../../../Year"
import { Date } from "../../Date"

export type EndPoint = Year | HalfYear | Quarter | Month | Week | Date
export namespace EndPoint {
	export const { type, is, flawed } = isly
		.string<EndPoint>(
			value =>
				Year.is(value) ||
				HalfYear.is(value) ||
				Quarter.is(value) ||
				Month.is(value) ||
				Week.is(value) ||
				Date.is(value),
			"YYYY | YYYY-MM | YYYY-WW | YYYY-QQ | YYYY-HH | YYYY-MM-DD"
		)
		.rename("isoly.Date.Interval.Like.EndPoint")
		.describe("String parsable into isoly.Date.Interval.EndPoint.")
		.bind()
}
