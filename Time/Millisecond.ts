import { isly } from "isly"

type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
export type Millisecond = `${Digit}${Digit}${Digit}`

export namespace Millisecond {
	export const type = isly.named("isoly.Time.Millisecond", isly.string<Millisecond>(/^[0-9]{3}$/))
	export const is = type.is
	export const flaw = type.flaw
	export type Numeric = number
	export namespace Numeric {
		export const type = isly.named(
			"isoly.Time.Millisecond.Numeric",
			isly.number<Numeric>(value => value >= 0 && value <= 999)
		)
		export const is = type.is
		export const flaw = type.flaw
	}
	export function parse(value: Millisecond): Millisecond.Numeric
	export function parse(value: string): Millisecond.Numeric | undefined
	export function parse(value: string): Millisecond.Numeric | undefined {
		return Millisecond.Numeric.type.get(Number.parseInt(value))
	}
	export function create(value: Millisecond.Numeric): Millisecond
	export function create(value: number): Millisecond | undefined
	export function create(value: number): string | undefined {
		return Millisecond.type.get(value.toString().padStart(3, "0"))
	}
}