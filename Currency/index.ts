import { isly } from "isly"
import { Amount as _Amount } from "./Amount"
import { Code as _Code } from "./Code"
import { decimals as _decimals } from "./decimals"
import { name as _name } from "./name"
import { values as _values } from "./values"

export type Currency = typeof Currency.values[number]

export namespace Currency {
	export import Amount = _Amount
	export import Code = _Code
	export const values = _values
	export const { type, is, flawed } = isly
		.string<Currency>("value", ...values)
		.rename("isoly.Currency")
		.bind()
	export function round(value: number, currency: Currency): number {
		return Amount.create(currency, value).value
	}
	export function add(currency: Currency, left: number, right: number): number {
		return Amount.add(currency, left, right).value
	}
	export function subtract(currency: Currency, minuend: number, subtrahend: number): number {
		return Amount.subtract(currency, minuend, subtrahend).value
	}
	export function multiply(currency: Currency, amount: number, multiplicand: number, output?: Currency): number {
		return Amount.multiply(currency, amount, multiplicand, output).value
	}
	export function divide(currency: Currency, amount: number, denominator: number): number {
		return Amount.divide(currency, amount, denominator).value
	}
	export function toMinor(amount: number, currency: Currency): number {
		const decimals = Currency.decimalDigits(currency)
		return typeof decimals == "number" ? Math.round(amount * 10 ** decimals) : amount
	}
	export function fromMinor(amount: number, currency: Currency): number {
		const decimals = Currency.decimalDigits(currency)
		return typeof decimals == "number" ? Currency.divide(currency, amount, 10 ** decimals) : amount
	}
	export function isRounded(amount: number, currency: Currency): boolean {
		const decimals = Currency.decimalDigits(currency)
		return decimals == undefined
			? true
			: isNaN(amount)
			? false
			: (amount.toString().split(".")[1]?.length ?? 0) <= decimals
	}
	export const decimalDigits = _decimals
	export const name = _name
}
