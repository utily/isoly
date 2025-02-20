import { Fixed } from "../Fixed"
import type { Currency } from "./"
import { decimals } from "./decimals"

export class Amount {
	get value(): number {
		return this.backend.value
	}
	get major(): number {
		return Math.floor(this.backend.value)
	}
	get minor(): number {
		return this.decimals ? this.backend.value * 10 ** this.decimals : this.backend.value
	}
	private constructor(
		private readonly backend: Fixed,
		readonly currency: Currency,
		readonly decimals: undefined | 0 | 2 | 3 | 4
	) {}
	create(value: number): Amount {
		return Amount.create(this.currency, value)
	}
	round(): Amount {
		return this.create(this.backend.round().value)
	}
	add(term: number | Amount): Amount {
		return this.create(this.backend.add(typeof term == "number" ? term : term.backend).value)
	}
	subtract(minuend: number | Amount): Amount {
		return this.create(this.backend.subtract(typeof minuend == "number" ? minuend : minuend.backend).value)
	}
	multiply(multiplicand: number | Amount, output?: Currency): Amount {
		const result = this.backend.multiply(typeof multiplicand == "number" ? multiplicand : multiplicand.backend).value
		return output ? Amount.create(output, result) : this.create(result)
	}
	divide(denominator: number | Amount): Amount {
		return this.create(this.backend.divide(typeof denominator == "number" ? denominator : denominator.backend).value)
	}
	toJSON(): [number, Currency] {
		return [this.backend.value, this.currency]
	}
	toString(): string {
		return `${this.backend.toString()} ${this.currency}`
	}
	static create(currency: Currency, value: number): Amount {
		const d = decimals(currency)
		return new Amount(Fixed.create(value, d ?? 2), currency, d)
	}
	static fromMinor(currency: Currency, value: number): Amount {
		return this.create(currency, value / 10 ** (decimals(currency) ?? 2))
	}
	static add(currency: Currency, value: number, term: number | Amount): Amount {
		return this.create(currency, value).add(term)
	}
	static subtract(currency: Currency, value: number, minuend: number | Amount): Amount {
		return this.create(currency, value).subtract(minuend)
	}
	static multiply(currency: Currency, value: number, multiplicand: number | Amount, output?: Currency): Amount {
		return this.create(currency, value).multiply(multiplicand, output)
	}
	static divide(currency: Currency, value: number, denominator: number | Amount): Amount {
		return this.create(currency, value).divide(denominator)
	}
}
export namespace Amount {}
