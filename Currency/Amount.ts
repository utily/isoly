import { Fixed } from "../Fixed"
import type { Currency } from "./"
import { decimals } from "./decimals"

export class Amount<C extends Currency = Currency> {
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
		readonly currency: C,
		readonly decimals: undefined | 0 | 2 | 3 | 4
	) {}
	create(value: number): Amount<C> {
		return Amount.create<C>(this.currency, value)
	}
	round(): Amount<C> {
		return this.create(this.backend.round().value)
	}
	add(term: number | Amount<C>): Amount<C> {
		return this.create(this.backend.add(typeof term == "number" ? term : term.backend).value)
	}
	subtract(minuend: number | Amount): Amount<C> {
		return this.create(this.backend.subtract(typeof minuend == "number" ? minuend : minuend.backend).value)
	}
	multiply(multiplicand: number | Amount<C>): Amount<C> {
		return this.create(
			this.backend.multiply(typeof multiplicand == "number" ? multiplicand : multiplicand.backend).value
		)
	}
	convert<D extends Currency>(factor: number, to: D): Amount<D> {
		return Amount.create(to, this.value * factor)
	}
	divide(denominator: number | Amount<C>): Amount<C> {
		return this.create(this.backend.divide(typeof denominator == "number" ? denominator : denominator.backend).value)
	}
	toJSON(): [number, C] {
		return [this.backend.value, this.currency]
	}
	toString(): string {
		return `${this.backend.toString()} ${this.currency}`
	}
	static create<C extends Currency>(currency: C, value: number): Amount<C> {
		const d = decimals(currency)
		return new Amount(Fixed.create(value, d ?? 2), currency, d)
	}
	static fromMinor<C extends Currency>(currency: C, value: number): Amount<C> {
		return this.create(currency, value / 10 ** (decimals(currency) ?? 2))
	}
	static add<C extends Currency>(currency: C, value: number, term: number | Amount<C>): Amount<C> {
		return this.create(currency, value).add(term)
	}
	static subtract<C extends Currency>(currency: C, value: number, minuend: number | Amount<C>): Amount<C> {
		return this.create(currency, value).subtract(minuend)
	}
	static multiply<C extends Currency>(currency: C, value: number, multiplicand: number | Amount<C>): Amount<C> {
		return this.create(currency, value).multiply(multiplicand)
	}
	static convert<C extends Currency>(currency: Currency, value: number, factor: number, to: C): Amount<C> {
		return this.create(currency, value).convert(factor, to)
	}
	static divide<C extends Currency>(currency: C, value: number, denominator: number | Amount<C>): Amount<C> {
		return this.create(currency, value).divide(denominator)
	}
}
export namespace Amount {}
