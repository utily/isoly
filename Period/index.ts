import { isly } from "isly"
import { HalfYear as _HalfYear } from "./HalfYear"
import { Month as _Month } from "./Month"
import { Quarter as _Quarter } from "./Quarter"
import { Year as _Year } from "./Year"

export type Period = Period.Year | Period.HalfYear | Period.Quarter | Period.Month
export namespace Period {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import HalfYear = _HalfYear
	export import Month = _Month
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import Quarter = _Quarter
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export import Year = _Year
	export const { type, is, flawed } = isly.union(Year.type, HalfYear.type, Quarter.type, Month.type).bind()
}
