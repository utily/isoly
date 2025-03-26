import { isly } from "isly"
import { Year } from "./Year"

export type Month =
	| `${Year}-${"01" | "02" | "03" | "04" | "05" | "06"}`
	| `${Year}-${"07" | "08" | "09" | "10" | "11" | "12"}`
export namespace Month {
	export const { type, is, flawed } = isly.string<Month>("value", /^\d{4}-(0[1-9]|1[0-2])$/).bind()
}
