import { isly } from "isly"
import { Date } from "../Date/Date"
import { Month } from "../Month"
import { Time } from "../Time"
import { TimeZone } from "../TimeZone"
import { Year } from "../Year"
import { Like } from "./Like"
import { Numeric } from "./Numeric"

export type DateTime = `${Date}T${Time | ""}${TimeZone.Offset | ""}`

export namespace DateTime {
	export const { type, is, flawed } = isly
		.string<DateTime>()
		.restrict(value => {
			const matched =
				/^(\d{4})-(\d{2})-(\d{2})T(?:(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?)?)?(Z|[+-]\d{2}:\d{2})?$/.exec(value)
			return (
				!!matched &&
				Year.type.is(matched[1]) &&
				Month.Digits.type.is(matched[2]) &&
				Date.Digits.type.is(matched[3]) &&
				matched[3] <= Month.length(`${matched[1]}-${matched[2]}` as any as Month).toFixed() &&
				Time.Hour.type.optional().is(matched[4]) &&
				Time.Minute.type.optional().is(matched[5]) &&
				Time.Second.type.optional().is(matched[6]) &&
				Time.Millisecond.type.optional().is(matched[7]) &&
				(matched[6] != "60" || (matched[4] == "23" && matched[5] == "59")) && // only allow leap second at 23:59
				TimeZone.Offset.type.optional().is(matched[8])
			)
		}, "YYYY-MM-DDT[HH[:mm[:ss[.sss]]]][Z|±hh:mm]")
		.rename("isoly.DateTime")
		.describe("An ISO 8601 date-time, formatted as YYYY-MM-DDTHH:mm:ss.sssZ or YYYY-MM-DDTHH:mm:ss.sss±hh:mm.")
		.bind()
	export function parse(value: DateTime | Like): Numeric
	export function parse(value: string | undefined): Numeric | undefined
	export function parse(value: DateTime | Like | string | undefined): Numeric | undefined {
		const match =
			value == undefined
				? undefined
				: /^(\d{4})-(\d{2})-(\d{2})T(?:(\d{2})(?::(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?)?)?(Z|[+-]\d{2}:\d{2})?$/.exec(
						value
				  ) ?? /^(\d+)-(\d+)-(\d+)(?:(?:T| )(?:(\d+)(?::(\d+)(?::(\d+)(?:\.(\d+))?)?)?)?)?(Z|[+-]\d+:\d+)?$/.exec(value)
		return match
			? new Numeric(
					match[1] ? parseInt(match[1]) : undefined, // years
					match[2] ? parseInt(match[2]) - 1 : undefined, // months
					match[3] ? parseInt(match[3]) - 1 : undefined, // days
					match[4] ? parseInt(match[4]) : undefined, // hours
					match[5] ? parseInt(match[5]) : undefined, // minutes
					match[6] ? parseInt(match[6]) : undefined, // seconds
					match[7] ? parseInt(match[7].substring(0, 3).padEnd(3, "0")) : undefined, // milliseconds
					match[8] ? TimeZone.Offset.parse(match[8]) : undefined // zone
			  )
			: undefined
	}
}
