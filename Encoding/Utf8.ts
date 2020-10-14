import { Transcoder } from "./Transcoder"

export class Utf8 extends Transcoder {
	encode(data: string): Uint8Array {
		return Uint8Array.from(unescape(encodeURIComponent(data)).split(""), c => c.charCodeAt(0))
	}
	decode(data: ArrayBufferView): string {
		return !data
			? ""
			: decodeURIComponent(
					escape(
						Array.from(new Uint8Array(data.buffer, data.byteOffset, data.byteLength), c => String.fromCharCode(c)).join(
							""
						)
					)
			  )
	}
}
