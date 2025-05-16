import { isly } from "isly"
import { Year } from "../../Year"
import type { Quarter } from ".."
import { Value as _Value } from "./Value"

export class Numeric {
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.quarters != undefined ? { quarters: this.quarters } : {}),
		}
	}
	get length(): 90 | 91 | 92 {
		const result = this.normalize()
		return ([result.year.leapYear ? 91 : 90, 91, 92, 92] as const)[result.quarters ?? 0]
	}
	get year(): Year.Numeric {
		return new Year.Numeric(this.years)
	}
	get normal(): boolean {
		return this.quarters == undefined || (this.quarters >= 0 && this.quarters < 4)
	}
	constructor(readonly years: number | undefined, readonly quarters: number | undefined) {}
	normalize(): Numeric {
		return this.quarters
			? new Numeric((this.years ?? 0) + Math.floor(this.quarters / 4), ((this.quarters % 4) + 4) % 4)
			: this
	}
	format(): Quarter {
		const result = this.normalize()
		return `${(result.years ?? 0).toFixed(0).padStart(4, "0")}-Q${((result.quarters ?? 0) + 1).toFixed(0)}` as Quarter
	}
	next(quarters = 1): Numeric {
		const result = new Numeric(this.years, (this.quarters ?? 0) + quarters)
		return result.normalize()
	}
	previous(quarters = 1): Numeric {
		return this.next(-quarters)
	}
	static now(): Numeric {
		return Numeric.create(new globalThis.Date())
	}
	static create(value: globalThis.Date | Numeric.Value | number): Numeric {
		const parsed =
			typeof value == "number"
				? ([undefined, value] as const)
				: Numeric.Value.is(value)
				? ([value?.years, value?.quarters] as const)
				: ([value.getFullYear(), Math.floor(value.getMonth() / 3)] as const)
		return new Numeric(parsed[0], parsed[1])
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Year.Numeric").bind()
}
