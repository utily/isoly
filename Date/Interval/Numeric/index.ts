import { isly } from "isly"
import { Value as _Value } from "./Value"
import { Numeric as DateNumeric } from "../../Numeric"
import type { Interval } from ".."

export class Numeric {
	constructor(readonly start: DateNumeric, readonly end: DateNumeric) {}
	static parse(value: string | Interval | undefined): Numeric | undefined {
		const match = value && /^(\d{4}-\d{2}-\d{2})--(\d{4}-\d{2}-\d{2})$/.exec(value)
		const start = match ? DateNumeric.parse(match[1]) : undefined
		const end = match ? DateNumeric.parse(match[2]) : undefined
		return start && end && new Numeric(start, end)
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
