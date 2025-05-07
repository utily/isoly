import { isly } from "isly"
import { Year } from "../../Year"
import type { HalfYear } from "../"
import { Value as _Value } from "./Value"

export class Numeric {
	get value(): Numeric.Value {
		return {
			...(this.years != undefined ? { years: this.years } : {}),
			...(this.halfYears != undefined ? { halfYears: this.halfYears } : {}),
		}
	}
	get length(): 181 | 182 | 184 {
		const result = this.normalize()
		return ([result.year.leapYear ? 182 : 181, 184] as const)[result.halfYears ?? 0]
	}
	get year(): Year.Numeric {
		return new Year.Numeric(this.years)
	}
	get normal(): boolean {
		return this.halfYears == undefined || (this.halfYears >= 0 && this.halfYears < 2)
	}
	constructor(readonly years: number | undefined, readonly halfYears: number | undefined) {}
	normalize(): Numeric {
		return this.halfYears
			? new Numeric((this.years ?? 0) + Math.floor(this.halfYears / 2), ((this.halfYears % 2) + 2) % 2)
			: this
	}
	format(): HalfYear {
		const result = this.normalize()
		return `${(result.years ?? 0).toFixed(0).padStart(4, "0")}-H${((result.halfYears ?? 0) + 1)
			.toFixed(0)
			.padStart(2, "0")}` as HalfYear
	}
	next(halfYears = 1): Numeric {
		const result = new Numeric(this.years, (this.halfYears ?? 0) + halfYears)
		return result.normalize()
	}
	previous(halfYears = 1): Numeric {
		return this.next(-halfYears)
	}
	static now(): Numeric {
		return Numeric.create(new globalThis.Date())
	}
	static create(value: globalThis.Date | Numeric.Value | number): Numeric {
		const result =
			typeof value == "number"
				? ([undefined, value] as const)
				: Numeric.Value.is(value)
				? ([value?.years, value?.halfYears] as const)
				: ([value.getFullYear(), value.getMonth() % 3] as const)
		return new Numeric(result[0], result[1])
	}
}
export namespace Numeric {
	export import Value = _Value
	export const { type, is, flawed } = isly.instance<Numeric>(Numeric, "isoly.Year.Numeric").bind()
}
