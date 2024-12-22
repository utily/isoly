import { isly } from "isly"
import { Hour as TimeHour } from "./Hour"
import { Millisecond as TimeMillisecond } from "./Millisecond"
import { Minute as TimeMinute } from "./Minute"
import { Second as TimeSecond } from "./Second"

export type Time = string

export namespace Time {
	export import Hour = TimeHour
	export import Millisecond = TimeMillisecond
	export import Minute = TimeMinute
	export import Second = TimeSecond

	export const type = isly.named(
		"isoly.Time",
		isly.string<Time>((value: string) => {
			const splitted = /^\d{2}(?::\d{2}(?::\d{2}(?:\.\d{3})?)?)?$/.test(value) && Time.split(value)
			return (
				splitted &&
				Time.Hour.type.is(splitted[0]) &&
				Time.Minute.type.optional().is(splitted[1]) &&
				Time.Second.type.optional().is(splitted[2]) &&
				Time.Millisecond.type.optional().is(splitted[3]) &&
				(splitted[2] != "60" || (splitted[0] == "23" && splitted[1] == "59")) // only allow leap second at 23:59
			)
		}, "HH:mm:ss.fff")
	)
	export const is = type.is
	export const flaw = type.flaw

	export function split(value: Time): [Hour, Minute | undefined, Second | undefined, Millisecond | undefined] {
		const [hour, minute, secondMillisecond] = value.split(":", 3) as [Hour, Minute | undefined, string | undefined]
		const [second, millisecond] =
			secondMillisecond?.split(".", 2) ?? ([undefined, undefined] as [Second | undefined, Millisecond | undefined])
		return [
			hour.padStart(2, "0") as Hour,
			minute?.padStart(2, "0") as Minute | undefined,
			second?.padStart(2, "0") as Second | undefined,
			millisecond?.padEnd(3, "0") as Millisecond | undefined,
		]
	}
	export function normalize(value: Time): Time {
		const [hour, minute = "00", second = "00", millisecond = "000"] = Time.split(value)
		return `${hour}:${minute}:${second}.${millisecond}`
	}
}
