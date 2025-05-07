import { isly } from "isly"
import { Date } from "../../Date/Date"
import { Time } from "../../Time"
import { TimeZone } from "../../TimeZone"

export type Value = Date.Numeric.Value & Time.Numeric.Value & { zone?: TimeZone.Offset }

export namespace Value {
	export const { type, is, flawed } = isly
		.union<Value>(
			Date.Numeric.type,
			Time.Numeric.type,
			isly.object<{ zone?: TimeZone.Offset }>({ zone: TimeZone.Offset.type.optional() })
		)
		.rename("isoly.DateTime.Numeric.Value")
		.describe("An ISO 8601 date-time value, which includes date, time, and optional time zone offset.")
		.bind()
}
