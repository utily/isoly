import { isly } from "isly"
import { HalfYear } from "../../HalfYear"
import { Month } from "../../Month"
import { Quarter } from "../../Quarter"
import { Week } from "../../Week"
import { Year } from "../../Year"
import { Date } from "../Date"
import { Interval } from "./Interval"

export type Like = Interval | Year | HalfYear | Quarter | Month | Week | Date

export namespace Like {
	export const { type, is, flawed } = isly
		.string<Like>(
			value =>
				Interval.is(value) ||
				Year.is(value) ||
				HalfYear.is(value) ||
				Quarter.is(value) ||
				Month.is(value) ||
				Week.is(value) ||
				Date.is(value),
			"YYYY-MM-DD--YYYY-MM-DD | YYYY | YYYY-MM | YYYY-WW | YYYY-QQ | YYYY-HH | YYYY-MM-DD"
		)
		.rename("isoly.Date.Interval.Like")
		.describe("String parsable into isoly.Date.Interval.")
		.bind()
}
