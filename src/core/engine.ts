import luhn from "@credit-card-stuffs/luhn"

export class CreditCardNumberEngine {
    constructor(private mask: string, private prefix: string = "x") {}

    generate(length: number = 16) {
        let payload = this.mask
            .split("")
            .map((char) =>
                char === this.prefix ? Math.floor(Math.random() * 10) : char
            )
            .toString()
            .replace(/,/g, "")
            .substring(0, length - 1)

        return luhn.complete(payload)
    }
}

export class CreditCardDateEngine {
    constructor() {}

    generateMonth(skip: number = 12) {
        const month = Math.floor(Math.random() * skip + 1)
        return month > 9 ? month.toString() : "0" + month.toString()
    }
    generateYear(skip: number = 2) {
        return (
            new Date(Date.now()).getFullYear() +
            Math.floor(Math.random() * skip)
        ).toString()
    }
}

export class CreditCardCvvEngine {
    constructor(private mask: string, private prefix: string = "x") {}

    generate(length: number = 3) {
        let payload = this.mask
            .split("")
            .map((char) =>
                char === this.prefix ? Math.floor(Math.random() * 10) : char
            )
            .toString()
            .replace(/,/g, "")
            .substring(0, length)

        return payload
    }
}
