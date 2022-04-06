import { Alpha2 } from "./Alpha2"
import { Alpha3 } from "./Alpha3"

export type Numeric =
	| 4
	| 248
	| 8
	| 12
	| 16
	| 20
	| 24
	| 660
	| 10
	| 28
	| 32
	| 51
	| 533
	| 36
	| 40
	| 31
	| 44
	| 48
	| 50
	| 52
	| 112
	| 56
	| 84
	| 204
	| 60
	| 64
	| 68
	| 535
	| 70
	| 72
	| 74
	| 76
	| 86
	| 96
	| 100
	| 854
	| 108
	| 132
	| 116
	| 120
	| 124
	| 136
	| 140
	| 148
	| 152
	| 156
	| 162
	| 166
	| 170
	| 174
	| 178
	| 180
	| 184
	| 188
	| 384
	| 191
	| 192
	| 531
	| 196
	| 203
	| 208
	| 262
	| 212
	| 214
	| 218
	| 818
	| 222
	| 226
	| 232
	| 233
	| 748
	| 231
	| 238
	| 234
	| 242
	| 246
	| 250
	| 254
	| 258
	| 260
	| 266
	| 270
	| 268
	| 276
	| 288
	| 292
	| 300
	| 304
	| 308
	| 312
	| 316
	| 320
	| 831
	| 324
	| 624
	| 328
	| 332
	| 334
	| 336
	| 340
	| 344
	| 348
	| 352
	| 356
	| 360
	| 364
	| 368
	| 372
	| 833
	| 376
	| 380
	| 388
	| 392
	| 832
	| 400
	| 398
	| 404
	| 296
	| 408
	| 410
	| 414
	| 417
	| 418
	| 428
	| 422
	| 426
	| 430
	| 434
	| 438
	| 440
	| 442
	| 446
	| 450
	| 454
	| 458
	| 462
	| 466
	| 470
	| 584
	| 474
	| 478
	| 480
	| 175
	| 484
	| 583
	| 498
	| 492
	| 496
	| 499
	| 500
	| 504
	| 508
	| 104
	| 516
	| 520
	| 524
	| 528
	| 540
	| 554
	| 558
	| 562
	| 566
	| 570
	| 574
	| 807
	| 580
	| 578
	| 512
	| 586
	| 585
	| 275
	| 591
	| 598
	| 600
	| 604
	| 608
	| 612
	| 616
	| 620
	| 630
	| 634
	| 638
	| 642
	| 643
	| 646
	| 652
	| 654
	| 659
	| 662
	| 663
	| 666
	| 670
	| 882
	| 674
	| 678
	| 682
	| 686
	| 688
	| 690
	| 694
	| 702
	| 534
	| 703
	| 705
	| 90
	| 706
	| 710
	| 239
	| 728
	| 724
	| 144
	| 729
	| 740
	| 744
	| 752
	| 756
	| 760
	| 158
	| 762
	| 834
	| 764
	| 626
	| 768
	| 772
	| 776
	| 780
	| 788
	| 792
	| 795
	| 796
	| 798
	| 800
	| 804
	| 784
	| 826
	| 840
	| 581
	| 858
	| 860
	| 548
	| 862
	| 704
	| 92
	| 850
	| 876
	| 732
	| 887
	| 894
	| 716
	| 280

export namespace Numeric {
	export function is(value: any | Numeric): value is Numeric {
		return (
			typeof value == "number" &&
			value >= 0 &&
			value <= 999 &&
			Number.isInteger(value) &&
			(value == 4 ||
				value == 248 ||
				value == 8 ||
				value == 12 ||
				value == 16 ||
				value == 20 ||
				value == 24 ||
				value == 660 ||
				value == 10 ||
				value == 28 ||
				value == 32 ||
				value == 51 ||
				value == 533 ||
				value == 36 ||
				value == 40 ||
				value == 31 ||
				value == 44 ||
				value == 48 ||
				value == 50 ||
				value == 52 ||
				value == 112 ||
				value == 56 ||
				value == 84 ||
				value == 204 ||
				value == 60 ||
				value == 64 ||
				value == 68 ||
				value == 535 ||
				value == 70 ||
				value == 72 ||
				value == 74 ||
				value == 76 ||
				value == 86 ||
				value == 96 ||
				value == 100 ||
				value == 854 ||
				value == 108 ||
				value == 132 ||
				value == 116 ||
				value == 120 ||
				value == 124 ||
				value == 136 ||
				value == 140 ||
				value == 148 ||
				value == 152 ||
				value == 156 ||
				value == 162 ||
				value == 166 ||
				value == 170 ||
				value == 174 ||
				value == 178 ||
				value == 180 ||
				value == 184 ||
				value == 188 ||
				value == 384 ||
				value == 191 ||
				value == 192 ||
				value == 531 ||
				value == 196 ||
				value == 203 ||
				value == 208 ||
				value == 262 ||
				value == 212 ||
				value == 214 ||
				value == 218 ||
				value == 818 ||
				value == 222 ||
				value == 226 ||
				value == 232 ||
				value == 233 ||
				value == 748 ||
				value == 231 ||
				value == 238 ||
				value == 234 ||
				value == 242 ||
				value == 246 ||
				value == 250 ||
				value == 254 ||
				value == 258 ||
				value == 260 ||
				value == 266 ||
				value == 270 ||
				value == 268 ||
				value == 276 ||
				value == 288 ||
				value == 292 ||
				value == 300 ||
				value == 304 ||
				value == 308 ||
				value == 312 ||
				value == 316 ||
				value == 320 ||
				value == 831 ||
				value == 324 ||
				value == 624 ||
				value == 328 ||
				value == 332 ||
				value == 334 ||
				value == 336 ||
				value == 340 ||
				value == 344 ||
				value == 348 ||
				value == 352 ||
				value == 356 ||
				value == 360 ||
				value == 364 ||
				value == 368 ||
				value == 372 ||
				value == 833 ||
				value == 376 ||
				value == 380 ||
				value == 388 ||
				value == 392 ||
				value == 832 ||
				value == 400 ||
				value == 398 ||
				value == 404 ||
				value == 296 ||
				value == 408 ||
				value == 410 ||
				value == 414 ||
				value == 417 ||
				value == 418 ||
				value == 428 ||
				value == 422 ||
				value == 426 ||
				value == 430 ||
				value == 434 ||
				value == 438 ||
				value == 440 ||
				value == 442 ||
				value == 446 ||
				value == 450 ||
				value == 454 ||
				value == 458 ||
				value == 462 ||
				value == 466 ||
				value == 470 ||
				value == 584 ||
				value == 474 ||
				value == 478 ||
				value == 480 ||
				value == 175 ||
				value == 484 ||
				value == 583 ||
				value == 498 ||
				value == 492 ||
				value == 496 ||
				value == 499 ||
				value == 500 ||
				value == 504 ||
				value == 508 ||
				value == 104 ||
				value == 516 ||
				value == 520 ||
				value == 524 ||
				value == 528 ||
				value == 540 ||
				value == 554 ||
				value == 558 ||
				value == 562 ||
				value == 566 ||
				value == 570 ||
				value == 574 ||
				value == 807 ||
				value == 580 ||
				value == 578 ||
				value == 512 ||
				value == 586 ||
				value == 585 ||
				value == 275 ||
				value == 591 ||
				value == 598 ||
				value == 600 ||
				value == 604 ||
				value == 608 ||
				value == 612 ||
				value == 616 ||
				value == 620 ||
				value == 630 ||
				value == 634 ||
				value == 638 ||
				value == 642 ||
				value == 643 ||
				value == 646 ||
				value == 652 ||
				value == 654 ||
				value == 659 ||
				value == 662 ||
				value == 663 ||
				value == 666 ||
				value == 670 ||
				value == 882 ||
				value == 674 ||
				value == 678 ||
				value == 682 ||
				value == 686 ||
				value == 688 ||
				value == 690 ||
				value == 694 ||
				value == 702 ||
				value == 534 ||
				value == 703 ||
				value == 705 ||
				value == 90 ||
				value == 706 ||
				value == 710 ||
				value == 239 ||
				value == 728 ||
				value == 724 ||
				value == 144 ||
				value == 729 ||
				value == 740 ||
				value == 744 ||
				value == 752 ||
				value == 756 ||
				value == 760 ||
				value == 158 ||
				value == 762 ||
				value == 834 ||
				value == 764 ||
				value == 626 ||
				value == 768 ||
				value == 772 ||
				value == 776 ||
				value == 780 ||
				value == 788 ||
				value == 792 ||
				value == 795 ||
				value == 796 ||
				value == 798 ||
				value == 800 ||
				value == 804 ||
				value == 784 ||
				value == 826 ||
				value == 840 ||
				value == 581 ||
				value == 858 ||
				value == 860 ||
				value == 548 ||
				value == 862 ||
				value == 704 ||
				value == 92 ||
				value == 850 ||
				value == 876 ||
				value == 732 ||
				value == 887 ||
				value == 894 ||
				value == 716 ||
				value == 280)
		)
	}
	export function from(country: Alpha2 | Alpha3): Numeric {
		return country.length == 3 ? from(Alpha2.from(country as Alpha3)) : alpha2ToNumeric[country]
	}
}

const alpha2ToNumeric: { [country: string]: Numeric } = {
	AF: 4,
	AX: 248,
	AL: 8,
	DZ: 12,
	AS: 16,
	AD: 20,
	AO: 24,
	AI: 660,
	AQ: 10,
	AG: 28,
	AR: 32,
	AM: 51,
	AW: 533,
	AU: 36,
	AT: 40,
	AZ: 31,
	BS: 44,
	BH: 48,
	BD: 50,
	BB: 52,
	BY: 112,
	BE: 56,
	BZ: 84,
	BJ: 204,
	BM: 60,
	BT: 64,
	BO: 68,
	BQ: 535,
	BA: 70,
	BW: 72,
	BV: 74,
	BR: 76,
	IO: 86,
	BN: 96,
	BG: 100,
	BF: 854,
	BI: 108,
	CV: 132,
	KH: 116,
	CM: 120,
	CA: 124,
	KY: 136,
	CF: 140,
	TD: 148,
	CL: 152,
	CN: 156,
	CX: 162,
	CC: 166,
	CO: 170,
	KM: 174,
	CG: 178,
	CD: 180,
	CK: 184,
	CR: 188,
	CI: 384,
	HR: 191,
	CU: 192,
	CW: 531,
	CY: 196,
	CZ: 203,
	DK: 208,
	DJ: 262,
	DM: 212,
	DO: 214,
	EC: 218,
	EG: 818,
	SV: 222,
	GQ: 226,
	ER: 232,
	EE: 233,
	SZ: 748,
	ET: 231,
	FK: 238,
	FO: 234,
	FJ: 242,
	FI: 246,
	FR: 250,
	GF: 254,
	PF: 258,
	TF: 260,
	GA: 266,
	GM: 270,
	GE: 268,
	DE: 276,
	GH: 288,
	GI: 292,
	GR: 300,
	GL: 304,
	GD: 308,
	GP: 312,
	GU: 316,
	GT: 320,
	GG: 831,
	GN: 324,
	GW: 624,
	GY: 328,
	HT: 332,
	HM: 334,
	VA: 336,
	HN: 340,
	HK: 344,
	HU: 348,
	IS: 352,
	IN: 356,
	ID: 360,
	IR: 364,
	IQ: 368,
	IE: 372,
	IM: 833,
	IL: 376,
	IT: 380,
	JM: 388,
	JP: 392,
	JE: 832,
	JO: 400,
	KZ: 398,
	KE: 404,
	KI: 296,
	KP: 408,
	KR: 410,
	KW: 414,
	KG: 417,
	LA: 418,
	LV: 428,
	LB: 422,
	LS: 426,
	LR: 430,
	LY: 434,
	LI: 438,
	LT: 440,
	LU: 442,
	MO: 446,
	MG: 450,
	MW: 454,
	MY: 458,
	MV: 462,
	ML: 466,
	MT: 470,
	MH: 584,
	MQ: 474,
	MR: 478,
	MU: 480,
	YT: 175,
	MX: 484,
	FM: 583,
	MD: 498,
	MC: 492,
	MN: 496,
	ME: 499,
	MS: 500,
	MA: 504,
	MZ: 508,
	MM: 104,
	NA: 516,
	NR: 520,
	NP: 524,
	NL: 528,
	NC: 540,
	NZ: 554,
	NI: 558,
	NE: 562,
	NG: 566,
	NU: 570,
	NF: 574,
	MK: 807,
	MP: 580,
	NO: 578,
	OM: 512,
	PK: 586,
	PW: 585,
	PS: 275,
	PA: 591,
	PG: 598,
	PY: 600,
	PE: 604,
	PH: 608,
	PN: 612,
	PL: 616,
	PT: 620,
	PR: 630,
	QA: 634,
	RE: 638,
	RO: 642,
	RU: 643,
	RW: 646,
	BL: 652,
	SH: 654,
	KN: 659,
	LC: 662,
	MF: 663,
	PM: 666,
	VC: 670,
	WS: 882,
	SM: 674,
	ST: 678,
	SA: 682,
	SN: 686,
	RS: 688,
	SC: 690,
	SL: 694,
	SG: 702,
	SX: 534,
	SK: 703,
	SI: 705,
	SB: 90,
	SO: 706,
	ZA: 710,
	GS: 239,
	SS: 728,
	ES: 724,
	LK: 144,
	SD: 729,
	SR: 740,
	SJ: 744,
	SE: 752,
	CH: 756,
	SY: 760,
	TW: 158,
	TJ: 762,
	TZ: 834,
	TH: 764,
	TL: 626,
	TG: 768,
	TK: 772,
	TO: 776,
	TT: 780,
	TN: 788,
	TR: 792,
	TM: 795,
	TC: 796,
	TV: 798,
	UG: 800,
	UA: 804,
	AE: 784,
	GB: 826,
	US: 840,
	UM: 581,
	UY: 858,
	UZ: 860,
	VU: 548,
	VE: 862,
	VN: 704,
	VG: 92,
	VI: 850,
	WF: 876,
	EH: 732,
	YE: 887,
	ZM: 894,
	ZW: 716,
}
