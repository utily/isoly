import { isly } from "isly"
import { Date } from "../Date"
import { Numeric as _Numeric } from "./Numeric"

export type Interval = `${Date}--${Date}`

export namespace Interval {
	export import Numeric = _Numeric
	export const { type, is, flawed } = isly
		.string<Interval>(value => {
			const match = /^(\d{4}-\d{2}-\d{2})--(\d{4}-\d{2}-\d{2})$/.exec(value)
			return !!match && Date.is(match[1]) && Date.is(match[2]) && match[1] < match[2]
		}, "YYYY-MM-DD--YYYY-MM-DD")
		.rename("isoly.Date.Interval")
		.describe("Interval string in format YYYY-MM-DD--YYYY-MM-DD.")
		.bind()
	export function parse(value: Interval | string | undefined): Numeric | undefined {
		const match =
			value == undefined
				? undefined
				: /^(\d{4}-\d{2}-\d{2})--(\d{4}-\d{2}-\d{2})$/
						.exec(value)
						?.slice(1)
						?.map(v => Date.parse(v))
		return match && match[0] && match[1] && match[0].before(match[1]) ? new Numeric(match[0], match[1]) : undefined
	}
}
