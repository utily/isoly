import { Precision as _Precision } from "./Precision"

export class Fixed {
	private constructor(readonly value: number, readonly precision: Fixed.Precision = 2) {}
	create(value: number, precision: Fixed.Precision = this.precision): Fixed {
		return new Fixed(value, precision).round()
	}
	round(precision: Fixed.Precision = this.precision): Fixed {
		const factor = Math.pow(10, precision)
		const decimals = (this.value.toString().split(".")?.[1]?.length ?? 0) - 1
		return new Fixed(
			Math.round((this.value + (decimals <= precision + 5 ? Number.EPSILON : Math.pow(10, -decimals))) * factor) /
				factor,
			precision
		)
	}
	add(term: number | Fixed): Fixed {
		return this.create(this.value + (typeof term == "number" ? this.create(term) : term).value)
	}
	subtract(minuend: number | Fixed): Fixed {
		return this.create(this.value - (typeof minuend == "number" ? this.create(minuend) : minuend).value)
	}
	multiply(multiplicand: number | Fixed): Fixed {
		return this.create(this.value * (typeof multiplicand == "number" ? multiplicand : multiplicand.value))
	}
	divide(denominator: number | Fixed): Fixed {
		return this.create(this.value / (typeof denominator == "number" ? denominator : denominator.value))
	}
	toJSON(): number {
		return this.value
	}
	toString(): string {
		return this.value.toFixed(this.precision)
	}
	static create(value: number, precision: Fixed.Precision = 2): Fixed {
		return new Fixed(value, precision).round()
	}
	static round(value: number, precision: Fixed.Precision = 2): Fixed {
		const factor = Math.pow(10, precision)
		const decimals = (value.toString().split(".")?.[1]?.length ?? 0) - 1
		return new Fixed(
			Math.round((value + (decimals <= precision + 5 ? Number.EPSILON : Math.pow(10, -decimals))) * factor) / factor,
			precision
		)
	}
	static add(value: number, term: number | Fixed, precision: Fixed.Precision = 2): Fixed {
		return this.create(value, precision).add(term)
	}
	static subtract(value: number, minuend: number | Fixed, precision: Fixed.Precision = 2): Fixed {
		return this.create(value, precision).subtract(minuend)
	}
	static multiply(value: number, multiplicand: number | Fixed, precision: Fixed.Precision = 2): Fixed {
		return this.create(value, precision).multiply(multiplicand)
	}
	static divide(value: number, denominator: number | Fixed, precision: Fixed.Precision = 2): Fixed {
		return this.create(value, precision).divide(denominator)
	}
}
export namespace Fixed {
	export import Precision = _Precision
}
