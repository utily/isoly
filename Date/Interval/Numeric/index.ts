import { isly } from "isly"
import { Numeric as DateNumeric } from "../../Numeric"
import type { Interval } from ".."
import { Value as _Value } from "./Value"

export class Numeric {
	constructor(readonly start: DateNumeric, readonly end: DateNumeric) {}
	format(): Interval {
		return `${this.start.format()}--${this.end.format()}` as Interval
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Date.Numeric").bind()
}
