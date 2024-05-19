import {
    CreditCardNumberEngine,
    CreditCardDateEngine,
    CreditCardCvvEngine,
} from "./core/engine"

import { CardInterface } from "./interfaces/card"
import { CommonBrandsList } from "./utils/brands"

interface CCGENOptionsInterface {
    generation: {
        masks: {
            prefix?: string
            targets: {
                number: {
                    length?: number
                    mask: string
                }
                cvv: {
                    length?: number
                    mask: string
                }
            }
        }
        date: {
            month: {
                generate: boolean
                value?: number
                skip?: number
            }
            year: {
                generate: boolean
                value?: number
                skip?: number
            }
        }
    }
    engines?: {
        creditCardNumberEngine?: CreditCardNumberEngine
        creditCardDateEngine?: CreditCardDateEngine
        creditCardCvvEngine?: CreditCardCvvEngine
    }
    utils?: {
        brandsList: {
            brand: string
            regex: RegExp
        }[]
    }
}

export class CCGEN {
    private creditCardNumberEngine: CreditCardNumberEngine
    private creditCardDateEngine: CreditCardDateEngine
    private creditCardCvvEngine: CreditCardCvvEngine

    private brandList: {
        brand: string
        regex: RegExp
    }[]

    private options: CCGENOptionsInterface

    constructor(ops: CCGENOptionsInterface) {
        this.options = ops

        this.creditCardNumberEngine = ops.engines?.creditCardNumberEngine
            ? ops.engines.creditCardNumberEngine
            : new CreditCardNumberEngine(
                  ops.generation.masks.targets.number.mask,
                  ops.generation.masks.prefix
              )

        this.creditCardDateEngine = ops.engines?.creditCardDateEngine
            ? ops.engines.creditCardDateEngine
            : new CreditCardDateEngine()

        this.creditCardCvvEngine = ops.engines?.creditCardCvvEngine
            ? ops.engines.creditCardCvvEngine
            : new CreditCardCvvEngine(
                  ops.generation.masks.targets.cvv.mask,
                  ops.generation.masks.prefix
              )

        this.brandList = ops.utils?.brandsList
            ? ops.utils.brandsList
            : CommonBrandsList
    }

    generate(amount: number = 100): CardInterface[] {
        const payload: CardInterface[] = []

        for (let index = 0; index < amount; index++) {
            const number = this.creditCardNumberEngine.generate(
                this.options.generation.masks.targets.number.length
            )

            let brand = "unknown"
            this.brandList.forEach((item) => {
                if (item.regex.test(number)) {
                    brand = item.brand
                }
            })

            const month = this.options.generation.date.month.generate
                ? this.creditCardDateEngine.generateMonth(
                      this.options.generation.date.month.skip
                  )
                : this.options.generation.date.month.value

            const year = this.options.generation.date.year.generate
                ? this.creditCardDateEngine.generateYear(
                      this.options.generation.date.year.skip
                  )
                : this.options.generation.date.year.value

            const cvv = this.creditCardCvvEngine.generate(
                this.options.generation.masks.targets.cvv.length
            )

            payload.push({
                metadata: {
                    brand,
                },
                expiration: {
                    month: month as string,
                    year: year as string,
                },
                identifier: {
                    number,
                    cvv,
                },
            })
        }

        return payload
    }
}

export const ccgen = (ops: CCGENOptionsInterface, amount?: number) =>
    new CCGEN(ops).generate(amount)

console.log(
    ccgen(
        {
            generation: {
                masks: {
                    targets: {
                        number: {
                            mask: "4xxxxxxxxxxxxxxx",
                        },
                        cvv: {
                            mask: "xxx",
                        },
                    },
                },
                date: {
                    month: {
                        generate: true,
                    },
                    year: {
                        generate: true,
                    },
                },
            },
        },
        5
    )
)
