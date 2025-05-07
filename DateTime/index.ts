import { isly } from "isly"
import { Date } from "../Date/Date"
import { Month } from "../Month"
import { Time } from "../Time"
import { TimeZone } from "../TimeZone"
import { Year } from "../Year"
import { Like as _Like } from "./Like"
import { Numeric as _Numeric } from "./Numeric"
import { Precision as _Precision } from "./Precision"

export type DateTime = `${Date}T${Time | ""}${TimeZone.Offset | ""}`

export namespace DateTime {
	export import Like = _Like
	export import Numeric = _Numeric
	export import Precision = _Precision
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
				matched[3] <= Month.length(`${matched[1]}-${matched[2]}`).toFixed() &&
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
	export function system(value: DateTime): globalThis.Date {
		return Numeric.parse(value).system
	}
	export function now(): DateTime {
		return create(new globalThis.Date())
	}
	export function create(): DateTime
	export function create(date: globalThis.Date): DateTime
	export function create(date: number, precision?: Precision): DateTime
	export function create(date: Numeric.Value): DateTime
	export function create(date?: Date.Numeric.Value, time?: Time.Numeric.Value, zone?: TimeZone.Offset): DateTime
	export function create(
		...argument:
			| []
			| [globalThis.Date]
			| [number, Precision?]
			| [Numeric.Value]
			| [Date.Numeric.Value?, Time.Numeric.Value?, TimeZone.Offset?]
	): DateTime {
		return Numeric.create(...(argument as any)).format()
	}
	export function normalize(value: DateTime | Like): DateTime
	export function normalize(value: string): DateTime | undefined
	export function normalize(value: DateTime | Like | string): DateTime | undefined {
		return Numeric.parse(value)?.format()
	}
	export function next(value: DateTime, increment: Numeric.Value): DateTime {
		return Numeric.parse(value).next(increment).format()
	}
	export function previous(value: DateTime, decrement: Numeric.Value): DateTime {
		return Numeric.parse(value).previous(decrement).format()
	}
	export function startOfDay(value: DateTime | Date): DateTime {
		return (value.slice(0, 10) +
			"T00:00:00.000" +
			(DateTime.is(value) ? timeZoneOffset(value) || "Z" : "Z")) as DateTime
	}
	export function endOfDay(value: DateTime | Date): DateTime {
		return `${value.slice(0, 10)}T23:59:59.999${DateTime.is(value) ? timeZoneOffset(value) || "Z" : "Z"}` as DateTime
	}
	export function timeZoneOffset(value: DateTime): TimeZone.Offset | undefined {
		return Numeric.parse(value).zone
	}
	export function precision(value: DateTime): Precision {
		return Numeric.parse(value).precision
	}
	export function truncate(value: DateTime, precision: Precision): DateTime {
		return Numeric.parse(value).truncate(precision).format()
	}
	export function set(value: DateTime, changes: Date.Numeric.Value): DateTime {
		return Numeric.parse(value).set(changes).format()
	}
	export function adjust(value: DateTime, zone: TimeZone.Offset): DateTime {
		return Numeric.parse(value).adjust(zone).format()
	}
	export function invert(value: DateTime): DateTime {
		return Numeric.parse(value).invert().format()
	}
	export function epoch(value: DateTime, precision: Precision = "seconds"): number {
		return Numeric.parse(value).epoch(precision)
	}
	export const min: DateTime = "0000-01-01T00:00:00.000Z"
	export const max: DateTime = "9999-12-31T23:59:59.999Z"
}
