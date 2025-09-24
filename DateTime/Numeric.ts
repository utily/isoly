import { isly } from "isly"
import { Date } from "../Date"
import { Time } from "../Time"
import { Precision } from "../Time/Precision"
import { TimeZone } from "../TimeZone"
import { DateTime } from "./index"

export type Numeric = Date.Numeric & Time.Numeric & { zone?: TimeZone.Offset }

export namespace Numeric {
	export const { type, is, flawed } = isly
		.union<Numeric>(
			Date.Numeric.type,
			Time.Numeric.type,
			isly.object<{ zone?: TimeZone.Offset }>({ zone: TimeZone.Offset.type.optional() })
		)
		.rename("isoly.DateTime.Numeric")
		.bind()
	export function parse(value: DateTime | string): Numeric {
		const [date, splitted]: (string | undefined)[] = value.split("T", 2)
		const [time, zone]: (string | undefined)[] = splitted?.split(/(Z|[+-].{5})?$/, 2) ?? []
		return {
			...(date ? Date.Numeric.parse(date) : {}),
			...(time ? Time.Numeric.parse(time) : {}),
			...(zone ? { zone: TimeZone.Offset.parse(zone) } : {}),
		}
	}
	export function format(value: Numeric, precision?: Precision): DateTime {
		const time = Time.Numeric.normalize(value)
		const days = time.hours == undefined ? undefined : Math.trunc(time.hours / 24)
		const result = {
			...value,
			...time,
			...(time.hours != undefined ? { hours: time.hours % 24 } : {}),
			...(days || value.days != undefined ? { days: days ? (value.days ?? 0) + days : value.days } : {}),
		}
		return `${Date.Numeric.format(result)}T${Time.Numeric.format(result, precision)}${result.zone ?? ""}`
	}
}
