import { isly } from "isly"
import { Precision } from "../Precision"

export type Value = Partial<Record<Precision, number>>

export namespace Value {
	export const { type, is, flawed } = isly
		.object<Value>(
			{
				hours: isly.number().optional(),
				minutes: isly.number().optional(),
				seconds: isly.number().optional(),
				milliseconds: isly.number().optional(),
			},
			"isoly.Time.Value"
		)
		.bind()
}
