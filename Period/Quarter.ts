import { isly } from "isly"
import { Year } from "./Year"

export type Quarter = `${Year}-Q${1 | 2 | 3 | 4}`
export namespace Quarter {
	export const { type, is, flawed } = isly.string<Quarter>("value", /^\d{4}-Q[1-4]$/).bind()
}
