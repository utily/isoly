import { isly } from "isly"
import { Year } from "../Year"

export type HalfYear = `${Year}-H${1 | 2}`
export namespace HalfYear {
	export const { type, is, flawed } = isly.string<HalfYear>("value", /^\d{4}-H[1-2]$/).bind()
}
