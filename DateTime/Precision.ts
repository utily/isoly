import { isly } from "isly"
import { Time } from "../Time"

export type Precision = typeof Precision.values[number]

export namespace Precision {
	export const values = [...Time.Precision.values, "days"] as const
	export const { type, is, flawed } = isly
		.string<Precision>("value", ...values)
		.rename("isoly.DateTime.Precision")
		.describe("Precision of a DateTime.")
		.bind()
}
