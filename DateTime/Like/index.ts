import { isly } from "isly"

export type Like = string

export namespace Like {
	export const { type, is, flawed } = isly
		.string<Like>("value", /^\d+-\d+-\d+((T| )(\d+(:\d+(:\d+(\.\d+)?)?)?)?)?(Z|[+-]\d+:\d+)?$/)
		.rename("isoly.DateTime.Like")
		.describe("Parsable into an isoly.DateTime.")
		.bind()
}
