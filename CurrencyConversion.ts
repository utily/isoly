import { isly } from "isly"
import { Currency } from "./Currency"

export class CurrencyConversion {
	constructor(private readonly table: CurrencyConversion.Table) {}
	convert(amount: number, from: Currency, to: Currency): number | undefined {
		return CurrencyConversion.convert(amount, from, to, this.table)
	}

	static open(table: CurrencyConversion.Table): CurrencyConversion {
		return new CurrencyConversion(table)
	}
}

export namespace CurrencyConversion {
	export type Table = Partial<Record<Currency, Partial<Record<Currency, number>>>>
	export const type = isly.record(
		isly.fromIs("Currency", Currency.is),
		isly.record(isly.fromIs("Currency", Currency.is), isly.number())
	)
	export const is = type.is
	export const flaw = type.flaw
	export function convert(
		amount: number,
		from: Currency,
		to: Currency,
		table: CurrencyConversion.Table
	): number | undefined {
		const rate = table[from]?.[to]
		return rate && Currency.multiply(to, amount, rate)
	}
}
